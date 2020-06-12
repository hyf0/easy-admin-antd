/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
  const isProduction = env && env.production;

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'eval-cheap-source-map' : 'eval-cheap-module-source-map',
    entry: {
      path: './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      chunkFilename: '[name].[chunkhash:8].js',
    },
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    devServer: {
      compress: true,
      port: 3010,
      hot: true,
      open: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      }),
      new ProgressBarPlugin(),

      // 模块热替换
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),

      // 变量注入
      new webpack.DefinePlugin({
        __DEV__: !isProduction,
      }),
    ],
    resolve: {
      alias: {
        ...(isProduction
          ? {}
          : {
              // 'react-dom': '@hot-loader/react-dom', // react 热重载
            }), // 开发模式插件
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.jsx', '.json'],
    },
  };
};
