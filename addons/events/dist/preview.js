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

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WithEvents = function (_Component) {
  (0, _inherits3.default)(WithEvents, _Component);

  function WithEvents() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, WithEvents);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = WithEvents.__proto__ || (0, _getPrototypeOf2.default)(WithEvents)).call.apply(_ref, [this].concat(args))), _this), _this.onEmit = function (event) {
      _this.props.emit(event.name, event.payload);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(WithEvents, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var events = this.props.events;


      this.channel = _addons2.default.getChannel();

      this.channel.on(_constants.EVENTS.EMIT, this.onEmit);

      this.channel.emit(_constants.EVENTS.ADD, events);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var events = nextProps.events;


      this.channel.emit(_constants.EVENTS.ADD, events);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.channel.removeListener(_constants.EVENTS.EMIT, this.onEmit);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);
  return WithEvents;
}(_react.Component);

WithEvents.propTypes = {
  emit: _propTypes2.default.func.isRequired,
  events: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string,
    title: _propTypes2.default.string,
    payload: _propTypes2.default.any
  })).isRequired,
  children: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.array]).isRequired
};
exports.default = WithEvents;