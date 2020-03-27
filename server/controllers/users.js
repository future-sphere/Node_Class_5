import Users from '../models/User';
import paginate from '../helpers/paginate';

const fetchUsers = () => {
  return Users.find();
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
};

export default UserController;
