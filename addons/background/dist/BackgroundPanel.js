'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _Swatch = require('./Swatch');

var _Swatch2 = _interopRequireDefault(_Swatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
  font: {
    fontFamily: "-apple-system,'.SFNSText-Regular', 'San Francisco', Roboto, 'Segoe UI', 'Helvetica Neue', 'Lucida Grande', sans-serif",
    fontSize: '14px'
  }
};

var defaultBackground = {
  name: 'default',
  value: 'transparent'
};

var instructionsHtml = '\nimport { storiesOf } from "@storybook/react";\nimport backgrounds from "@storybook/addon-backgrounds";\n\nstoriesOf("First Component", module)\n  .addDecorator(backgrounds([\n    { name: "twitter", value: "#00aced" },\n    { name: "facebook", value: "#3b5998" },\n  ]))\n  .add("First Button", () => <button>Click me</button>);\n'.trim();

var Instructions = function Instructions() {
  return _react2.default.createElement(
    'div',
    { style: (0, _assign2.default)({ padding: '20px' }, style.font) },
    _react2.default.createElement(
      'h5',
      { style: { fontSize: '16px' } },
      'Setup Instructions'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Please add the background decorator definition to your story. The background decorate accepts an array of items, which should include a name for your color (preferably the css class name) and the corresponding color / image value.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Below is an example of how to add the background decorator to your story definition.'
    ),
    _react2.default.createElement(
      'pre',
      {
        style: {
          padding: '30px',
          display: 'block',
          background: 'rgba(19,19,19,0.9)',
          color: 'rgba(255,255,255,0.95)',
          marginTop: '15px',
          lineHeight: '1.75em'
        }
      },
      _react2.default.createElement(
        'code',
        null,
        instructionsHtml
      )
    )
  );
};

var BackgroundPanel = function (_Component) {
  (0, _inherits3.default)(BackgroundPanel, _Component);

  function BackgroundPanel(props) {
    (0, _classCallCheck3.default)(this, BackgroundPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BackgroundPanel.__proto__ || (0, _getPrototypeOf2.default)(BackgroundPanel)).call(this, props));

    _this.setBackgroundInPreview = function (background) {
      return _this.channel.emit('background', background);
    };

    _this.setBackgroundFromSwatch = function (background) {
      _this.setBackgroundInPreview(background);
      _this.props.api.setQueryParams({ background: background });
    };

    var channel = props.channel,
        api = props.api;

    // A channel is explicitly passed in for testing

    if (channel) {
      _this.channel = channel;
    } else {
      _this.channel = _addons2.default.getChannel();
    }

    _this.state = { backgrounds: [] };

    _this.channel.on('background-set', function (backgrounds) {
      _this.setState({ backgrounds: backgrounds });
      var currentBackground = api.getQueryParam('background');

      if (currentBackground) {
        _this.setBackgroundInPreview(currentBackground);
      } else if (backgrounds.filter(function (x) {
        return x.default;
      }).length) {
        var defaultBgs = backgrounds.filter(function (x) {
          return x.default;
        });
        _this.setBackgroundInPreview(defaultBgs[0].value);
      }
    });

    _this.channel.on('background-unset', function () {
      _this.setState({ backgrounds: [] });
      api.setQueryParams({ background: null });
    });
    return _this;
  }

  (0, _createClass3.default)(BackgroundPanel, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var backgrounds = [].concat((0, _toConsumableArray3.default)(this.state.backgrounds));

      if (!backgrounds.length) return _react2.default.createElement(Instructions, null);

      var hasDefault = backgrounds.filter(function (x) {
        return x.default;
      }).length;
      if (!hasDefault) backgrounds.push(defaultBackground);

      return _react2.default.createElement(
        'div',
        { style: { display: 'inline-block', padding: '15px' } },
        backgrounds.map(function (_ref) {
          var value = _ref.value,
              name = _ref.name;
          return _react2.default.createElement(
            'div',
            { key: name + ' ' + value, style: { display: 'inline-block', padding: '5px' } },
            _react2.default.createElement(_Swatch2.default, { value: value, name: name, setBackground: _this2.setBackgroundFromSwatch })
          );
        })
      );
    }
  }]);
  return BackgroundPanel;
}(_react.Component);

exports.default = BackgroundPanel;

BackgroundPanel.propTypes = {
  api: _propTypes2.default.shape({
    getQueryParam: _propTypes2.default.func,
    setQueryParams: _propTypes2.default.func
  }).isRequired,
  channel: _propTypes2.default.shape({
    emit: _propTypes2.default.func,
    on: _propTypes2.default.func,
    removeListener: _propTypes2.default.func
  })
};
BackgroundPanel.defaultProps = {
  channel: undefined
};