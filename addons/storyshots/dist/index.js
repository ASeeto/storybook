'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSnapshotFileName = exports.renderOnly = exports.shallowSnapshot = exports.snapshotWithOptions = exports.multiSnapshotWithOptions = exports.snapshot = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _testBodies = require('./test-bodies');

Object.defineProperty(exports, 'snapshot', {
  enumerable: true,
  get: function get() {
    return _testBodies.snapshot;
  }
});
Object.defineProperty(exports, 'multiSnapshotWithOptions', {
  enumerable: true,
  get: function get() {
    return _testBodies.multiSnapshotWithOptions;
  }
});
Object.defineProperty(exports, 'snapshotWithOptions', {
  enumerable: true,
  get: function get() {
    return _testBodies.snapshotWithOptions;
  }
});
Object.defineProperty(exports, 'shallowSnapshot', {
  enumerable: true,
  get: function get() {
    return _testBodies.shallowSnapshot;
  }
});
Object.defineProperty(exports, 'renderOnly', {
  enumerable: true,
  get: function get() {
    return _testBodies.renderOnly;
  }
});
exports.default = testStorySnapshots;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _global = require('global');

var _global2 = _interopRequireDefault(_global);

var _readPkgUp = require('read-pkg-up');

var _readPkgUp2 = _interopRequireDefault(_readPkgUp);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _require_context = require('./require_context');

var _require_context2 = _interopRequireDefault(_require_context);

var _storybookChannelMock = require('./storybook-channel-mock');

var _storybookChannelMock2 = _interopRequireDefault(_storybookChannelMock);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getSnapshotFileName = _utils.getSnapshotFileName;


var storybook = void 0;
var configPath = void 0;
_global2.default.STORYBOOK_REACT_CLASSES = _global2.default.STORYBOOK_REACT_CLASSES || {};

var babel = require('babel-core');

var _readPkgUp$sync = _readPkgUp2.default.sync(),
    pkg = _readPkgUp$sync.pkg;

var hasDependency = function hasDependency(name) {
  return pkg.devDependencies && pkg.devDependencies[name] || pkg.dependencies && pkg.dependencies[name] || _fs2.default.existsSync(_path2.default.join('node_modules', name, 'package.json'));
};

function testStorySnapshots() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _addons2.default.setChannel((0, _storybookChannelMock2.default)());

  var isStorybook = options.framework === 'react' || !options.framework && hasDependency('@storybook/react');
  var isRNStorybook = options.framework === 'react-native' || !options.framework && hasDependency('@storybook/react-native');

  if (isStorybook) {
    storybook = require.requireActual('@storybook/react');
    // eslint-disable-next-line
    var loadBabelConfig = require('@storybook/react/dist/server/babel_config').default;
    var configDirPath = _path2.default.resolve(options.configPath || '.storybook');
    configPath = _path2.default.join(configDirPath, 'config.js');

    var babelConfig = loadBabelConfig(configDirPath);
    var content = babel.transformFileSync(configPath, babelConfig).code;
    var contextOpts = {
      filename: configPath,
      dirname: configDirPath
    };

    (0, _require_context2.default)(content, contextOpts);
  } else if (isRNStorybook) {
    storybook = require.requireActual('@storybook/react-native');

    configPath = _path2.default.resolve(options.configPath || 'storybook');
    require.requireActual(configPath);
  } else {
    throw new Error('storyshots is intended only to be used with storybook');
  }

  if (typeof _global.describe !== 'function') {
    throw new Error('testStorySnapshots is intended only to be used inside jest');
  }

  // NOTE: keep `suit` typo for backwards compatibility
  var suite = options.suite || options.suit || 'Storyshots';
  var stories = storybook.getStorybook();

  if (stories.length === 0) {
    throw new Error('storyshots found 0 stories');
  }

  // Added not to break existing storyshots configs (can be removed in a future major release)
  // eslint-disable-next-line
  options.storyNameRegex = options.storyNameRegex || options.storyRegex;
  var snapshotOptions = {
    renderer: options.renderer,
    serializer: options.serializer
  };
  // eslint-disable-next-line
  options.test = options.test || (0, _testBodies.snapshotWithOptions)({ options: snapshotOptions });

  // eslint-disable-next-line

  var _loop = function _loop(group) {
    var fileName = group.fileName,
        kind = group.kind;


    if (options.storyKindRegex && !kind.match(options.storyKindRegex)) {
      // eslint-disable-next-line
      return 'continue';
    }

    (0, _global.describe)(suite, function () {
      (0, _global.describe)(kind, function () {
        var _loop2 = function _loop2(story) {
          if (options.storyNameRegex && !story.name.match(options.storyNameRegex)) {
            // eslint-disable-next-line
            return 'continue';
          }

          (0, _global.it)(story.name, function () {
            var context = { fileName: fileName, kind: kind, story: story.name };
            return options.test({
              story: story,
              context: context
            });
          });
        };

        // eslint-disable-next-line
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = (0, _getIterator3.default)(group.stories), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var story = _step2.value;

            var _ret2 = _loop2(story);

            if (_ret2 === 'continue') continue;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      });
    });
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(stories), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var group = _step.value;

      var _ret = _loop(group);

      if (_ret === 'continue') continue;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

(0, _global.describe)('Storyshots Integrity', function () {
  (0, _global.describe)('Abandoned Storyshots', function () {
    var storyshots = _glob2.default.sync('**/*.storyshot');

    var abandonedStoryshots = storyshots.filter(function (fileName) {
      var possibleStoriesFiles = (0, _utils.getPossibleStoriesFiles)(fileName);
      return !possibleStoriesFiles.some(_fs2.default.existsSync);
    });

    expect(abandonedStoryshots).toHaveLength(0);
  });
});