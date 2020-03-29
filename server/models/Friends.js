import mongoose from 'mongoose';

const FriendsSchema = new mongoose.Schema(
  {
    user1: String,
    user2: String,
  },
  {
    collection: 'friends',
  },
);

const Friends = mongoose.model('Friends', FriendsSchema, 'friends');

export default Friends;
