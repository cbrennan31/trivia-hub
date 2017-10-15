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

var _html = require('../utils/html');

var _html2 = _interopRequireDefault(_html);

var _single = require('../utils/single');

var _single2 = _interopRequireDefault(_single);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * This source code is licensed under the MIT-style license found in the
                                                                                                                                                                                                                   * LICENSE file in the root directory of this source tree. *
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * @providesModule toHaveStyleAssertion
                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                   */

function toHaveStyle(enzymeWrapper, styleKey, styleValue) {
  var style = enzymeWrapper.prop('style');

  // error if component doesnt have style
  if (!style) {
    return {
      pass: false,
      message: 'Expected <' + (0, _name2.default)(enzymeWrapper) + '> component to have a style prop but it did not.',
      negatedMessage: 'Expected <' + (0, _name2.default)(enzymeWrapper) + '> component not to have a style prop but it did.',
      contextualInformation: {
        actual: (0, _html2.default)(enzymeWrapper)
      }
    };
  }

  // error if the style key doesnt exist
  if (!style.hasOwnProperty(styleKey)) {
    return {
      pass: false,
      message: 'Expected <' + (0, _name2.default)(enzymeWrapper) + '> component to have a style key of "' + styleKey + '" but it did not.',
      negatedMessage: 'Expected <' + (0, _name2.default)(enzymeWrapper) + '> component not to have a style key of "' + styleKey + '" but it did.',
      contextualInformation: {
        actual: (0, _html2.default)(enzymeWrapper)
      }
    };
  }

  var equals = this && this.equals ? this.equals : _deepEqualIdent2.default;
  var pass = equals(style[styleKey], styleValue);

  return {
    pass: pass,
    message: 'Expected <' + (0, _name2.default)(enzymeWrapper) + '> component style values to match for key "' + styleKey + '", but they didn\'t',
    negatedMessage: 'Expected <' + (0, _name2.default)(enzymeWrapper) + '> component style values to be different for key "' + styleKey + '", but they weren\'t',
    contextualInformation: {
      actual: 'Actual: ' + (0, _stringify4.default)(_defineProperty({}, styleKey, style[styleKey])),
      expected: 'Expected: ' + (0, _stringify4.default)(_defineProperty({}, styleKey, styleValue))
    }
  };
}

exports.default = (0, _single2.default)(toHaveStyle);
module.exports = exports['default'];