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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var provideTests = function provideTests(Component) {
  var TestProvider = function (_React$Component) {
    (0, _inherits3.default)(TestProvider, _React$Component);

    function TestProvider(props) {
      (0, _classCallCheck3.default)(this, TestProvider);

      var _this = (0, _possibleConstructorReturn3.default)(this, (TestProvider.__proto__ || (0, _getPrototypeOf2.default)(TestProvider)).call(this, props));

      _this.state = {};
      _this.onAddTests = _this.onAddTests.bind(_this);
      return _this;
    }

    (0, _createClass3.default)(TestProvider, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        this.stopListeningOnStory = this.props.api.onStory(function () {
          _this2.onAddTests({});
        });

        this.props.channel.on('storybook/tests/add_tests', this.onAddTests);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.stopListeningOnStory) {
          this.stopListeningOnStory();
        }
        this.props.channel.removeListener('storybook/tests/add_tests', this.onAddTests);
      }
    }, {
      key: 'onAddTests',
      value: function onAddTests(_ref) {
        var kind = _ref.kind,
            storyName = _ref.storyName,
            tests = _ref.tests;

        this.setState({ kind: kind, storyName: storyName, tests: tests });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(Component, this.state);
      }
    }]);
    return TestProvider;
  }(_react2.default.Component);

  TestProvider.propTypes = {
    channel: _propTypes2.default.shape({
      on: _propTypes2.default.func,
      removeListener: _propTypes2.default.func
    }).isRequired,
    api: _propTypes2.default.shape({
      onStory: _propTypes2.default.func
    }).isRequired
  };


  return TestProvider;
};

exports.default = provideTests;