import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller.js';
import { newWishlistValidator } from '../validators/wishlist.validator.js';
import { userAuth } from '../middlewares/auth.middleware.js';
import { hasRole } from '../middlewares/role.js';

const router = express.Router();

router.post('', userAuth, hasRole(['user']), newWishlistValidator, wishlistController.addToWishlist);




export default router;