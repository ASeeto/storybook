'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FailedResult = undefined;

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  align-items: center;\n'], ['\n  display: flex;\n  align-items: center;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

var _components = require('@storybook/components');

var _Indicator = require('./Indicator');

var _Indicator2 = _interopRequireDefault(_Indicator);

var _colors = require('../colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pre = _glamorous2.default.pre((0, _extends3.default)({
  margin: 0
}, _components.monoFonts));

var FlexContainer = _glamorous2.default.div(_templateObject);

/* eslint no-control-regex:0 */
var patterns = [/^\x08+/, /^\x1b\[[012]?K/, /^\x1b\[?[\d;]{0,3}/];

var Positive = _glamorous2.default.strong({
  color: _colors2.default.success,
  fontWeight: 500
});
var Negative = _glamorous2.default.strong({
  color: _colors2.default.error,
  fontWeight: 500
});
var StackTrace = (0, _glamorous2.default)(function (_ref) {
  var trace = _ref.trace,
      className = _ref.className;
  return _react2.default.createElement(
    'details',
    { className: className },
    _react2.default.createElement(
      'summary',
      null,
      'Callstack'
    ),
    trace.join('').trim().split(/\n/).map(function (i) {
      return _react2.default.createElement(
        'div',
        null,
        i.trim()
      );
    })
  );
})({
  background: 'silver',
  padding: 10
});
var Main = (0, _glamorous2.default)(function (_ref2) {
  var msg = _ref2.msg,
      className = _ref2.className;
  return _react2.default.createElement(
    'section',
    { className: className },
    msg
  );
})({
  padding: 10,
  borderBottom: '1px solid silver'
});
var Sub = (0, _glamorous2.default)(function (_ref3) {
  var msg = _ref3.msg,
      className = _ref3.className;
  return _react2.default.createElement(
    'section',
    { className: className },
    msg.filter(function (item) {
      return typeof item !== 'string' || typeof item === 'string' && item.trim() !== '';
    }).map(function (item, index, list) {
      switch (true) {
        case typeof item === 'string' && index === 0 && index === list.length - 1:
          {
            return item.trim();
          }
        case typeof item === 'string' && index === 0:
          {
            return item.replace(/^[\s\n]*/, '');
          }
        case typeof item === 'string' && index === list.length - 1:
          {
            debugger; //eslint-disable-line
            return item.replace(/[\s\n]*$/, '');
          }
        default:
          {
            return item;
          }
      }
      // typeof item === 'string' ? <span>{item}</span> : item;
    })
  );
})({
  padding: 10
});

var createSubgroup = function createSubgroup(acc, item, i, list) {
  // setup aggregators
  if (!acc.list) {
    acc.list = [];
  }
  if (!acc.grouped) {
    acc.grouped = [];
  }

  // start or stop extraction
  if (acc.startTrigger(item)) {
    // debugger; //eslint-disable-line
    acc.mode = 'inject';
    acc.injectionPoint = i;
  }
  if (acc.endTrigger(item)) {
    acc.mode = 'stop';
  }

  // push item in correct aggregator
  if (acc.mode === 'inject') {
    acc.grouped.push(item);
  } else {
    acc.list.push(item);
  }

  // on last iteration inject at detected injectionpoint, and group
  if (i === list.length - 1) {
    return acc.list.reduce(function (eacc, el, ei) {
      switch (true) {
        case acc.injectionPoint === 0 && ei === 0:
          {
            // at index 0, inject before
            return eacc.concat(acc.grouper(acc.grouped)).concat(el);
          }
        case acc.injectionPoint > 0 && acc.injectionPoint === ei + 1:
          {
            // at index > 0, and next index WOULD BE injectionPoint, inject after
            return eacc.concat(el).concat(acc.grouper(acc.grouped));
          }
        default:
          {
            // do not inject
            return eacc.concat(el);
          }
      }
    }, []);
  }
  return acc;
};

var Message = function Message(_ref4) {
  var msg = _ref4.msg;

  var data = patterns.reduce(function (acc, regex) {
    return acc.replace(regex, '');
  }, msg).split(/\[2m/).join('').split(/\[22m/).reduce(function (acc, item) {
    return acc.concat(item);
  }, []).map(function (item, li) {
    return typeof item === 'string' ? item.split(/\[32m(.*?)\[39m/)
    // eslint-disable-next-line react/no-array-index-key
    .map(function (i, index) {
      return index % 2 ? _react2.default.createElement(
        Positive,
        { key: 'p_' + li + '_' + i },
        i
      ) : i;
    }) : item;
  }).reduce(function (acc, item) {
    return acc.concat(item);
  }, []).map(function (item, li) {
    return typeof item === 'string' ? item.split(/\[31m(.*?)\[39m/)
    // eslint-disable-next-line react/no-array-index-key
    .map(function (i, index) {
      return index % 2 ? _react2.default.createElement(
        Negative,
        { key: 'n_' + li + '_' + i },
        i
      ) : i;
    }) : item;
  }).reduce(function (acc, item) {
    return acc.concat(item);
  }, []).reduce(createSubgroup, {
    startTrigger: function startTrigger(e) {
      return typeof e === 'string' && e.indexOf('Error: ') === 0;
    },
    endTrigger: function endTrigger(e) {
      return typeof e === 'string' && e.match('Expected ');
    },
    grouper: function grouper(list) {
      return _react2.default.createElement(Main, { msg: list });
    }
  }).reduce(function (acc, it) {
    return typeof it === 'string' ? acc.concat(it.split(/(at(.|\n)+\d+:\d+\))/)) : acc.concat(it);
  }, []).reduce(function (acc, item) {
    return acc.concat(item);
  }, []).reduce(createSubgroup, {
    startTrigger: function startTrigger(e) {
      return typeof e === 'string' && e.indexOf('Expected ') !== -1;
    },
    endTrigger: function endTrigger(e) {
      return typeof e === 'string' && e.match(/^at/);
    },
    grouper: function grouper(list) {
      return _react2.default.createElement(Sub, { msg: list });
    }
  }).reduce(createSubgroup, {
    startTrigger: function startTrigger(e) {
      return typeof e === 'string' && e.match(/at(.|\n)+\d+:\d+\)/);
    },
    endTrigger: function endTrigger() {
      return false;
    },
    grouper: function grouper(list) {
      return _react2.default.createElement(StackTrace, { trace: list });
    }
  });

  return _react2.default.createElement(
    Pre,
    null,
    data
  );
};
Message.propTypes = {
  msg: _propTypes2.default.string.isRequired
};

var Head = _glamorous2.default.header({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start'
});

var Title = _glamorous2.default.h3({
  padding: '10px 10px 0 10px',
  margin: 0
});

var FailedResult = exports.FailedResult = (0, _glamorous2.default)(function (_ref5) {
  var fullName = _ref5.fullName,
      title = _ref5.title,
      status = _ref5.status,
      failureMessages = _ref5.failureMessages,
      className = _ref5.className;
  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(
      Head,
      null,
      _react2.default.createElement(
        FlexContainer,
        null,
        _react2.default.createElement(_Indicator2.default, {
          color: _colors2.default.error,
          size: 10,
          styles: { borderRadius: '5px 0', position: 'relative', top: -1, left: -1 }
        }),
        _react2.default.createElement(
          Title,
          null,
          fullName || title
        )
      ),
      _react2.default.createElement(
        _Indicator2.default,
        {
          color: _colors2.default.error,
          size: 16,
          styles: { borderRadius: '0 5px', position: 'relative', top: -1, right: -1 }
        },
        status
      )
    ),
    failureMessages.map(function (msg, i) {
      return _react2.default.createElement(Message, { msg: msg, key: i });
    })
  );
})({
  display: 'block',
  borderRadius: 5,
  margin: 0,
  padding: 0,
  position: 'relative',
  border: '1px solid silver',
  boxSizing: 'border-box'
});

var Result = function Result(_ref6) {
  var fullName = _ref6.fullName,
      title = _ref6.title,
      status = _ref6.status;
  return _react2.default.createElement(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    },
    _react2.default.createElement(
      FlexContainer,
      null,
      _react2.default.createElement(_Indicator2.default, { color: _colors2.default.success, size: 10 }),
      _react2.default.createElement(
        'div',
        null,
        fullName || title
      )
    ),
    _react2.default.createElement(
      FlexContainer,
      null,
      _react2.default.createElement(
        _Indicator2.default,
        { color: _colors2.default.success, size: 14, right: true },
        status
      )
    )
  );
};

Result.defaultProps = {
  fullName: '',
  title: ''
};

Result.propTypes = {
  fullName: _propTypes2.default.string,
  title: _propTypes2.default.string,
  status: _propTypes2.default.string.isRequired
};

exports.default = Result;