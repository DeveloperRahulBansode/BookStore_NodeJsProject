import express from 'express';
const router = express.Router();

import adminRoute from './admin.route.js';
import userRoute from './user.route.js';
import bookRoute from './book.route.js';
import cartRoute from './cart.route.js';
import wishlistRoute from './wishlist.route.js';
import customerRoute from './customer.route.js';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/msg', (req, res) => {
    res.json('Welcome');
  });

  router.use('/users', userRoute);
  router.use('/admins', adminRoute);
  router.use('/books', bookRoute);
  router.use('/carts', cartRoute);
  router.use('/wishlists', wishlistRoute);
  router.use('/customers', customerRoute);


  return router;
};

export default routes;
