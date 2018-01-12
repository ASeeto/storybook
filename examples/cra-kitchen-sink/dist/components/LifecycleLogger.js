'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _clientLogger = require('@storybook/client-logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function log(name) {
  _clientLogger.logger.info('LifecycleLogger: ' + name);
}

// A component that logs its lifecycle so we can check that things happen
// the right number of times (i.e. we are using React properly)

var LifecycleLogger = function (_Component) {
  (0, _inherits3.default)(LifecycleLogger, _Component);

  function LifecycleLogger() {
    (0, _classCallCheck3.default)(this, LifecycleLogger);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LifecycleLogger.__proto__ || (0, _getPrototypeOf2.default)(LifecycleLogger)).call(this));

    log('contructor');
    return _this;
  }

  (0, _createClass3.default)(LifecycleLogger, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      log('componentWillMount');
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      log('componentDidMount');
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      log('componentWillReceiveProps');
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      log('componentWillUpdate');
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      log('componentDidUpdate');
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      log('componentWillUnmount');
    }
  }, {
    key: 'componentDidCatch',
    value: function componentDidCatch() {
      log('componentDidCatch');
    }
  }, {
    key: 'render',
    value: function render() {
      log('render');
      return _react2.default.createElement(
        'div',
        null,
        'Lifecycle methods are logged to the console'
      );
    }
  }]);
  return LifecycleLogger;
}(_react.Component);

exports.default = LifecycleLogger;