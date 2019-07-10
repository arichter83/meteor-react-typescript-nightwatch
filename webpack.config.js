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
          ].concat(
            isClient ?
              [] :
              // on server we remove all addition stuff
              // else if on server imports of client chunks are made a
              // "ReferenceError: exports is not defined" error is emited
              // https://www.notion.so/posixion/Use-CDN-for-CSS-bundle-d7c3cf4604af440e8f09d2571db4ec01#d7b341399ce74c3382817c573152c08a
              ['dynamic-import-node', 'remove-webpack']
            )
        }
      }
    },
    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader"
      ]
    },
    {
      test: /\.css$/,
      use: [
          "style-loader",
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
    plugins: [
      new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].css',
      }),
    ],
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
