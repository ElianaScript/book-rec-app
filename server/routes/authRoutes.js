import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { validateRegistration, validateLogin, checkValidationErrors } from '../middlewares/bodyValidationMiddleware.js';
router.get('/profile', protect, getUserProfile);

const router = express.Router();

router.post('/register', validateRegistration, checkValidationErrors, registerUser);
router.post('/login', validateLogin, checkValidationErrors, loginUser);
router.get('/profile', protect, getUserProfile);

export default router;
