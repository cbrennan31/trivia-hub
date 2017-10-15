'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deepEqualIdent = require('deep-equal-ident');

var _deepEqualIdent2 = _interopRequireDefault(_deepEqualIdent);

var _name = require('../utils/name');

var _name2 = _interopRequireDefault(_name);

var _stringify7 = require('../utils/stringify');

var _stringify8 = _interopRequireDefault(_stringify7);

var _single = require('../utils/single');

var _single2 = _interopRequireDefault(_single);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * This source code is licensed under the MIT-style license found in the
                                                                                                                                                                                                                   * LICENSE file in the root directory of this source tree. *
                                                                                                                                                                                                                   *
                                                                                                                                                                                                                   * @providesModule toHaveStateAssertion
                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                   */

function toHaveState(enzymeWrapper, stateKey, stateValue) {
  var state = enzymeWrapper.state();

  // error if the state key doesnt exist
  if (!state.hasOwnProperty(stateKey)) {
    return {
      pass: false,
      message: 'Expected <' + (0, _name2.default)(enzymeWrapper) + '> component state to have key of "' + stateKey + '"',
      negatedMessage: 'Expected <' + (0, _name2.default)(enzymeWrapper) + '> component state to not contain a key of "' + stateKey + '".',
      contextualInformation: {
        actual: 'Actual ' + (0, _stringify8.default)(_defineProperty({}, stateKey, state[stateKey])),
        expected: 'Expected state: ' + (0, _stringify8.default)(_defineProperty({}, stateKey, stateValue))
      }
    };
  }

  // key exists given above check, and we're not validating over values,
  // so its always true unless the undefined value was provided explicitly
  if (stateValue === undefined && arguments.length === 2) {
    return {
      pass: true,
      message: 'Expected <' + (0, _name2.default)(enzymeWrapper) + '> component state to have key of "' + stateKey + '"',
      negatedMessage: 'Expected <' + (0, _name2.default)(enzymeWrapper) + '> component state to not contain a key of "' + stateKey + '".',
      contextualInformation: {
        actual: 'Actual ' + (0, _stringify8.default)(_defineProperty({}, stateKey, state[stateKey])),
        expected: 'Expected state: ' + (0, _stringify8.default)(_defineProperty({}, stateKey, stateValue))
      }
    };
  }

  var equals = this && this.equals ? this.equals : _deepEqualIdent2.default;
  var pass = equals(state[stateKey], stateValue);

  return {
    pass: pass,
    message: 'Expected <' + (0, _name2.default)(enzymeWrapper) + '> component state values to match for key "' + stateKey + '" but they didn\'t.',
    negatedMessage: 'Expected <' + (0, _name2.default)(enzymeWrapper) + '> component state values to be different for key "' + stateKey + '" but they didn\'t.',
    contextualInformation: {
      actual: 'Actual ' + (0, _stringify8.default)(_defineProperty({}, stateKey, state[stateKey])),
      expected: 'Expected state: ' + (0, _stringify8.default)(_defineProperty({}, stateKey, stateValue))
    }
  };
}

exports.default = (0, _single2.default)(toHaveState);
module.exports = exports['default'];