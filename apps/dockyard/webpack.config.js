const EJSInjectionPlugin = require('./scripts/plugin/EJSInjectionPlugin.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const fs = require('fs')


const getModules = (folderPath) => {
  try {
    const filesAndDirs = fs.readdirSync(folderPath, { withFileTypes: true });
    const dirs = filesAndDirs
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    return dirs;
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
}

const generateEntries = (templateNames) => {
  return Object.fromEntries(
    templateNames.map(name => [
      name,
      path.resolve(__dirname, `src/modules/${name}/index.ts`)
    ])
  );
};

const modules = getModules(path.resolve(__dirname, 'src/modules'))

module.exports = {
  entry: generateEntries(modules),
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist/source'),
    filename: 'js/[contenthash:8].js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name][ext]'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[contenthash:8].css'
    }),
    ...modules.map(name => {
      return new EJSInjectionPlugin({
        template: path.resolve(__dirname, `src/modules/${name}/index.ejs`),
        filename: path.resolve(__dirname, `dist/layout/${name}.ejs`),
        templateParameters: (assets, compiler, compilation, templatePath) => {
          const templateName = path.basename(path.dirname(templatePath));
          const entryAssets = compilation.entrypoints.get(templateName).getFiles();
          const jsAsset = entryAssets.find(asset => asset.endsWith('.js'));
          const cssAssets = entryAssets.filter(asset => asset.endsWith('.css'));
          return {
            '<!-- inject:css -->': cssAssets.map(css => `<%- css("/css/${path.basename(css)}")%>`).join('\n'),
            '<!-- inject:js -->': jsAsset ? `<%- js("/js/${path.basename(jsAsset)}")%>` : ''
          };
        }
      });
    }),
  ]
};
