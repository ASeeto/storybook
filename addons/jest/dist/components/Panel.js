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

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

var _components = require('@storybook/components');

var _Indicator = require('./Indicator');

var _Indicator2 = _interopRequireDefault(_Indicator);

var _Result = require('./Result');

var _Result2 = _interopRequireDefault(_Result);

var _provideJestResult = require('../hoc/provideJestResult');

var _provideJestResult2 = _interopRequireDefault(_provideJestResult);

var _colors = require('../colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = _glamorous2.default.ul({
  listStyle: 'none',
  fontSize: 14,
  padding: 0,
  margin: '10px 0'
});

var Item = _glamorous2.default.li({
  display: 'block',
  margin: '10px 0',
  padding: 0
});

var NoTests = _glamorous2.default.div((0, _extends3.default)({
  padding: '10px 20px',
  flex: 1
}, _components.baseFonts));

var FileTitle = _glamorous2.default.h2({
  margin: 0,
  fontWeight: 500,
  fontSize: 18
});

var SuiteHead = _glamorous2.default.div({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  position: 'relative',
  paddingTop: 10
});

var SuiteTotals = (0, _glamorous2.default)(function (_ref) {
  var successNumber = _ref.successNumber,
      failedNumber = _ref.failedNumber,
      result = _ref.result,
      className = _ref.className;
  return _react2.default.createElement(
    'div',
    { className: className },
    successNumber > 0 && _react2.default.createElement(
      'div',
      { style: { color: _colors2.default.success } },
      successNumber,
      ' passed'
    ),
    failedNumber > 0 && _react2.default.createElement(
      'div',
      { style: { color: _colors2.default.error } },
      failedNumber,
      ' failed'
    ),
    _react2.default.createElement(
      'div',
      null,
      result.assertionResults.length,
      ' total'
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'strong',
        null,
        result.endTime - result.startTime,
        'ms'
      )
    )
  );
})({
  display: 'flex',
  alignItems: 'center',
  color: _colors2.default.grey,
  fontSize: '10px',

  '& > *': {
    marginLeft: 10
  }
});

var SuiteProgress = (0, _glamorous2.default)(function (_ref2) {
  var successNumber = _ref2.successNumber,
      result = _ref2.result,
      className = _ref2.className;
  return _react2.default.createElement(
    'div',
    { className: className, role: 'progressbar' },
    _react2.default.createElement(
      'span',
      { style: { width: successNumber / result.assertionResults.length * 100 + '%' } },
      successNumber / result.assertionResults.length * 100 + '%'
    )
  );
})(function () {
  return {
    width: '100%',
    backgroundColor: _colors2.default.error,
    height: 4,
    top: 0,
    position: 'absolute',
    left: 0,
    borderRadius: 3,
    overflow: 'hidden',
    appearance: 'none',

    '& > span': {
      backgroundColor: _colors2.default.success,
      bottom: 0,
      position: 'absolute',
      left: 0,
      top: 0,
      boxShadow: '4px 0 0 white'
    }
  };
});

var SuiteTitle = _glamorous2.default.div({
  display: 'flex',
  alignItems: 'center'
});

var Content = (0, _glamorous2.default)(function (_ref3) {
  var tests = _ref3.tests,
      className = _ref3.className;
  return _react2.default.createElement(
    'div',
    { className: className },
    tests.map(function (_ref4) {
      var name = _ref4.name,
          result = _ref4.result;

      if (!result) {
        return _react2.default.createElement(
          NoTests,
          null,
          'This story has tests configured, but no file was found'
        );
      }

      var successNumber = result.assertionResults.filter(function (_ref5) {
        var status = _ref5.status;
        return status === 'passed';
      }).length;
      var failedNumber = result.assertionResults.length - successNumber;

      return _react2.default.createElement(
        'section',
        { key: name },
        _react2.default.createElement(
          SuiteHead,
          null,
          _react2.default.createElement(
            SuiteTitle,
            null,
            _react2.default.createElement(
              _Indicator2.default,
              {
                color: result.status === 'passed' ? _colors2.default.success : _colors2.default.error,
                size: 16,
                styles: { marginRight: 5 }
              },
              result.status
            ),
            _react2.default.createElement(
              FileTitle,
              null,
              name
            )
          ),
          _react2.default.createElement(SuiteTotals, { successNumber: successNumber, failedNumber: failedNumber, result: result }),
          _react2.default.createElement(SuiteProgress, { successNumber: successNumber, failedNumber: failedNumber, result: result })
        ),
        _react2.default.createElement(
          List,
          null,
          result.assertionResults.map(function (res) {
            return _react2.default.createElement(
              Item,
              { key: res.fullName || res.title },
              res.failureMessages && res.failureMessages.length ? _react2.default.createElement(_Result.FailedResult, res) : _react2.default.createElement(_Result2.default, res)
            );
          })
        )
      );
    })
  );
})((0, _extends3.default)({
  padding: '10px 20px',
  flex: '1 1 0%'
}, _components.baseFonts));

var Panel = function Panel(_ref6) {
  var tests = _ref6.tests;
  return tests ? _react2.default.createElement(Content, { tests: tests }) : _react2.default.createElement(
    NoTests,
    null,
    'This story has no tests configures'
  );
};

Panel.defaultProps = {
  tests: null
};

Panel.propTypes = {
  tests: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    result: _propTypes2.default.object
  }))
};

exports.default = (0, _provideJestResult2.default)(Panel);