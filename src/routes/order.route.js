import express from 'express';
import * as orderController from '../controllers/order.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';
import { hasRole } from '../middlewares/role.js';

const router = express.Router();

//route to create a new order
router.post('', userAuth, hasRole(['user']), orderController.placeOrder);
//route to get order summary
router.get('', userAuth, hasRole(['user']), orderController.getOrderSummary);

export default router;