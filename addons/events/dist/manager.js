'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _Panel = require('./components/Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function register() {
  _addons2.default.register(_constants.ADDON_ID, function (api) {
    _addons2.default.addPanel(_constants.PANEL_ID, {
      title: 'Events',
      render: function render() {
        return _react2.default.createElement(_Panel2.default, { channel: _addons2.default.getChannel(), api: api });
      }
    });
  });
}