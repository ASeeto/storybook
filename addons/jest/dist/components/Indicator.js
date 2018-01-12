'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Indicator = _glamorous2.default.div(function (_ref) {
  var color = _ref.color,
      size = _ref.size;
  return {
    boxSizing: 'border-box',
    padding: '0 ' + size / 2 + 'px',
    minWidth: size,
    minHeight: size,
    fontSize: size / 1.4,
    lineHeight: size + 'px',
    color: 'white',
    textTransform: 'uppercase',
    borderRadius: size / 2,
    backgroundColor: color
  };
}, function (_ref2) {
  var styles = _ref2.styles;
  return (0, _extends3.default)({}, styles);
});

Indicator.defaultProps = {
  right: false,
  children: ''
};

Indicator.propTypes = {
  color: _propTypes2.default.string.isRequired,
  size: _propTypes2.default.number.isRequired,
  children: _propTypes2.default.node,
  right: _propTypes2.default.bool
};

exports.default = Indicator;