const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    new ExtractTextPlugin('main.css')
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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: './src/scss/partials'
              }
            }
          ]
        })
      },
      {
        test: /\.html$/,
        loader: 'html-loader'	
      },
      {
        test: /\.svg/,
        loader: 'raw-loader'
      },
      {
        test: /\.png/,
        loader: 'url-loader'
      }
    ]
  }
};