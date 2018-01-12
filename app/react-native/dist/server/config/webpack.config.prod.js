'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

var _uglifyjsWebpackPlugin2 = _interopRequireDefault(_uglifyjsWebpackPlugin);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getConfig = function getConfig(options) {
  var config = {
    bail: true,
    devtool: '#cheap-module-source-map',
    entry: {
      manager: [_path2.default.resolve(__dirname, '../../manager')]
    },
    output: {
      path: _path2.default.join(__dirname, 'dist'),
      filename: 'static/[name].bundle.js',
      // Here we set the publicPath to ''.
      // This allows us to deploy storybook into subpaths like GitHub pages.
      // This works with css and image loaders too.
      // This is working for storybook since, we don't use pushState urls and
      // relative URLs works always.
      publicPath: '/'
    },
    plugins: [new _htmlWebpackPlugin2.default({
      filename: 'index.html',
      data: {
        options: (0, _stringify2.default)(options)
      },
      template: require.resolve('../index.html.ejs')
    }), new _webpack2.default.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }), new _webpack2.default.optimize.DedupePlugin(), new _uglifyjsWebpackPlugin2.default({
      parallel: true,
      uglifyOptions: {
        ie8: false,
        mangle: false,
        warnings: false,
        output: {
          comments: false
        }
      }
    })],
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        query: require('./babel.prod.js'), // eslint-disable-line
        include: _utils.includePaths,
        exclude: _utils.excludePaths
      }, {
        test: /\.md$/,
        use: [{
          loader: 'html-loader'
        }, {
          loader: 'markdown-loader'
        }]
      }]
    }
  };

  // Webpack 2 doesn't have a OccurenceOrderPlugin plugin in the production mode.
  // But webpack 1 has it. That's why we do this.
  if (_utils.OccurenceOrderPlugin) {
    config.plugins.unshift(new _utils.OccurenceOrderPlugin());
  }

  return config;
};

exports.default = getConfig;