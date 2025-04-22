import express from 'express';
import * as adminController from '../controllers/admin.controller';
import { newAdminValidator } from '../validators/admin.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/role';

const router = express.Router();

// //route to get all users
// router.get('', userController.getAllUsers);

//route to create a new user
router.post('/admreg', newAdminValidator, adminController.newAdmin);

//route to login a user
router.post('/admlogin', adminController.adminLogin);

// //route to get a single user
// router.get('/:id', userController.getUser);

//route for forgot password
router.post('/admforpass', adminController.adminForgotPassword);

//route for reset password
router.post('/admrespass',adminController.adminResetPassword);

export default router;
    