import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    age: Number,
    favoriteFood: [String],
    favoriteColor: [String],
  },
  {
    collection: 'users',
  },
);

const Users = mongoose.model('User', UserSchema, 'users');

export default Users;
