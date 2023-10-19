const fs = require('fs').promises;
const path = require('path');

class EJSInjectionPlugin {
  constructor(options) {
    this.template = options.template;
    this.filename = options.filename;
    this.templateName = path.basename(this.template, '.ejs');  // 获取template的名称（不带后缀）
    this.templateParameters = options.templateParameters || (() => ({}));
  }

  async handleTemplate(assets, compiler, compilation) {
    const templateParams = this.templateParameters(assets, compiler, compilation, this.template);
    const data = await fs.readFile(this.template, 'utf8');

    return Object.keys(templateParams).reduce((updatedData, key) => {
      const regex = new RegExp(key.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'), 'g');
      return updatedData.replace(regex, templateParams[key]);
    }, data);
  }

  apply(compiler) {
    compiler.hooks.emit.tapPromise('EJSInjectionPlugin', async (compilation) => {
      const assets = Object.keys(compilation.assets);
      const result = await this.handleTemplate(assets, compiler, compilation);

      await fs.mkdir(path.dirname(this.filename), { recursive: true });
      await fs.writeFile(this.filename, result, 'utf8');
    });
  }
}

module.exports = EJSInjectionPlugin;
