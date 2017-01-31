const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssExtract = new ExtractTextPlugin('main.css');

module.exports = {
  target: 'web', 
  entry: './src/main.js',
  output: {
    path: '../server/public',
    filename: 'build.js'
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    cssExtract
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
          //plugins: ['transform-runtime'] -- goes with babel plugin transform runtime
        }
      },
      {
        test: /\.scss$/,
        loader: cssExtract.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?sourceMap!sass-loader?sourceMap'
        })
      },
      {
        test: /\.html$/,
        loader: 'html-loader'	
      }
    ]
  },
  // sassLoader: {
  //   includePaths: ['./src/scss/partials']
  // }
};