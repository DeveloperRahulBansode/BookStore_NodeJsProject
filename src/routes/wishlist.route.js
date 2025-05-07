import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller.js';
import { newWishlistValidator } from '../validators/wishlist.validator.js';
import { userAuth } from '../middlewares/auth.middleware.js';
import { hasRole } from '../middlewares/role.js';

const router = express.Router();

router.post('/:bookID', userAuth, hasRole(['user']), newWishlistValidator, wishlistController.addToWishlist);
router.delete('/:bookID', userAuth, hasRole(['user']),newWishlistValidator, wishlistController.removeFromWishlist);
router.get('', userAuth, hasRole(['user']), wishlistController.getWishlist);


export default router;