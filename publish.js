const fs = require('fs-extra');
const path = require('path');
const { version } = require('./package.json')

async function main() {

  const sourceDir = path.join(__dirname, 'apps/dockyard/build/hexo-theme-cosy');
  const targetDir = path.join(__dirname, 'release/hexo-theme-cosy');

  // 复制文件
  await fs.copy(sourceDir, targetDir);

  // 创建或更新 package.json
  const packageJson = {
    name: "hexo-theme-cosy",
    version: version,
    description: "Hexo Theme Cosy",
    repository: "17px/hexo-theme-cosy",
    keywords: [
      "hexo",
      "theme",
      "cosy"
    ],
    license: "LGPL-3.0-or-later",
    scripts: {
      postinstall: "node ./checker.js"
    }
  };
  // touch package.json
  await fs.writeJson(path.join(targetDir, 'package.json'), packageJson, { spaces: 2 });

  // touch README.md
  await fs.copy(path.join(__dirname, 'README.md'), path.join(targetDir, 'README.md'));

  // touch postinstall script
  const checkerPath = path.join(targetDir, 'checker.js');
  const checkerContent = `console.log('Hello, World!');`;
  fs.writeFile(checkerPath, checkerContent, (err) => err ? console.error(err) : console.log(`touch checker successfully`));
}

main().catch(err => console.error(err));