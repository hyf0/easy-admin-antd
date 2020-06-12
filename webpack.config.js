/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack = require('webpack');

module.exports = (env) => {
  const isProduction = env && env.production;

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'eval-cheap-module-source-map',
    entry: {
      path: './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      chunkFilename: 'chunks/[name].[chunkhash:8].js',
    },
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          exclude: /node_modules/,
          use: ['babel-loader?cacheDirectory=true'],
        },
        {
          test: /\.scss$/,
          // use: ['style-loader', 'css-loader', 'sass-loader'],
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.css$/,
          // use: ['style-loader', 'css-loader'],
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
      ...(isProduction
        ? [
            // 生产模式下启用的插件
            new BundleAnalyzerPlugin(),
          ]
        : [
            // 开发模式下启用的插件
            // 模块热替换
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
          ]),
      // -- 任何模式下都启用的插件
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      }),
      new ProgressBarPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[id].[contenthash].css',
      }),
      // 变量注入
      new webpack.DefinePlugin({
        __DEV__: !isProduction,
      }),
      new CleanWebpackPlugin(),
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
