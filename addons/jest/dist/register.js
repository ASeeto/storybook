'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _PanelTitle = require('./components/PanelTitle');

var _PanelTitle2 = _interopRequireDefault(_PanelTitle);

var _Panel = require('./components/Panel');

var _Panel2 = _interopRequireDefault(_Panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Register the addon with a unique name.
/* eslint-disable react/no-danger */
_addons2.default.register('storybook/tests', function (api) {
  // Also need to set a unique name to the panel.
  _addons2.default.addPanel('storybook/tests/panel', {
    title: _react2.default.createElement(_PanelTitle2.default, { channel: _addons2.default.getChannel(), api: api }),
    render: function render() {
      return _react2.default.createElement(_Panel2.default, { channel: _addons2.default.getChannel(), api: api });
    }
  });
});