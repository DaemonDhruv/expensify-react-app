"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// import moment from 'moment' -> won't work here, because recursively
// call this mock file
// We will use requireActual to import the original moment.js library
var moment = require.requireActual('moment'); // We are setting time to a specific point in time "0" if timestamp not provided.


var _default = function _default() {
  var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return moment(timestamp);
};

exports["default"] = _default;