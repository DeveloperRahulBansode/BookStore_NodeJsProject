import express from 'express';
import * as adminController from '../controllers/admin.controller.js';
import { newAdminValidator } from '../validators/admin.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/role';

const router = express.Router();

// //route to get all users
// router.get('', userController.getAllUsers);

//route to create a new user
router.post('', newAdminValidator, adminController.newAdmin);

//route to login a user
router.post('/login', adminController.adminLogin);

// //route to get a single user
// router.get('/:id', userController.getUser);

//refresh token
router.post('/token/refresh', adminController.refreshToken);

//route for forgot password
router.post('/forget', adminController.adminForgotPassword);

//route for reset password
router.post('/reset',adminController.adminResetPassword);

export default router;
    