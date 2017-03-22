const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const basePlugins = [
  new CopyWebpackPlugin([{
    from: 'public',
    to: '.'
  }], {
    ignore: [ '.DS_Store' ]
  }),
  new HtmlWebpackPlugin({
    title: 'Billboarded Text',
    template: './src/index.html'
  })
]
const prodPlugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  new webpack.optimize.UglifyJsPlugin()
]

const config = {
  entry: './src/app.js',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules\/(?!whs)|bower_components)/,
      loader: 'babel-loader',
      query: {
        plugins: [
          'add-module-exports',
          'transform-decorators-legacy',
          'transform-class-properties',
          'transform-object-rest-spread',
          [ 'transform-runtime', { helpers: false, polyfill: false, regenerator: true } ]
        ]
      }
    }, {
      test: /\.(glsl|frag|vert)$/, loader: 'raw-loader', exclude: /node_modules/
    }, {
      test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader', exclude: /node_modules/
    }]
  },

  resolve: {
    symlinks: false,
    modules: [ path.resolve('node_modules') ]
  },

  plugins: isProd ? basePlugins.concat(prodPlugins) : basePlugins,

  devServer: {
    // publicPath: '/dist',
    contentBase: path.resolve(__dirname, 'dist'),
    stats: { chunks: true }
  }
}

module.exports = config
