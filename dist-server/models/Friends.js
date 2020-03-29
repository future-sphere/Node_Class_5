"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FriendsSchema = new _mongoose.default.Schema({
  user1: String,
  user2: String
}, {
  collection: 'friends'
});

var Friends = _mongoose.default.model('Friends', FriendsSchema, 'friends');

var _default = Friends;
exports.default = _default;