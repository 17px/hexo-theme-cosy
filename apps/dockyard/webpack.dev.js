const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const CopyPlugin = require('./scripts/plugin/CopyPlugin.js');
const baseConfig = require('./webpack.config.js');
const { merge } = require('webpack-merge');
const { themeName } = require('./ornn')
const path = require('path');


module.exports = merge(baseConfig, {
  mode: 'development',
  watch: true,
  plugins: [
    new ExtraWatchWebpackPlugin({
      files: ['src/**/*.ejs', 'src/**/*.less', "src/_config.yml", 'src/extend/**/*.js', 'src/assets/**', 'src/languages/*.yml']
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, `dist`),
          to: path.resolve(__dirname, `../../test/hexo-test/themes/${themeName}`)
        },
        {
          from: path.resolve(__dirname, 'src/_config.yml'),
          to: path.resolve(__dirname, `../../test/hexo-test/themes/${themeName}/_config.yml`)
        },
        {
          from: path.resolve(__dirname, 'src/assets/img'),
          to: path.resolve(__dirname, `../../test/hexo-test/themes/${themeName}/source/img`)
        },
        {
          from: path.resolve(__dirname, 'src/assets/font'),
          to: path.resolve(__dirname, `../../test/hexo-test/themes/${themeName}/source/font`)
        },
        {
          from: path.resolve(__dirname, 'src/extend'),
          to: path.resolve(__dirname, `../../test/hexo-test/themes/${themeName}/scripts`)
        },
        {
          from: path.resolve(__dirname, 'src/languages'),
          to: path.resolve(__dirname, `../../test/hexo-test/themes/${themeName}/languages`)
        }
      ]
    })
  ]
});

