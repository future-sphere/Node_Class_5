import express from 'express';
import UserController from '../controllers/users';
import handler from '../helpers/handler';

const router = express.Router();

/* GET users listing. */
router.get('/fetch', async (req, res, next) => {
  const data = await UserController.fetchUsers();
  res.json({ success: true, data });
});

router.post('/', async (req, res) => {
  try {
    const data = await UserController.createUser(req.body);
    res.json({
      success: true,
      data,
    });
  } catch (e) {
    res.json({
      success: false,
      data: e,
    });
  }
});

// router.post('/friends', async (req, res) => {
//   try {
//     const { userId, friendId } = req.body;
//     await UserController.addFriend(userId, friendId);
//     res.json({
//       success: true,
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       data: error,
//     });
//   }
// });

router.post('/friends', async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    await UserController.addFriend({ userId, friendId });
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      data: error,
      success: false,
    });
  }
});

router.delete('/friends', async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    await UserController.deleteFriends({ userId, friendId });
    console.log('success');
    return handler({ res, success: true });
  } catch (error) {
    return handler({ res, error });
  }
});

router.put('/addColor', async (req, res) => {
  const { id, color } = req.body;
  const data = await UserController.addColor({ id, color });
  res.json({
    success: true,
    data,
  });
});

router.put('/removeColor', async (req, res) => {
  const { id, color } = req.body;
  const data = await UserController.removeColor({ id, color });
  res.json({
    success: true,
    data,
  });
});

export default router;
