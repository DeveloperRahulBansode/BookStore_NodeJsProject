import express from 'express';
import * as cartController from '../controllers/cart.controller.js';
import { newCartValidator } from '../validators/cart.validator.js';
import { userAuth } from '../middlewares/auth.middleware.js';
import { hasRole } from '../middlewares/role.js';

const router = express.Router();

router.post('/:bookID', userAuth, hasRole(['user']), newCartValidator, cartController.addBookToCart);
router.get('', userAuth, hasRole(['user']), cartController.getCartItems);
router.put('/:cartID', userAuth, hasRole(['user']), cartController.updateCartItem);
router.delete('/:cartID', userAuth, hasRole(['user']), cartController.deleteCartItem);

export default router;