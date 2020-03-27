"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _posts = _interopRequireDefault(require("../controllers/posts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express.default.Router();
/* GET users listing. */


router.get('/fetch', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var data = yield _posts.default.fetchPosts();
    res.json({
      success: true,
      data
    });
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/create', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var data = yield _posts.default.createPost(req.body);
    res.json({
      success: true,
      data
    });
  });

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());
router.delete('/remove', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var data = yield _posts.default.removePost(req.body.id);
    res.json({
      success: true,
      data
    });
  });

  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());
router.put('/update', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var {
      title,
      description,
      authorId
    } = req.body;
    var data = yield _posts.default.updatePost({
      title,
      authorId,
      description
    });
    res.json({
      success: true,
      data
    });
  });

  return function (_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = router;
exports.default = _default;