var path = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './src/css/main.css',
    './src/js/main.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  resolve: {
    root: [path.join(__dirname, 'src/js')]
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=1000000&name=[ext]/[name].[ext]'},
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css')
  ]
};
