'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addMatcher;
/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule addMatcher
 * 
 */

var coreMatchers = jasmine.matchers;
var errorThrown = false;

function addMatcher(matcher) {
  var matcherName = Object.keys(matcher)[0];

  /*
   * only throw one error so the console doesn't
   * become redunant errors
   */
  if (coreMatchers[matcherName] && !errorThrown) {
    errorThrown = true;
    throw new Error('JasmineEnzyme: Added matcher "' + matcherName + '" is over-riding\n       jasmine-core matcher. You must rename the function to\n       not over-ride anything core.');
  }

  jasmine.addMatchers(matcher);
}
module.exports = exports['default'];