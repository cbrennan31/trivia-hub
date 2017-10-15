'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = require('../utils/name');

var _name2 = _interopRequireDefault(_name);

var _html = require('../utils/html');

var _html2 = _interopRequireDefault(_html);

var _single = require('../utils/single');

var _single2 = _interopRequireDefault(_single);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toBeCheckedAssertion
 * 
 */

function toBeChecked(enzymeWrapper) {
  var pass = false;

  var props = enzymeWrapper.props();

  // set to the default checked
  if (props.hasOwnProperty('defaultChecked')) {
    pass = props.defaultChecked || false;
  }

  // if it has the checked property, CHECK that.
  if (props.hasOwnProperty('checked')) {
    pass = props.checked;
  }

  return {
    pass: pass,
    message: 'Expected "' + (0, _name2.default)(enzymeWrapper) + '" to be checked but it wasn\'t.',
    negatedMessage: 'Expected "' + (0, _name2.default)(enzymeWrapper) + '" not to be checked but it was.',
    contextualInformation: {
      actual: 'Node HTML output: ' + (0, _html2.default)(enzymeWrapper)
    }
  };
}

exports.default = (0, _single2.default)(toBeChecked);
module.exports = exports['default'];