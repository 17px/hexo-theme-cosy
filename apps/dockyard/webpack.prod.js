const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('./scripts/plugin/CopyPlugin.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.config.js');
const { merge } = require('webpack-merge');
const { themeName } = require('./ornn')
const path = require('path');

module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', {
            discardComments: { removeAll: true }, normalizeWhitespace: false
          }]
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`./build/*`]
    }),
    new BundleAnalyzerPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, `dist`),
          to: path.resolve(__dirname, `build/${themeName}`)
        },
        {
          from: path.resolve(__dirname, 'src/_config.yml'),
          to: path.resolve(__dirname, `build/${themeName}/_config.yml`)
        },
        {
          from: path.resolve(__dirname, 'src/assets/img'),
          to: path.resolve(__dirname, `build/${themeName}/source/img`)
        },
        {
          from: path.resolve(__dirname, 'src/assets/font'),
          to: path.resolve(__dirname, `build/${themeName}/source/font`)
        },
        {
          from: path.resolve(__dirname, 'src/extend'),
          to: path.resolve(__dirname, `build/${themeName}/scripts`)
        },
        {
          from: path.resolve(__dirname, 'src/languages'),
          to: path.resolve(__dirname, `build/${themeName}/languages`)
        }
      ]
    })
  ]
});

