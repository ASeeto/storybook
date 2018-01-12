'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notes = undefined;

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

var styles = {
  notesPanel: {
    margin: 10,
    fontFamily: 'Arial',
    fontSize: 14,
    color: '#444',
    width: '100%',
    overflow: 'auto'
  }
}; /* eslint-disable react/no-danger */

var Notes = exports.Notes = function (_React$Component) {
  (0, _inherits3.default)(Notes, _React$Component);

  function Notes() {
    var _ref;

    (0, _classCallCheck3.default)(this, Notes);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = Notes.__proto__ || (0, _getPrototypeOf2.default)(Notes)).call.apply(_ref, [this].concat(args)));

    _this.state = { text: '' };
    _this.onAddNotes = _this.onAddNotes.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Notes, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          channel = _props.channel,
          api = _props.api;
      // Listen to the notes and render it.

      channel.on('storybook/notes/add_notes', this.onAddNotes);

      // Clear the current notes on every story change.
      this.stopListeningOnStory = api.onStory(function () {
        _this2.onAddNotes('');
      });
    }

    // This is some cleanup tasks when the Notes panel is unmounting.

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.stopListeningOnStory) {
        this.stopListeningOnStory();
      }

      this.unmounted = true;
      var channel = this.props.channel;

      channel.removeListener('storybook/notes/add_notes', this.onAddNotes);
    }
  }, {
    key: 'onAddNotes',
    value: function onAddNotes(text) {
      this.setState({ text: text });
    }
  }, {
    key: 'render',
    value: function render() {
      var text = this.state.text;

      var textAfterFormatted = text ? text.trim().replace(/\n/g, '<br />') : '';

      return _react2.default.createElement(
        'div',
        { style: styles.notesPanel },
        _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: textAfterFormatted } })
      );
    }
  }]);
  return Notes;
}(_react2.default.Component);

Notes.propTypes = {
  channel: _propTypes2.default.object, // eslint-disable-line react/forbid-prop-types
  api: _propTypes2.default.object // eslint-disable-line react/forbid-prop-types
};
Notes.defaultProps = {
  channel: {},
  api: {}
};

// Register the addon with a unique name.
_addons2.default.register('storybook/notes', function (api) {
  // Also need to set a unique name to the panel.
  _addons2.default.addPanel('storybook/notes/panel', {
    title: 'Notes',
    render: function render() {
      return _react2.default.createElement(Notes, { channel: _addons2.default.getChannel(), api: api });
    }
  });
});