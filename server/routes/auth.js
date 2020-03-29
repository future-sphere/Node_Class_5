import express from 'express';
import AuthController from '../controllers/auth';
import handler from '../helpers/handler';
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const result = await AuthController.register(req.body);
    handler({ res, success: true, data: result });
  } catch (error) {
    handler({ res, error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await AuthController.handleLogin(req.body);
    handler({ res, success: true, data: result });
  } catch (error) {
    handler({ res, error });
  }
});

export default router;
