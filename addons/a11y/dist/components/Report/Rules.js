'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var impactColors = {
  minor: '#f1c40f',
  moderate: '#e67e22',
  serious: '#e74c3c',
  critical: '#c0392b',
  success: '#2ecc71'
};

var styles = {
  rules: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4px',
    fontWeight: '400'
  },
  rule: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '6px'
  },
  status: {
    height: '16px',
    width: '16px',
    borderRadius: '8px',
    fontSize: '10px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
    flex: '0 0 16px'
  },
  message: {
    paddingLeft: '6px'
  }
};

function Rule(_ref) {
  var rule = _ref.rule,
      passes = _ref.passes;

  var color = passes ? impactColors.success : impactColors[rule.impact];

  return _react2.default.createElement(
    'div',
    { style: styles.rule },
    _react2.default.createElement(
      'div',
      {
        style: (0, _extends3.default)({}, styles.status, {
          backgroundColor: color
        })
      },
      passes ? '✔' : '✘'
    ),
    _react2.default.createElement(
      'span',
      { style: styles.message },
      rule.message
    )
  );
}

Rule.propTypes = {
  rule: _propTypes2.default.shape({
    message: _propTypes2.default.node
  }).isRequired,
  passes: _propTypes2.default.bool.isRequired
};

/* eslint-disable react/no-array-index-key */
function Rules(_ref2) {
  var rules = _ref2.rules,
      passes = _ref2.passes;

  return _react2.default.createElement(
    'div',
    { style: styles.rules },
    rules.map(function (rule, index) {
      return _react2.default.createElement(Rule, { passes: passes, rule: rule, key: index });
    })
  );
}
Rules.propTypes = {
  rules: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    message: _propTypes2.default.node
  })).isRequired,
  passes: _propTypes2.default.bool.isRequired
};

exports.default = Rules;