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

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Tags = require('./Tags');

var _Tags2 = _interopRequireDefault(_Tags);

var _Elements = require('./Elements');

var _Elements2 = _interopRequireDefault(_Elements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  item: {
    padding: '0 14px',
    cursor: 'pointer',
    borderBottom: '1px solid rgb(234, 234, 234)'
  },
  headerBar: {
    padding: '12px 0px',
    display: 'block',
    width: '100%',
    border: 0,
    background: 'none'
  }
};

var Item = function (_Component) {
  (0, _inherits3.default)(Item, _Component);

  function Item() {
    (0, _classCallCheck3.default)(this, Item);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).call(this));

    _this.onToggle = function () {
      return _this.setState(function (prevState) {
        return {
          open: !prevState.open
        };
      });
    };

    _this.state = {
      open: false
    };
    return _this;
  }

  (0, _createClass3.default)(Item, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          item = _props.item,
          passes = _props.passes;
      var open = this.state.open;


      return _react2.default.createElement(
        'div',
        { style: styles.item },
        _react2.default.createElement(
          'button',
          { style: styles.headerBar, onClick: function onClick() {
              return _this2.onToggle();
            } },
          item.description
        ),
        open && _react2.default.createElement(_Info2.default, { item: item }),
        open && _react2.default.createElement(_Elements2.default, { elements: item.nodes, passes: passes }),
        open && _react2.default.createElement(_Tags2.default, { tags: item.tags })
      );
    }
  }]);
  return Item;
}(_react.Component);

Item.propTypes = {
  item: _propTypes2.default.shape({
    description: _propTypes2.default.string,
    nodes: _propTypes2.default.array,
    tags: _propTypes2.default.array
  }).isRequired,
  passes: _propTypes2.default.bool.isRequired
};
exports.default = Item;