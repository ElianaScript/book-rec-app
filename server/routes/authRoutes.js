import express from 'express';
import { registerUser, loginUser, getUserProfile} from '../controllers/authController.js';
import { validateRegistration, validateLogin, checkValidationErrors } from '../middleware/bodyValidationMiddleware.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', validateRegistration, checkValidationErrors, registerUser);
router.post('/login', validateLogin, checkValidationErrors, loginUser);
router.get('/profile', verifyToken, getUserProfile);

export default router;
