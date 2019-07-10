const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const meteorExternals = require('webpack-meteor-externals');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries")

const isdev = process.env.NODE_ENV == 'development'

const modules = (isClient) => {
  return {
  rules: [
    {
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript'
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-syntax-dynamic-import'
          ]
        }
      }
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader"
      ]
    }
  ]
} }

let clientConfig = {
    entry: './client/main.tsx',
    module: modules(true),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    output: {
      path: __dirname + '/dist',
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js'
    },
    externals: [
      meteorExternals()
    ],
    node: false,
    mode: 'development',
    plugins: [
      new HtmlWebpackPlugin({
          template: './client/main.html'
      }),
      new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].css',
      })
    ],
    devServer: {
      contentBase: './dist'
    }
};

let serverConfig = {
    mode: 'development',
    entry: './server/main.ts',
    module: modules(false),
    target: 'node',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    externals: [
      {
        express: 'commonjs express',
      },
      meteorExternals(),
      nodeExternals()
    ]
};
  
module.exports = [clientConfig, serverConfig];
