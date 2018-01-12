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

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _axeCore = require('axe-core');

var _axeCore2 = _interopRequireDefault(_axeCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WrapStory = function (_Component) {
  (0, _inherits3.default)(WrapStory, _Component);

  function WrapStory() {
    (0, _classCallCheck3.default)(this, WrapStory);
    return (0, _possibleConstructorReturn3.default)(this, (WrapStory.__proto__ || (0, _getPrototypeOf2.default)(WrapStory)).apply(this, arguments));
  }

  (0, _createClass3.default)(WrapStory, [{
    key: 'componentDidMount',


    /* eslint-disable react/no-find-dom-node */
    value: function componentDidMount() {
      var channel = this.props.channel;

      var wrapper = (0, _reactDom.findDOMNode)(this);

      if (wrapper !== null) {
        _axeCore2.default.a11yCheck(wrapper, {}, function (results) {
          channel.emit('addon:a11y:check', results);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          storyFn = _props.storyFn,
          context = _props.context;


      return storyFn(context);
    }
  }]);
  return WrapStory;
}(_react.Component);

WrapStory.propTypes = {
  context: _propTypes2.default.shape({}),
  storyFn: _propTypes2.default.func,
  channel: _propTypes2.default.shape({})
};
WrapStory.defaultProps = {
  context: {},
  storyFn: function storyFn() {},
  channel: {}
};
exports.default = WrapStory;