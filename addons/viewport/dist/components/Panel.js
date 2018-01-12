'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _components = require('@storybook/components');

var _global = require('global');

var _viewportInfo = require('./viewportInfo');

var _SelectViewport = require('./SelectViewport');

var _RotateViewport = require('./RotateViewport');

var _styles = require('./styles');

var styles = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storybookIframe = 'storybook-preview-iframe';
var containerStyles = (0, _extends3.default)({
  padding: 15,
  width: '100%',
  boxSizing: 'border-box'
}, _components.baseFonts);

var Panel = exports.Panel = function (_Component) {
  (0, _inherits3.default)(Panel, _Component);

  function Panel(props, context) {
    (0, _classCallCheck3.default)(this, Panel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Panel.__proto__ || (0, _getPrototypeOf2.default)(Panel)).call(this, props, context));

    _this.iframe = undefined;

    _this.changeViewport = function (viewport) {
      var previousViewport = _this.state.viewport;


      if (previousViewport !== viewport) {
        _this.setState({
          viewport: viewport,
          isLandscape: false
        }, _this.updateIframe);
      }
    };

    _this.toggleLandscape = function () {
      var isLandscape = _this.state.isLandscape;


      _this.setState({ isLandscape: !isLandscape }, _this.updateIframe);
    };

    _this.updateIframe = function () {
      var _this$state = _this.state,
          viewportKey = _this$state.viewport,
          isLandscape = _this$state.isLandscape;

      var viewport = _viewportInfo.viewports[viewportKey] || _viewportInfo.resetViewport;

      if (!_this.iframe) {
        throw new Error('Cannot find Storybook iframe');
      }

      (0, _keys2.default)(viewport.styles).forEach(function (prop) {
        _this.iframe.style[prop] = viewport.styles[prop];
      });

      if (isLandscape) {
        _this.iframe.style.height = viewport.styles.width;
        _this.iframe.style.width = viewport.styles.height;
      }
    };

    _this.state = {
      viewport: _viewportInfo.defaultViewport,
      isLandscape: false
    };

    _this.props.channel.on('addon:viewport:update', _this.changeViewport);
    return _this;
  }

  (0, _createClass3.default)(Panel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.iframe = _global.document.getElementById(storybookIframe);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.channel.removeListener('addon:viewport:update', this.changeViewport);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          isLandscape = _state.isLandscape,
          viewport = _state.viewport;


      var disableDefault = viewport === _viewportInfo.defaultViewport;
      var disabledStyles = disableDefault ? styles.disabled : {};

      var buttonStyles = (0, _extends3.default)({}, styles.button, disabledStyles, {
        marginTop: 30,
        padding: 20
      });

      return _react2.default.createElement(
        'div',
        { style: containerStyles },
        _react2.default.createElement(_SelectViewport.SelectViewport, {
          activeViewport: viewport,
          onChange: function onChange(e) {
            return _this2.changeViewport(e.target.value);
          }
        }),
        _react2.default.createElement(_RotateViewport.RotateViewport, {
          onClick: this.toggleLandscape,
          disabled: disableDefault,
          active: isLandscape
        }),
        _react2.default.createElement(
          'button',
          {
            style: buttonStyles,
            onClick: function onClick() {
              return _this2.changeViewport(_viewportInfo.defaultViewport);
            },
            disabled: disableDefault
          },
          'Reset Viewport'
        )
      );
    }
  }]);
  return Panel;
}(_react.Component);

Panel.propTypes = {
  channel: _propTypes2.default.object.isRequired // eslint-disable-line react/forbid-prop-types
};