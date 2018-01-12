'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WrapStory = require('./components/WrapStory');

var _WrapStory2 = _interopRequireDefault(_WrapStory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Run all a11y checks inside
var A11yManager = function () {
  function A11yManager() {
    (0, _classCallCheck3.default)(this, A11yManager);
  }

  (0, _createClass3.default)(A11yManager, [{
    key: 'wrapStory',
    value: function wrapStory(channel, storyFn, context) {
      var props = { context: context, storyFn: storyFn, channel: channel };

      return _react2.default.createElement(_WrapStory2.default, props);
    }
  }]);
  return A11yManager;
}();

exports.default = A11yManager;