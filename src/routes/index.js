import express from 'express';
const router = express.Router();

import adminRoute from './admin.route.js';
import userRoute from './user.route.js';
import bookRoute from './book.route.js';

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
  router.use('/admin', adminRoute);
  router.use('/books', bookRoute);

  return router;
};

export default routes;
