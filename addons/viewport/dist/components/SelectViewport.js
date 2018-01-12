'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.SelectViewport = SelectViewport;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _viewportInfo = require('./viewportInfo');

var _styles = require('./styles');

var styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SelectViewport(_ref) {
  var activeViewport = _ref.activeViewport,
      onChange = _ref.onChange;

  return _react2.default.createElement(
    'div',
    { style: styles.row },
    _react2.default.createElement(
      'label',
      { style: styles.label },
      'Device'
    ),
    _react2.default.createElement(
      'select',
      { style: styles.action, value: activeViewport, onChange: onChange },
      _react2.default.createElement(
        'option',
        { value: _viewportInfo.defaultViewport },
        'Default'
      ),
      (0, _keys2.default)(_viewportInfo.viewports).map(function (key) {
        return _react2.default.createElement(
          'option',
          { value: key, key: key },
          _viewportInfo.viewports[key].name
        );
      })
    )
  );
}

SelectViewport.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  activeViewport: _propTypes2.default.string.isRequired
};