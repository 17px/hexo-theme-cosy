const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

function getCurrentGitTag() {
  try {
    // 获取最近的标签名
    const tag = execSync('git tag --sort=-creatordate | head -n 1').toString().trim().replace(/[^0-9.]/g, '')
    return tag;
  } catch (error) {
    console.error('Error getting current git tag:', error);
    return null;
  }
}

async function main() {
  const version = getCurrentGitTag();
  if (!version) {
    console.error('No git tag found. Exiting...');
    process.exit(1);
  }

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
    license: "LGPL-3.0-or-later"
  };
  await fs.writeJson(path.join(targetDir, 'package.json'), packageJson, { spaces: 2 });

  // 复制 README.md
  await fs.copy(path.join(__dirname, 'README.md'), path.join(targetDir, 'README.md'));
}

main().catch(err => console.error(err));