'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _Tabs = require('./Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Report = require('./Report');

var _Report2 = _interopRequireDefault(_Report);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  passes: {
    color: '#2ecc71'
  },
  violations: {
    color: '#e74c3c'
  }
};

var Panel = function (_Component) {
  (0, _inherits3.default)(Panel, _Component);

  function Panel(props) {
    var _ref;

    (0, _classCallCheck3.default)(this, Panel);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = Panel.__proto__ || (0, _getPrototypeOf2.default)(Panel)).call.apply(_ref, [this, props].concat(args)));

    _this.state = {
      passes: [],
      violations: []
    };
    _this.channel = _addons2.default.getChannel();

    _this.onUpdate = _this.onUpdate.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Panel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.channel.on('addon:a11y:check', this.onUpdate);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.channel.removeListener('addon:a11y:check', this.onUpdate);
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate(_ref2) {
      var passes = _ref2.passes,
          violations = _ref2.violations;

      this.setState({
        passes: passes,
        violations: violations
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          passes = _state.passes,
          violations = _state.violations;


      return _react2.default.createElement(_Tabs2.default, {
        tabs: [{
          label: _react2.default.createElement(
            'span',
            { style: styles.violations },
            'Violations'
          ),
          panel: _react2.default.createElement(_Report2.default, { passes: false, items: violations, empty: 'No a11y violations found.' })
        }, {
          label: _react2.default.createElement(
            'span',
            { style: styles.passes },
            'Passes'
          ),
          panel: _react2.default.createElement(_Report2.default, { passes: true, items: passes, empty: 'No a11y check passed' })
        }]
      });
    }
  }]);
  return Panel;
}(_react.Component);

exports.default = Panel;