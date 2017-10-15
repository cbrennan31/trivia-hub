'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deepEqualIdent = require('deep-equal-ident');

var _deepEqualIdent2 = _interopRequireDefault(_deepEqualIdent);

var _name = require('../utils/name');

var _name2 = _interopRequireDefault(_name);

var _stringify3 = require('../utils/stringify');

var _stringify4 = _interopRequireDefault(_stringify3);

var _single = require('../utils/single');

var _single2 = _interopRequireDefault(_single);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * This source code is licensed under the MIT-style license found in the
                                                                                                                                                                                                                   * LICENSE file in the root directory of this source tree. *
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * @providesModule toHavePropAssertion
                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                   */

function toHaveProp(enzymeWrapper, propKey, propValue) {
  var props = enzymeWrapper.props();
  var contextualInformation = {
    actual: 'Actual: ' + (0, _stringify4.default)(_defineProperty({}, propKey, props[propKey])),
    expected: 'Expected: ' + (0, _stringify4.default)(_defineProperty({}, propKey, propValue))
  };

  // error if the prop doesnt exist
  if (!props.hasOwnProperty(propKey)) {
    contextualInformation.actual = '';

    return {
      pass: false,
      message: 'Expected wrapper to have prop "' + propKey + '", but it did not.',
      negatedMessage: 'Expected wrapper not to have prop "' + propKey + '", but it did.',
      contextualInformation: contextualInformation
    };
  }

  // key exists given above check, and we're not validating over values,
  // so its always true unless the undefined value was provided explicitly
  if (propValue === undefined && arguments.length === 2) {
    return {
      pass: true,
      message: 'Expected wrapper to have any value for the prop "' + propKey + '"',
      negatedMessage: 'Expected wrapper not to receive the prop "' + propKey + '"',
      contextualInformation: contextualInformation
    };
  }

  var equals = this && this.equals ? this.equals : _deepEqualIdent2.default;
  var pass = equals(props[propKey], propValue);

  return {
    pass: pass,
    message: 'Expected <' + (0, _name2.default)(enzymeWrapper) + '> "' + propKey + '" prop values to match but they didn\'t.',
    negatedMessage: 'Expected <' + (0, _name2.default)(enzymeWrapper) + '> "' + propKey + '" prop values not to match, but they did.',
    contextualInformation: contextualInformation
  };
}

exports.default = (0, _single2.default)(toHaveProp);
module.exports = exports['default'];