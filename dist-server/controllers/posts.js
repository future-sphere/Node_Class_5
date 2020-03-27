"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Post = _interopRequireDefault(require("../models/Post"));

var _paginate = _interopRequireDefault(require("../helpers/paginate"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchPosts = () => {
  return _Post.default.findById('5e77d8b866b45f13a3fcdc65');
};

var createPost = data => {
  return _Post.default.create(data);
};

var removePost = id => {
  return _Post.default.findByIdAndRemove(id);
};

var updatePost = (_ref) => {
  var {
    title,
    description,
    authorId
  } = _ref;
  return _Post.default.findByIdAndUpdate(authorId, {
    $set: {
      title,
      description
    }
  }, {
    new: true
  });
}; // const updatePost = (title, description, id) => {
// }


var PostController = {
  fetchPosts,
  createPost,
  removePost,
  updatePost
};
var _default = PostController;
exports.default = _default;