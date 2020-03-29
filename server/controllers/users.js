import Users from '../models/User';
import Friends from '../models/Friends';
import paginate from '../helpers/paginate';
import redis from 'redis';
const redisClient = redis.createClient();

const acceptableColors = ['Blue', 'Green', 'Black', 'Yellow'];

const fetchUsers = async res => {
  redisClient.get('allUsers', async (err, sessionData) => {
    if (err) {
      console.log(err);
    }
    if (sessionData) {
      console.log('using session instead');
      const json = JSON.parse(sessionData);
      const { data } = json;
      res.json({
        success: true,
        data: data,
      });
    } else {
      const users = await Users.find();
      const dataToSaveToSession = {
        data: users,
      };
      const stringData = JSON.stringify(dataToSaveToSession);
      redisClient.set('allUsers', stringData, 'EX', 60, (err, data) => {
        if (err) {
          console.log(err);
        }
        res.json({
          success: true,
          data: users,
        });
      });
    }
  });
};

// [Yellow, Green];

const createUser = data => {
  for (let i = 0; i < data.favoriteColor.length; i++) {
    if (!acceptableColors.includes(i)) {
      throw 'Unacceptable Color found ' + data.favoriteColor[i];
    }
  }
  return Users.create(data);
};

// const addFriend = async (user1, user2) => {
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

const addFriend = async ({ userId, friendId }) => {
  try {
    if (userId === friendId) throw 'You cannot add yourself as friend';
    if (userId && friendId) {
      const user = await Users.findById(userId);
      if (user.friends.includes(friendId)) {
        throw 'You are already friends with this user';
      }

      await Users.findByIdAndUpdate(userId, {
        $push: {
          friends: friendId,
        },
      });

      await Users.findByIdAndUpdate(friendId, {
        $push: {
          friends: userId,
        },
      });
    }
  } catch (error) {
    throw error;
  }
};

const deleteFriends = async ({ friendId, userId }) => {
  if (userId === friendId) throw 'You cannot delete yourself';
  if (userId && friendId) {
    try {
      const user = await Users.findById(userId);
      const friend = await Users.findById(friendId);
      if (user.friends.includes(friendId)) {
        await Users.findByIdAndUpdate(userId, {
          $pull: {
            friends: friendId,
          },
        });
        await Users.findByIdAndUpdate(friendId, {
          $pull: {
            friends: userId,
          },
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
};

const addColor = ({ id, color }) => {
  return Users.findByIdAndUpdate(
    id,
    {
      $push: {
        favoriteColor: color,
      },
    },
    { new: true },
  );
};

const removeColor = async ({ id, color }) => {
  const currentUser = await Users.findById(id);

  const { favoriteColor } = currentUser;
  const toRemove = favoriteColor.indexOf(color);
  favoriteColor.splice(toRemove, 1);
  console.log(favoriteColor);
  return Users.findByIdAndUpdate(
    id,
    {
      $set: {
        favoriteColor,
      },
    },
    { new: true },
  );
};

const UserController = {
  fetchUsers,
  addColor,
  removeColor,
  createUser,
  addFriend,
  deleteFriends,
};

export default UserController;
