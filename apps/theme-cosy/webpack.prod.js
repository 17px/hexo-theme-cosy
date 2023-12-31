const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('./scripts/plugin/CopyPlugin.js');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.config.js');
const { merge } = require('webpack-merge');
const { themeName } = require('./config')
const path = require('path');

module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          },
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
    process.env['ANALYZE'] === 'TRUE' && new BundleAnalyzerPlugin(),
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
          from: path.resolve(__dirname, 'src/assets/lib'),
          to: path.resolve(__dirname, `build/${themeName}/source/lib`)
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

