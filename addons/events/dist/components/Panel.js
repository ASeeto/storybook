'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('../constants');

var _Event = require('./Event');

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  wrapper: {
    fontFamily: '\n      -apple-system, ".SFNSText-Regular", "San Francisco", "Roboto",\n      "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif\n    ',
    fontSize: 14,
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px',
    color: 'rgb(51, 51, 51)',
    overflow: 'auto'
  }
};
// import addons from '@storybook/addons';

var Events = function (_Component) {
  (0, _inherits3.default)(Events, _Component);

  function Events() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Events);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Events.__proto__ || (0, _getPrototypeOf2.default)(Events)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      events: []
    }, _this.onAdd = function (events) {
      _this.setState({ events: events });
    }, _this.onEmit = function (event) {
      _this.props.channel.emit(_constants.EVENTS.EMIT, event);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Events, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.props.channel.on(_constants.EVENTS.ADD, this.onAdd);

      this.stopListeningOnStory = this.props.api.onStory(function () {
        _this2.onAdd([]);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.stopListeningOnStory) {
        this.stopListeningOnStory();
      }

      this.unmounted = true;
      this.props.channel.removeListener(_constants.EVENTS.ADD, this.onAdd);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var events = this.state.events;

      return _react2.default.createElement(
        'div',
        { style: styles.wrapper },
        events.map(function (event) {
          return _react2.default.createElement(_Event2.default, (0, _extends3.default)({ key: event.id }, event, { onEmit: _this3.onEmit }));
        })
      );
    }
  }]);
  return Events;
}(_react.Component);

Events.propTypes = {
  api: _propTypes2.default.shape({
    onStory: _propTypes2.default.func
  }).isRequired,
  channel: _propTypes2.default.shape({
    on: _propTypes2.default.func,
    emit: _propTypes2.default.func,
    removeListener: _propTypes2.default.func
  }).isRequired
};
exports.default = Events;