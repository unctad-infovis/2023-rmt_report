const path = require('path');
const name = require('./package.json').name;
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  name:name,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules\//,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
              name:'[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: name,
      template: "./src/html/index.html",
      filename: "./index.html"
    }),
    new CopyPlugin({
      patterns: [
        { from: 'assets/img/', to: '../public/assets/img/', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'assets/vid/', to: '../public/assets/vid/', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'assets/data/UNWorldmap.geojson', to: '../public/assets/data/2023-UNWorldmap.geojson.json', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'assets/data/Figure01 - data.csv', to: '../public/assets/data/2023-rmt_report_figure1_update.csv', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'src/font/', to: '../public/font/', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: 'src/fonts/', to: '../public/fonts/', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }},
        { from: './favicon.png', to: '../public', noErrorOnMissing: true, globOptions: { dot: true, gitignore: true, ignore: ['**/.DS_Store'] }}
      ]
    })
  ]
};