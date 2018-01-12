'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackgroundDecorator = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
  wrapper: {
    overflow: 'scroll',
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    transition: 'background 0.25s ease-in-out',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    background: 'transparent'
  }
};

var BackgroundDecorator = exports.BackgroundDecorator = function (_React$Component) {
  (0, _inherits3.default)(BackgroundDecorator, _React$Component);

  function BackgroundDecorator(props) {
    (0, _classCallCheck3.default)(this, BackgroundDecorator);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BackgroundDecorator.__proto__ || (0, _getPrototypeOf2.default)(BackgroundDecorator)).call(this, props));

    _this.setBackground = function (background) {
      return _this.setState({ background: background });
    };

    var channel = props.channel,
        story = props.story;

    // A channel is explicitly passed in for testing

    if (channel) {
      _this.channel = channel;
    } else {
      _this.channel = _addons2.default.getChannel();
    }

    _this.state = { background: 'transparent' };

    _this.story = story();
    return _this;
  }

  (0, _createClass3.default)(BackgroundDecorator, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.channel.on('background', this.setBackground);
      this.channel.emit('background-set', this.props.backgrounds);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.story !== this.props.story) {
        this.story = nextProps.story();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.channel.removeListener('background', this.setBackground);
      this.channel.emit('background-unset');
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = style.wrapper;
      styles.background = this.state.background;
      return _react2.default.createElement(
        'div',
        { style: (0, _assign2.default)({}, styles) },
        this.story
      );
    }
  }]);
  return BackgroundDecorator;
}(_react2.default.Component);

BackgroundDecorator.propTypes = {
  backgrounds: _propTypes2.default.arrayOf(_propTypes2.default.object),
  channel: _propTypes2.default.shape({
    emit: _propTypes2.default.func,
    on: _propTypes2.default.func,
    removeListener: _propTypes2.default.func
  }),
  story: _propTypes2.default.func.isRequired
};
BackgroundDecorator.defaultProps = {
  backgrounds: [],
  channel: undefined
};

exports.default = function (backgrounds) {
  return function (story) {
    return _react2.default.createElement(BackgroundDecorator, { story: story, backgrounds: backgrounds });
  };
};