import express from 'express';
import PostController from '../controllers/posts';

const router = express.Router();

/* GET users listing. */
router.get('/fetch', async (req, res, next) => {
  const data = await PostController.fetchPosts();
  res.json({ success: true, data });
});

router.post('/create', async (req, res) => {
  const data = await PostController.createPost(req.body);
  res.json({
    success: true,
    data,
  });
});

router.delete('/remove', async (req, res) => {
  const data = await PostController.removePost(req.body.id);
  res.json({
    success: true,
    data,
  });
});

router.put('/update', async (req, res) => {
  const { title, description, authorId } = req.body;
  const data = await PostController.updatePost({ title, authorId, description });
  res.json({
    success: true,
    data,
  });
});

export default router;
