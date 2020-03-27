import Posts from '../models/Post';
import paginate from '../helpers/paginate';
import Users from '../models/User';

const fetchPosts = () => {
  return Posts.findById('5e77d8b866b45f13a3fcdc65');
};

const createPost = data => {
  return Posts.create(data);
};

const removePost = id => {
  return Posts.findByIdAndRemove(id);
};

const updatePost = ({ title, description, authorId }) => {
  return Posts.findByIdAndUpdate(
    authorId,
    {
      $set: {
        title,
        description,
      },
    },
    {
      new: true,
    },
  );
};

// const updatePost = (title, description, id) => {

// }

const PostController = {
  fetchPosts,
  createPost,
  removePost,
  updatePost,
};

export default PostController;
