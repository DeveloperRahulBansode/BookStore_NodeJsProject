import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';

export const addBookToCart = async (req, res, next) => {
    try {
      const userID = res.locals.user.id; // Assuming userID is stored in req.user after authentication
      const { bookID } = req.body;
      const data = await CartService.addBookToCart(userID, bookID);
  
      if (!data.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          data: [],
          message: data.message || 'Failed to add book to cart',
        });
      }
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data.data,
        message: 'Book added to cart successfully',
      });
    } catch (error) {
      console.error('Error in addBookToCart controller:', error.message, error.stack);
      next(error);
    }
  };
  