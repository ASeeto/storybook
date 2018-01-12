'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PrettyPropType = require('./PrettyPropType');

var _PrettyPropType2 = _interopRequireDefault(_PrettyPropType);

var _proptypes = require('./proptypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OneOfType = function OneOfType(_ref) {
  var propType = _ref.propType;
  var length = propType.value.length;

  return _react2.default.createElement(
    'span',
    null,
    propType.value.map(function (value, i) {
      return [_react2.default.createElement(_PrettyPropType2.default, {
        key: '' + value.name + (value.value ? '-' + value.value : ''),
        propType: value
      }), i < length - 1 ? _react2.default.createElement(
        'span',
        null,
        ' | '
      ) : null];
    }).reduce(function (acc, tuple) {
      return acc.concat(tuple);
    }, [])
  );
};
OneOfType.propTypes = {
  propType: _proptypes.TypeInfo.isRequired
};
exports.default = OneOfType;