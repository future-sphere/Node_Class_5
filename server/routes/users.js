import express from 'express';
import UserController from '../controllers/users';

const router = express.Router();

/* GET users listing. */
router.get('/fetch', async (req, res, next) => {
  const data = await UserController.fetchUsers();
  res.json({ success: true, data });
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
