'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.RotateViewport = RotateViewport;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('./styles');

var styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RotateViewport(_ref) {
  var active = _ref.active,
      props = (0, _objectWithoutProperties3.default)(_ref, ['active']);

  var disabledStyles = props.disabled ? styles.disabled : {};
  var actionStyles = (0, _extends3.default)({}, styles.action, disabledStyles);
  return _react2.default.createElement(
    'div',
    { style: styles.row },
    _react2.default.createElement(
      'label',
      { style: styles.label },
      'Rotate'
    ),
    _react2.default.createElement(
      'button',
      (0, _extends3.default)({}, props, { style: actionStyles }),
      active ? 'Vertical' : 'Landscape'
    )
  );
}

RotateViewport.propTypes = {
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func.isRequired,
  active: _propTypes2.default.bool
};

RotateViewport.defaultProps = {
  disabled: true,
  active: false
};