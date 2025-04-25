import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import { generateTokens, verifyRefreshToken } from '../utils/jwtToken';

// /**
//  * Controller to get all users available
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
// export const getAllUsers = async (req, res, next) => {
//   try {
//     const data = await UserService.getAllUsers();
//     if (!data.success) {
//       return res.status(HttpStatus.NOT_FOUND).json({
//         code: HttpStatus.NOT_FOUND,
//         data: [],
//         message: 'No users found'
//       });
//     }
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       data: data,
//       message: 'All users fetched successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * Controller to get a single user
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
// export const getUser = async (req, res, next) => {
//   try {
//     const data = await UserService.getUser(req.params.id);
//     if (!data.success) {
//       return res.status(HttpStatus.NOT_FOUND).json({
//         code: HttpStatus.NOT_FOUND,
//         data: [],
//         message: 'User not found'
//       });
//     }
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       data: data,
//       message: 'User fetched successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res, next) => {
  try {
    req.body.role = 'user';
    const data = await UserService.newUser(req.body);
    if (!data.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: [],
        message: data.message
      });
    }
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully...'
    });
  } catch (error) {
    next(error);
  }
};

//refresh token
export const refreshToken = async (req, res, next) => {
  try {   
    // Call the service to refresh the token
    const userData = await UserService.userRefreshToken(req.body.refreshToken);

    // Check if the service returned success
    if (!userData.success) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        data: [],
        message: userData.message || 'Invalid refresh token',
      });
    }

    // Return the new tokens
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: {
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken,
      },
      message: 'Tokens generated successfully',
    });
  } catch (error) {
    next(error);
  }
};


/**
 * Controller to login a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const userLogin = async (req, res, next) => {
  try {
    const data = await UserService.userLogin(req.body);
    if (!data.success) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        data: [],
        message: data.message
      });
    }
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User logged in successfully...'
    });
  } catch (error) {
    next(error);
  }
}


/**
 * Controller to handle user forgot password
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const userForgotPassword = async (req, res, next) => {
  try {
    const data = await UserService.userForgotPassword(req.body.email);
    if (!data.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: [],
        message: data.message
      });
    }
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User forgot password successfully'
    });
  } catch (error) {
    next(error);
  }
} 


/**
 * Controller to handle user reset password
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const userResetPassword = async (req, res, next) => {
  try {
    const data = await UserService.userResetPassword(req.body.token, req.body.password, req.body.confirmPassword);
    if (!data.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: [],
        message: data.message
      });
    }
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User reset password successfully'
    });
  } catch (error) {
    next(error);
  }
}
