import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/role';

const router = express.Router();

// //route to get all users
// router.get('', userController.getAllUsers);

//route to create a new user
router.post('', newUserValidator, userController.newUser);

//route to login a user
router.post('/login', userController.userLogin);

// //route to get a single user
// router.get('/:id', userController.getUser);

//route for forgot password
router.post('/forget', userController.userForgotPassword);

//route for reset password
router.post('/reset',userController.userResetPassword);

export default router;
    