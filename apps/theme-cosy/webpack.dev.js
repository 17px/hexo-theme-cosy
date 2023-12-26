const ExtraWatchWebpackPlugin = require("extra-watch-webpack-plugin");
const CopyPlugin = require("./scripts/plugin/CopyPlugin.js");
const baseConfig = require("./webpack.config.js");
const { merge } = require("webpack-merge");
const { themeName } = require("./config");
const path = require("path");

module.exports = merge(baseConfig, {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "../../test/hexo-test/public"), // Hexo 生成的静态文件目录
      watch: true,
    },
    hot: true,
    open: true,
    port: 12004,
  },
  plugins: [
    new ExtraWatchWebpackPlugin({
      files: [
        "src/**/*.ejs",
        "src/**/*.less",
        "src/_config.yml",
        "src/extend/**/*.js",
        "src/assets/**",
        "src/languages/*.yml",
      ],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, `dist`),
          to: path.resolve(
            __dirname,
            `../../test/hexo-test/themes/${themeName}`
          ),
        },
        {
          from: path.resolve(__dirname, "src/_config.yml"),
          to: path.resolve(
            __dirname,
            `../../test/hexo-test/themes/${themeName}/_config.yml`
          ),
        },
        {
          from: path.resolve(__dirname, "src/assets/img"),
          to: path.resolve(
            __dirname,
            `../../test/hexo-test/themes/${themeName}/source/img`
          ),
        },
        {
          from: path.resolve(__dirname, "src/assets/font"),
          to: path.resolve(
            __dirname,
            `../../test/hexo-test/themes/${themeName}/source/font`
          ),
        },
        {
          from: path.resolve(__dirname, "src/assets/lib"),
          to: path.resolve(
            __dirname,
            `../../test/hexo-test/themes/${themeName}/source/lib`
          ),
        },
        {
          from: path.resolve(__dirname, "src/extend"),
          to: path.resolve(
            __dirname,
            `../../test/hexo-test/themes/${themeName}/scripts`
          ),
        },
        {
          from: path.resolve(__dirname, "src/languages"),
          to: path.resolve(
            __dirname,
            `../../test/hexo-test/themes/${themeName}/languages`
          ),
        },
      ],
    }),
  ],
});
