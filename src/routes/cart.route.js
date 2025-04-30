import express from 'express';
import * as cartController from '../controllers/cart.controller.js';
import { newCartValidator } from '../validators/cart.validator.js';
import { userAuth } from '../middlewares/auth.middleware.js';
import { hasRole } from '../middlewares/role.js';

const router = express.Router();



router.post('', userAuth, hasRole(['user']), newCartValidator, cartController.addBookToCart);


export default router;
