'use strict'

const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nib = require('nib');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  mod: path.join(__dirname, 'node_modules')
};

module.exports = {
  devtool: '#source-map',
  entry: PATHS.src + '/index.js',
  output: {
    path: PATHS.dist,
    filename: "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'stylus-loader',
            options: {
              use: [require('nib')()],
              import: ['~nib/lib/nib/index.styl']
            },
          },
        ]
      },
      {
        test: /\.ts$/,
        exclude: '/node_modules/',
        use: 'ts-loader'
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.pug', '.html', '.styl', '.css'],
    modules: [PATHS.mod],
  },
  devServer: {
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    stats: "errors-only",
    open: true,
    overlay: true,
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PATHS.src + '/blocks/index.pug',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    new webpack.WatchIgnorePlugin([
      PATHS.mod
    ])
  ]
};