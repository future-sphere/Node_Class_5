"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Friends = _interopRequireDefault(require("../models/Friends"));

var _paginate = _interopRequireDefault(require("../helpers/paginate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var acceptableColors = ['Blue', 'Green', 'Black', 'Yellow'];

var fetchUsers = () => {
  return _User.default.find();
}; // [Yellow, Green];


var createUser = data => {
  for (var i = 0; i < data.favoriteColor.length; i++) {
    if (!acceptableColors.includes(i)) {
      throw 'Unacceptable Color found ' + data.favoriteColor[i];
    }
  }

  return _User.default.create(data);
}; // const addFriend = async (user1, user2) => {
//   if (user1 === user2) throw 'You cannot add yourself as a friend';
//   if (user1 && user2) {
//     const found1 = await Friends.findOne({ user1, user2 });
//     const found2 = await Friends.findOne({ user1: user2, user2: user1 });
//     if (found1 || found2) {
//       throw 'These users are already friends';
//     }
//     return Friends.create({ user1, user2 });
//   }
//   throw 'Missing one or more user ID';
// };


var addFriend = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (_ref2) {
    var {
      userId,
      friendId
    } = _ref2;

    try {
      if (userId === friendId) throw 'You cannot add yourself as friend';

      if (userId && friendId) {
        var user = yield _User.default.findById(userId);

        if (user.friends.includes(friendId)) {
          throw 'You are already friends with this user';
        }

        yield _User.default.findByIdAndUpdate(userId, {
          $push: {
            friends: friendId
          }
        });
        yield _User.default.findByIdAndUpdate(friendId, {
          $push: {
            friends: userId
          }
        });
      }
    } catch (error) {
      throw error;
    }
  });

  return function addFriend(_x) {
    return _ref.apply(this, arguments);
  };
}();

var deleteFriends = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (_ref4) {
    var {
      friendId,
      userId
    } = _ref4;
    if (userId === friendId) throw 'You cannot delete yourself';

    if (userId && friendId) {
      try {
        var user = yield _User.default.findById(userId);
        var friend = yield _User.default.findById(friendId);

        if (user.friends.includes(friendId)) {
          yield _User.default.findByIdAndUpdate(userId, {
            $pull: {
              friends: friendId
            }
          });
          yield _User.default.findByIdAndUpdate(friendId, {
            $pull: {
              friends: userId
            }
          });
        } else {
          throw 'You are not friends with this person to begin with';
        }
      } catch (error) {
        throw error;
      }
    } else {
      throw 'You have to provide both ID';
    }
  });

  return function deleteFriends(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var addColor = (_ref5) => {
  var {
    id,
    color
  } = _ref5;
  return _User.default.findByIdAndUpdate(id, {
    $push: {
      favoriteColor: color
    }
  }, {
    new: true
  });
};

var removeColor = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (_ref7) {
    var {
      id,
      color
    } = _ref7;
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

  return function removeColor(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

var UserController = {
  fetchUsers,
  addColor,
  removeColor,
  createUser,
  addFriend,
  deleteFriends
};
var _default = UserController;
exports.default = _default;