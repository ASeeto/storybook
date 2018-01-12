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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _components = require('@storybook/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  container: (0, _extends3.default)({
    width: '100%'
  }, _components.baseFonts),
  tabs: {
    borderBottom: '1px solid rgb(234, 234, 234)',
    flexWrap: 'wrap',
    display: 'flex'
  },
  tab: {
    color: 'rgb(68, 68, 68)',
    fontSize: '11px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    padding: '10px 15px',
    letterSpacing: '1px',
    cursor: 'pointer',
    fontWeight: 500,
    opacity: 0.7,
    border: 'none',
    background: 'none',
    flex: 1
  },
  tabActive: {
    opacity: 1,
    fontWeight: 600
  }
};

var tabStyle = function tabStyle(active) {
  return (0, _extends3.default)({}, styles.tab, active ? styles.tabActive : undefined);
};

var Tabs = function (_Component) {
  (0, _inherits3.default)(Tabs, _Component);

  function Tabs(props) {
    (0, _classCallCheck3.default)(this, Tabs);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Tabs.__proto__ || (0, _getPrototypeOf2.default)(Tabs)).call(this, props));

    _this.state = {
      active: 0
    };

    _this.onToggle = _this.onToggle.bind(_this);
    _this.renderPanel = _this.renderPanel.bind(_this);
    _this.renderTabs = _this.renderTabs.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Tabs, [{
    key: 'onToggle',
    value: function onToggle(index) {
      this.setState({
        active: index
      });
    }
  }, {
    key: 'renderPanel',
    value: function renderPanel() {
      var tabs = this.props.tabs;
      var active = this.state.active;


      return _react2.default.createElement(
        'div',
        { style: styles.panel },
        tabs[active].panel
      );
    }
  }, {
    key: 'renderTabs',
    value: function renderTabs() {
      var _this2 = this;

      var tabs = this.props.tabs;
      var active = this.state.active;

      /* eslint-disable react/no-array-index-key */

      return _react2.default.createElement(
        'div',
        { style: styles.tabs },
        tabs.map(function (tab, index) {
          return _react2.default.createElement(
            'button',
            {
              key: index,
              style: tabStyle(active === index),
              onClick: function onClick() {
                return _this2.onToggle(index);
              }
            },
            tab.label
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: styles.container },
        this.renderTabs(),
        this.renderPanel()
      );
    }
  }]);
  return Tabs;
}(_react.Component);

Tabs.propTypes = {
  tabs: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.node,
    panel: _propTypes2.default.node
  })).isRequired
};

exports.default = Tabs;