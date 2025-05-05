import HttpStatus from 'http-status-codes';
import * as OrderService from '../services/order.service.js';


export const placeOrder = async (req, res, next) => {
    try {
    const userID = res.locals.user.id; // Assuming userID is stored in res.locals.user after authentication
  
      const result = await OrderService.placeOrder(userID);
  
      if (!result.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: result.message,
          data: []
        });
      }
  
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        message: 'Order placed successfully',
        data: result.data,
        totalAmount: result.totalAmount
      });
    } catch (error) {
      next(error);
    }
  };

  //get order summary
export const getOrderSummary = async (req, res, next) => {
    try {
      const userID = res.locals.user.id; // Assuming userID is stored in res.locals.user after authentication
  
      const result = await OrderService.getOrdersByUserID(userID);
  
      if (!result.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: result.message,
          data: []
        });
      }
  
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Order summary fetched successfully',
        data: result.data
      });
    } catch (error) {
      next(error);
    }
  };