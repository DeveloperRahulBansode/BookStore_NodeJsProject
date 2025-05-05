import express from 'express';
import * as customerController from '../controllers/customer.controller.js';
import { newCustomerValidator } from '../validators/customer.validator.js';
import { userAuth } from '../middlewares/auth.middleware.js';
import { hasRole } from '../middlewares/role.js';

const router = express.Router();

//route to add a customer
router.post('', userAuth, hasRole(['user']),newCustomerValidator, customerController.createCustomer);


export default router;