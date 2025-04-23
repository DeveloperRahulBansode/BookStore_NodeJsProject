import HttpStatus from 'http-status-codes';
import * as AdminService from '../services/admin.service';

// /**
//  * Controller to get all users available
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
// export const getAllUsers = async (req, res, next) => {
//   try {
//     const data = await AdminService.getAllUsers();
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
export const newAdmin = async (req, res, next) => {
  try {
    const data = await AdminService.newAdmin(req.body);
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
      message: 'admin created successfully...'
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
export const adminLogin = async (req, res, next) => {
  try {
    const data = await AdminService.adminLogin(req.body);
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
      message: 'admin logged in successfully...'
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
export const adminForgotPassword = async (req, res, next) => {
  try {
    const data = await AdminService.adminForgotPassword(req.body.email);
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
      message: 'admin forgot password successfully'
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
export const adminResetPassword = async (req, res, next) => {
  try {
    const data = await AdminService.adminResetPassword(req.body.token, req.body.password, req.body.confirmPassword);
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
      message: 'admin reset password successfully'
    });
  } catch (error) {
    next(error);
  }
}
