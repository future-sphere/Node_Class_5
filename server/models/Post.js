import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  authorId: String,
});

const Posts = mongoose.model('Posts', PostSchema);

export default Posts;
