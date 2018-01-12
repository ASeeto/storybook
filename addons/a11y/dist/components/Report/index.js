'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  container: {
    fontSize: '12px'
  },
  empty: {
    fontSize: '11px',
    padding: '20px 12px',
    width: '100%',
    display: 'block',
    textAlign: 'center',
    textTransform: 'uppercase'
  }
};

function Report(_ref) {
  var items = _ref.items,
      empty = _ref.empty,
      passes = _ref.passes;

  if (items.length) {
    return _react2.default.createElement(
      'div',
      { style: styles.container },
      items.map(function (item) {
        return _react2.default.createElement(_Item2.default, { passes: passes, item: item, key: item.id });
      })
    );
  }

  return _react2.default.createElement(
    'span',
    { style: styles.empty },
    empty
  );
}

Report.propTypes = {
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    description: _propTypes2.default.string,
    nodes: _propTypes2.default.array,
    tags: _propTypes2.default.array
  })).isRequired,
  empty: _propTypes2.default.string.isRequired,
  passes: _propTypes2.default.bool.isRequired
};

exports.default = Report;