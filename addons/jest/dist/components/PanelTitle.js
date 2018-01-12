'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

var _provideJestResult = require('../hoc/provideJestResult');

var _provideJestResult2 = _interopRequireDefault(_provideJestResult);

var _Indicator = require('./Indicator');

var _Indicator2 = _interopRequireDefault(_Indicator);

var _colors = require('../colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Wrapper = _glamorous2.default.div({
  display: 'flex',
  alignItems: 'center'
});
var PanelName = _glamorous2.default.div({
  paddingLeft: 5
});

var PanelTitle = function PanelTitle(_ref) {
  var tests = _ref.tests;

  if (!tests) {
    return null;
  }

  var results = tests.map(function (report) {
    return report.result;
  }).filter(function (report) {
    return !!report;
  });
  var success = results.reduce(function (acc, result) {
    return acc && result.status === 'passed';
  }, true);
  var color = success ? _colors2.default.success : _colors2.default.error;

  return _react2.default.createElement(
    Wrapper,
    null,
    _react2.default.createElement(_Indicator2.default, { color: results.length < tests.length ? _colors2.default.warning : color, size: 10 }),
    _react2.default.createElement(
      PanelName,
      null,
      'Tests'
    )
  );
};

PanelTitle.defaultProps = {
  tests: null
};

PanelTitle.propTypes = {
  tests: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    result: _propTypes2.default.object
  }))
};

exports.default = (0, _provideJestResult2.default)(PanelTitle);