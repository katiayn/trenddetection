var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var SvgStore = require('webpack-svgstore-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';
const DEVELOPMENT = process.env.NODE_ENV === 'development';

var plugins = PRODUCTION
  ? [
      new webpack.optimize.UglifyJsPlugin(),
      new ExtractTextPlugin('../css/bundle.min.css'),
    ]
  : [
      new ExtractTextPlugin('../css/bundle.css'),
    ];

plugins.push(
  new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(PRODUCTION),
    DEVELOPMENT: JSON.stringify(DEVELOPMENT)
  }),
  new SvgStore({
    svgoOptions: {
      plugins: [
        { removeDoctype: true },
        { removeTitle: true },
        { removeMetadata: true },
        { removeComments: true },
        { removeDesc: true },
        { removeDimensions: true },
        { removeUselessStrokeAndFill: true },
        { removeUnknownsAndDefaults: true },
        { cleanupIDs: true },
        { cleanupAttrs: true },
        { moveGroupAttrsToElems: true }
      ]
    },
    prefix: ''
  })
);

if (DEVELOPMENT) {
  plugins.push(
    new LiveReloadPlugin({
      appendScriptTag: true
    })
  );
}

// Loaders are read from right to left
const scssLoader = PRODUCTION
  ? ExtractTextPlugin.extract({
      use: ['css-loader?minimize&importLoaders=1', 'postcss-loader', 'sass-loader']
    })
  : ExtractTextPlugin.extract({
    use: ['css-loader?importLoaders=1', 'postcss-loader', 'sass-loader']
  });

module.exports = {
  externals: {
    'jquery': 'jQuery'
  },
  devtool: DEVELOPMENT ? 'source-map' : false,
  entry: {
    'js/bundle': ['./assets/js/_src/main.js']
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: 'eslint-loader'
      },
      {
        test: /\.modernizrrc.js/,
        use: 'modernizr-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: scssLoader,
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?.*)?$/,
        use: 'url-loader?name=../fonts/[name]/[name].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      modernizr$: __dirname + '/.modernizrrc.js'
    },
    modules: [
      'node_modules'
    ]
  },
  output: {
    path: __dirname + '/assets/js',
    publicPath: '/assets/js/',
    filename: PRODUCTION ? 'bundle.min.js' : 'bundle.js'
  }
};
