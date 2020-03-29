import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    age: Number,
    favoriteFood: [String],
    favoriteColor: [String],
    friends: [String],
    email: String,
    password: String,
  },
  {
    collection: 'users',
  },
);

const Users = mongoose.model('User', UserSchema, 'users');

export default Users;
