'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _addMatcher2 = require('./addMatcher');

var _addMatcher3 = _interopRequireDefault(_addMatcher2);

var _enzymeMatchers = require('enzyme-matchers');

var _enzymeMatchers2 = _interopRequireDefault(_enzymeMatchers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * This source code is licensed under the MIT-style license found in the
                                                                                                                                                                                                     * LICENSE file in the root directory of this source tree. *
                                                                                                                                                                                                     *
                                                                                                                                                                                                     * @providesModule JasmineEnzyme
                                                                                                                                                                                                     * 
                                                                                                                                                                                                     */

function jasmineEnzyme() {
  // Migration step for moving people from jasmine-enzyme
  // to jest-enzyme
  if (typeof jest !== 'undefined') {
    throw new Error('\n      [jasmine-enzyme] The jest usage has been moved to a new package: "jest-enzyme".\n      Use that project instead of this. For more information, see: _______\n    ');
  }

  var toJasmineMatcher = function toJasmineMatcher(matcherFn) {
    return function (util, customEqualityTesters) {
      // Convert the equals util from jasmine to share the same interface as jest
      var equals = function equals(actual, expected) {
        return util.equals(actual, expected, customEqualityTesters);
      };
      return {
        compare: function compare() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var results = matcherFn.call.apply(matcherFn, [{ equals: equals }].concat(_toConsumableArray(args)));

          if (results.contextualInformation.actual) {
            results.message += '\nexpected: ' + results.contextualInformation.actual;
          }

          if (results.contextualInformation.expected) {
            results.message += '\nreceived: ' + results.contextualInformation.expected;
          }

          return results;
        },
        negativeCompare: function negativeCompare() {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          var results = matcherFn.call.apply(matcherFn, [{ equals: equals }].concat(_toConsumableArray(args)));

          if (results.contextualInformation.actual) {
            results.negatedMessage += '\nexpected: ' + results.contextualInformation.actual;
          }

          if (results.contextualInformation.expected) {
            results.negatedMessage += '\nreceived: ' + results.contextualInformation.expected;
          }

          return {
            pass: !results.pass,
            message: results.negatedMessage
          };
        }
      };
    };
  };

  var matchers = Object.keys(_enzymeMatchers2.default);

  matchers.forEach(function (matcher) {
    (0, _addMatcher3.default)(_defineProperty({}, matcher, toJasmineMatcher(_enzymeMatchers2.default[matcher])));
  });
}

// Also expose enzymeMatchers directly so that the matchers can be added on a per-spec basis
// instead of globally on the jasmine object. This also supports older versions of jasmine where
// jasmine.addMatchers isn't defined and matchers must be added to the spec in a beforeEach().
//
// Add enzymeMatchers as an expando property onto the jasmineEnzyme function for backwards
// compatibility with previous versions of jasmine-enzyme.
jasmineEnzyme.enzymeMatchers = _enzymeMatchers2.default;

exports.default = jasmineEnzyme;
module.exports = exports['default'];