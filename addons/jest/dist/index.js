'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withTests = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findTestResults = function findTestResults(testFiles, jestTestResults, jestTestFilesExt) {
  return testFiles.map(function (name) {
    if (jestTestResults && jestTestResults.testResults) {
      return {
        name: name,
        result: jestTestResults.testResults.find(function (t) {
          return new RegExp('' + name + jestTestFilesExt).test(t.name);
        })
      };
    }
    return { name: name };
  });
};

var emitAddTests = function emitAddTests(_ref) {
  var kind = _ref.kind,
      story = _ref.story,
      testFiles = _ref.testFiles,
      options = _ref.options;

  _addons2.default.getChannel().emit('storybook/tests/add_tests', {
    kind: kind,
    storyName: story,
    tests: findTestResults(testFiles, options.results, options.filesExt)
  });
};

var withTests = exports.withTests = function withTests(userOptions) {
  var defaultOptions = {
    filesExt: '((\\.specs?)|(\\.tests?))?(\\.js)?$'
  };
  var options = (0, _assign2.default)({}, defaultOptions, userOptions);

  return function () {
    for (var _len = arguments.length, testFiles = Array(_len), _key = 0; _key < _len; _key++) {
      testFiles[_key] = arguments[_key];
    }

    return function (storyFn, _ref2) {
      var kind = _ref2.kind,
          story = _ref2.story;

      emitAddTests({ kind: kind, story: story, testFiles: testFiles, options: options });

      return storyFn();
    };
  };
};