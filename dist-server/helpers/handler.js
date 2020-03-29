"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var handler = (_ref) => {
  var {
    res,
    success,
    data,
    error
  } = _ref;
  console.log(res, success, data, error);

  if (error) {
    return res.json({
      data: error,
      success: false
    });
  }

  return res.json({
    success,
    data
  });
};

var _default = handler;
exports.default = _default;