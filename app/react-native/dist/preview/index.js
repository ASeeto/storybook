'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _channelWebsocket = require('@storybook/channel-websocket');

var _channelWebsocket2 = _interopRequireDefault(_channelWebsocket);

var _events = require('events');

var _client = require('@storybook/core/client');

var _story_kind = require('./story_kind');

var _story_kind2 = _interopRequireDefault(_story_kind);

var _OnDeviceUI = require('./components/OnDeviceUI');

var _OnDeviceUI2 = _interopRequireDefault(_OnDeviceUI);

var _StoryView = require('./components/StoryView');

var _StoryView2 = _interopRequireDefault(_StoryView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-underscore-dangle: 0 */

var Preview = function () {
  function Preview() {
    (0, _classCallCheck3.default)(this, Preview);

    this._addons = {};
    this._decorators = [];
    this._stories = new _client.StoryStore();
    this._events = new _events.EventEmitter();
  }

  (0, _createClass3.default)(Preview, [{
    key: 'storiesOf',
    value: function storiesOf(kind, module) {
      if (module && module.hot) {
        // TODO remove the kind on dispose
      }

      var fileName = module ? module.filename : null;

      return new _story_kind2.default(this._stories, this._addons, this._decorators, kind, fileName);
    }
  }, {
    key: 'setAddon',
    value: function setAddon(addon) {
      (0, _assign2.default)(this._addons, addon);
    }
  }, {
    key: 'addDecorator',
    value: function addDecorator(decorator) {
      this._decorators.push(decorator);
    }
  }, {
    key: 'configure',
    value: function configure(loadStories, module) {
      var _this = this;

      loadStories();
      if (module && module.hot) {
        module.hot.accept(function () {
          return _this._sendSetStories();
        });
        // TODO remove all global decorators on dispose
      }
    }
  }, {
    key: 'getStorybook',
    value: function getStorybook() {
      var _this2 = this;

      return this._stories.getStoryKinds().map(function (kind) {
        var fileName = _this2._stories.getStoryFileName(kind);

        var stories = _this2._stories.getStories(kind).map(function (name) {
          var render = _this2._stories.getStory(kind, name);
          return { name: name, render: render };
        });

        return { kind: kind, fileName: fileName, stories: stories };
      });
    }
  }, {
    key: 'getStorybookUI',
    value: function getStorybookUI() {
      var _this3 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return function () {
        var webUrl = null;
        var channel = null;

        try {
          channel = _addons2.default.getChannel();
        } catch (e) {
          // getChannel throws if the channel is not defined,
          // which is fine in this case (we will define it below)
        }

        if (params.resetStorybook || !channel) {
          var host = params.host || (0, _urlParse2.default)(_reactNative.NativeModules.SourceCode.scriptURL).hostname;
          var port = params.port !== false ? ':' + (params.port || 7007) : '';

          var query = params.query || '';
          var secured = params.secured;

          var websocketType = secured ? 'wss' : 'ws';
          var httpType = secured ? 'https' : 'http';

          var url = websocketType + '://' + host + port + '/' + query;
          webUrl = httpType + '://' + host + port;
          channel = (0, _channelWebsocket2.default)({ url: url });
          _addons2.default.setChannel(channel);
        }
        channel.on('getStories', function () {
          return _this3._sendSetStories();
        });
        channel.on('setCurrentStory', function (d) {
          return _this3._selectStory(d);
        });
        _this3._events.on('setCurrentStory', function (d) {
          return _this3._selectStory(d);
        });
        _this3._sendSetStories();
        _this3._sendGetCurrentStory();

        // finally return the preview component
        return params.onDeviceUI ? _react2.default.createElement(_OnDeviceUI2.default, { stories: _this3._stories, events: _this3._events, url: webUrl }) : _react2.default.createElement(_StoryView2.default, { url: webUrl, events: _this3._events });
      };
    }
  }, {
    key: '_sendSetStories',
    value: function _sendSetStories() {
      var channel = _addons2.default.getChannel();
      var stories = this._stories.dumpStoryBook();
      channel.emit('setStories', { stories: stories });
    }
  }, {
    key: '_sendGetCurrentStory',
    value: function _sendGetCurrentStory() {
      var channel = _addons2.default.getChannel();
      channel.emit('getCurrentStory');
    }
  }, {
    key: '_selectStory',
    value: function _selectStory(selection) {
      var kind = selection.kind,
          story = selection.story;

      var storyFn = this._stories.getStory(kind, story);
      this._events.emit('story', storyFn, selection);
    }
  }]);
  return Preview;
}();

exports.default = Preview;