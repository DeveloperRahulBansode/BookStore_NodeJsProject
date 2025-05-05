import HttpStatus from 'http-status-codes';
import * as CustomerService from '../services/customer.service.js';

// Controller to create a new customer
/**
 * Controller to create a new customer
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const createCustomer = async (req, res, next) => {
  try {

    //userID is stored in res.locals.user after authentication
    const userID = res.locals.user.id; 
    req.body.userID = userID; 

    const data = await CustomerService.addCustomer(req.body);
    if (!data.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: [],
        message:data.message || 'Failed to create customer',
      });
    }
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: data.message || 'Customer created successfully',
    });
  } catch (error) {
    next(error);
  }
}
