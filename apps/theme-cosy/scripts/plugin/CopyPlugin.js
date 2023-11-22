const fs = require('fs');
const path = require('path');

class CopyPlugin {
  constructor(options = {}) {
    this.patterns = options.patterns || [];
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('CopyPlugin', (compilation, callback) => {

      // 拷贝目录的递归函数
      const copyDirectory = (src, dest) => {
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true });
        }

        const entries = fs.readdirSync(src);
        for (let entry of entries) {
          const srcPath = path.join(src, entry);
          const destPath = path.join(dest, entry);

          if (fs.lstatSync(srcPath).isDirectory()) {
            copyDirectory(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        }
      };

      // 遍历每一对 from 和 to，执行相应的拷贝操作
      for (let pattern of this.patterns) {
        const from = pattern.from;
        const to = pattern.to;

        if (!fs.existsSync(from)) {
          console.error(`Error: '${from}' does not exist.`);
          continue;
        }

        if (fs.lstatSync(from).isDirectory()) {
          // 确保目标目录存在
          if (!fs.existsSync(to)) {
            fs.mkdirSync(to, { recursive: true });
          }
          // 从输出目录复制内容到目标目录
          copyDirectory(from, to);
        } else {
          const toDirectory = path.dirname(to);
          if (!fs.existsSync(toDirectory)) {
            fs.mkdirSync(toDirectory, { recursive: true });
          }
          fs.copyFileSync(from, to);
        }
      }

      // 最后，确保调用回调
      callback();
    });
  }
}

module.exports = CopyPlugin;
