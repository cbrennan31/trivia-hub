'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toBeEmpty;

var _html = require('../utils/html');

var _html2 = _interopRequireDefault(_html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBeEmptyAssertion
 * 
 */

function toBeEmpty(enzymeWrapper) {
  var pass = enzymeWrapper.length === 0;

  return {
    pass: pass,
    message: 'Expected to receive an empty set, but found ' + enzymeWrapper.length + ' nodes.',
    negatedMessage: 'Expected to receive an non-empty set, but found 0 nodes.',
    contextualInformation: {
      actual: 'Found Nodes HTML output: ' + (0, _html2.default)(enzymeWrapper)
    }
  };
}
module.exports = exports['default'];