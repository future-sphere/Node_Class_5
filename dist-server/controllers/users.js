"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _paginate = _interopRequireDefault(require("../helpers/paginate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fetchUsers = () => {
  return _User.default.find();
};

var addColor = (_ref) => {
  var {
    id,
    color
  } = _ref;
  return _User.default.findByIdAndUpdate(id, {
    $push: {
      favoriteColor: color
    }
  }, {
    new: true
  });
};

var removeColor = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (_ref3) {
    var {
      id,
      color
    } = _ref3;
    var currentUser = yield _User.default.findById(id);
    var {
      favoriteColor
    } = currentUser;
    var toRemove = favoriteColor.indexOf(color);
    favoriteColor.splice(toRemove, 1);
    console.log(favoriteColor);
    return _User.default.findByIdAndUpdate(id, {
      $set: {
        favoriteColor
      }
    }, {
      new: true
    });
  });

  return function removeColor(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var UserController = {
  fetchUsers,
  addColor,
  removeColor
};
var _default = UserController;
exports.default = _default;