import express from 'express';
const router = express.Router();

import userRoute from './admin.route.js';
import adminRoute from './user.route.js';
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

  return router;
};

export default routes;
