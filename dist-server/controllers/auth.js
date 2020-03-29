"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('dotenv').config();

var jwtSecret = process.env.JWT_SECRET;

var verifyToken = token => _jsonwebtoken.default.verify(token, jwtSecret);

var handleLogin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (data) {
    var {
      email,
      password
    } = data;

    if (email && password) {
      try {
        var user = yield _User.default.findOne({
          email
        });

        if (user) {
          var passwordMatch = _bcryptjs.default.compareSync(password, user.password);

          if (passwordMatch) {
            var token = _jsonwebtoken.default.sign({
              userId: user._id
            }, jwtSecret);

            return {
              token
            };
          }

          throw 'Password does not match';
        }

        throw 'User email is not found';
      } catch (error) {
        throw error;
      }
    } else {
      throw 'No email or password is provided';
    }
  });

  return function handleLogin(_x) {
    return _ref.apply(this, arguments);
  };
}();

var register = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (data) {
    var {
      email,
      password,
      firstName,
      lastName,
      age,
      favoriteColor
    } = data;

    try {
      var existed = yield _User.default.findOne({
        email
      });

      if (existed) {
        throw 'This email has been taken';
      }

      var newUser = {
        email,
        firstName,
        lastName,
        age,
        favoriteColor
      };

      var encryptedPassword = _bcryptjs.default.hashSync(password);

      newUser.password = encryptedPassword;
      return _User.default.create(newUser);
    } catch (error) {
      throw error;
    }
  });

  return function register(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var AuthController = {
  handleLogin,
  register,
  verifyToken
};
var _default = AuthController;
exports.default = _default;