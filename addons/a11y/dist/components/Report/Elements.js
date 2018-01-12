'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Rules = require('./Rules');

var _Rules2 = _interopRequireDefault(_Rules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  element: {
    fontWeight: 600
  },
  target: {
    borderBottom: '1px solid rgb(130, 130, 130)',
    width: '100%',
    display: 'inline-block',
    paddingBottom: '4px',
    marginBottom: '4px'
  }
};

function Element(_ref) {
  var element = _ref.element,
      passes = _ref.passes;
  var any = element.any,
      all = element.all,
      none = element.none;


  var rules = [].concat((0, _toConsumableArray3.default)(any), (0, _toConsumableArray3.default)(all), (0, _toConsumableArray3.default)(none));

  return _react2.default.createElement(
    'li',
    { style: styles.element },
    _react2.default.createElement(
      'span',
      { style: styles.target },
      element.target[0]
    ),
    _react2.default.createElement(_Rules2.default, { rules: rules, passes: passes })
  );
}
Element.propTypes = {
  element: _propTypes2.default.shape({
    any: _propTypes2.default.array.isRequired,
    all: _propTypes2.default.array.isRequired,
    none: _propTypes2.default.array.isRequired
  }).isRequired,
  passes: _propTypes2.default.bool.isRequired
};

/* eslint-disable react/no-array-index-key */
function Elements(_ref2) {
  var elements = _ref2.elements,
      passes = _ref2.passes;

  return _react2.default.createElement(
    'ol',
    { style: styles.element },
    elements.map(function (element, index) {
      return _react2.default.createElement(Element, { passes: passes, element: element, key: index });
    })
  );
}
Elements.propTypes = {
  elements: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    any: _propTypes2.default.array.isRequired,
    all: _propTypes2.default.array.isRequired,
    none: _propTypes2.default.array.isRequired
  })).isRequired,
  passes: _propTypes2.default.bool.isRequired
};

exports.default = Elements;