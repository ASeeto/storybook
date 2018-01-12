'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _formatJson = require('format-json');

var _formatJson2 = _interopRequireDefault(_formatJson);

var _reactTextareaAutosize = require('react-textarea-autosize');

var _reactTextareaAutosize2 = _interopRequireDefault(_reactTextareaAutosize);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  label: {
    display: 'table-cell',
    boxSizing: 'border-box',
    verticalAlign: 'top',
    paddingRight: '5px',
    paddingTop: '7px',
    textAlign: 'right',
    width: '100px',
    fontSize: '12px',
    color: 'rgb(68, 68, 68)',
    fontWeight: '600'
  },
  button: {
    display: 'table-cell',
    textTransform: 'uppercase',
    letterSpacing: '3.5px',
    fontSize: 12,
    fontWeight: 'bolder',
    color: 'rgb(130, 130, 130)',
    border: '1px solid rgb(193, 193, 193)',
    textAlign: 'center',
    borderRadius: 2,
    padding: 5,
    cursor: 'pointer',
    paddingLeft: 8,
    margin: '0 0 0 5px',
    backgroundColor: 'inherit',
    verticalAlign: 'top',
    outline: 0
  },
  textArea: {
    flex: '1 0 0',
    boxSizing: 'border-box',
    margin: '0 0 0 5px',
    verticalAlign: 'top',
    outline: 'none',
    border: '1px solid #c7c7c7',
    borderRadius: 2,
    fontSize: 13,
    padding: '8px 5px 7px 8px',
    color: 'rgb(51, 51, 51)',
    fontFamily: 'Arial, sans-serif',
    minHeight: '32px',
    resize: 'vertical'
  },
  item: {
    display: 'flex',
    padding: '5px',
    alignItems: 'flex-start',
    boxSizing: 'border-box',
    width: '100%'
  },
  hidden: {
    display: 'none'
  },
  failed: {
    border: '1px solid #fadddd',
    backgroundColor: '#fff5f5'
  }
};

var Item = function (_Component) {
  (0, _inherits3.default)(Item, _Component);

  function Item() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Item);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.onChange = function (_ref2) {
      var value = _ref2.target.value;

      var newState = {
        payloadString: value
      };

      try {
        newState.payload = JSON.parse(value.trim());
        newState.failed = false;
      } catch (err) {
        newState.failed = true;
      }

      _this.setState(newState);
    }, _this.onEmitClick = function () {
      _this.props.onEmit({
        name: _this.props.name,
        payload: _this.state.payload
      });
    }, _this.onToggleEditClick = function () {
      _this.setState(function (_ref3) {
        var isTextAreaShowed = _ref3.isTextAreaShowed;
        return {
          isTextAreaShowed: !isTextAreaShowed
        };
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Item, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var payloadString = _formatJson2.default.plain(this.props.payload);

      this.setState({
        failed: false,
        payload: Item.getJSONFromString(payloadString),
        payloadString: payloadString,
        isTextAreaShowed: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          name = _props.name;
      var _state = this.state,
          failed = _state.failed,
          isTextAreaShowed = _state.isTextAreaShowed;


      var extraStyle = {};
      (0, _assign2.default)(extraStyle, isTextAreaShowed ? {} : (0, _extends3.default)({}, styles.hidden));
      (0, _assign2.default)(extraStyle, failed ? (0, _extends3.default)({}, styles.failed) : {});

      return _react2.default.createElement(
        'div',
        { style: styles.item },
        _react2.default.createElement(
          'label',
          { htmlFor: 'addon-event-' + name, style: styles.label },
          title
        ),
        _react2.default.createElement(
          'button',
          {
            style: styles.button,
            onClick: this.onEmitClick,
            disabled: failed,
            title: 'Submit event'
          },
          '\uD83D\uDCE2'
        ),
        _react2.default.createElement(_reactTextareaAutosize2.default, {
          id: 'addon-event-' + name,
          style: (0, _extends3.default)({}, styles.textArea, extraStyle),
          value: this.state.payloadString,
          onChange: this.onChange
        }),
        isTextAreaShowed ? _react2.default.createElement(
          'button',
          { style: styles.button, onClick: this.onToggleEditClick, title: 'Close editing' },
          '\u274C'
        ) : _react2.default.createElement(
          'button',
          { style: styles.button, onClick: this.onToggleEditClick, title: 'Edit event payload' },
          '\u270F\uFE0F'
        )
      );
    }
  }], [{
    key: 'getJSONFromString',
    value: function getJSONFromString(str) {
      try {
        return JSON.parse(str);
      } catch (e) {
        return str;
      }
    }
  }]);
  return Item;
}(_react.Component);

Item.propTypes = {
  name: _propTypes2.default.string.isRequired,
  title: _propTypes2.default.string.isRequired,
  onEmit: _propTypes2.default.func.isRequired,
  payload: _propTypes2.default.any // eslint-disable-line react/forbid-prop-types
};
Item.defaultProps = {
  payload: {}
};
exports.default = Item;