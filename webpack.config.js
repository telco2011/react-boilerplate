var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'app');

module.exports = {
  entry: [
    'script-loader!jquery/dist/jquery.min.js',
    'script-loader!foundation-sites/dist/js/foundation.min.js',
    APP_DIR + '/app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/', // <- putting this line right under "options" did the trick
        sassLoader: {
          includePaths: [
            path.resolve(__dirname, './node_modules/foundation-sites/scss')
          ]
        }
      }
    })
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      'node_modules',
      'app/components',
      'app/api'
    ],
    alias: {
      applicationStyles: 'app/styles/app.scss'
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  devtool: 'inline-source-map'
};
