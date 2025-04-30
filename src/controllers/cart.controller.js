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

  //get cart items
export const getCartItems = async (req, res, next) => {
    try {
      const userID = res.locals.user.id; 
      const data = await CartService.getCartItems(userID);
  
      if (!data.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          data: [],
          message: data.message || 'Failed to fetch cart items',
        });
      }
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data.data,
        totalPrice: data.totalPrice,
        message: 'Cart items fetched successfully',
      });
    } catch (error) {
      console.error('Error in getCartItems controller:', error.message, error.stack);
      next(error);
    }
  };

//update cart item
export const updateCartItem = async (req, res, next) => {
    try {
      const userID = res.locals.user.id; 
      const { cartID, quantity } = req.body;
      const data = await CartService.updateCartItem(userID, cartID, quantity);
  
      if (!data.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          data: [],
          message: data.message || 'Failed to update cart item',
        });
      }
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data.data,
        message: 'Cart item updated successfully',
      });
    } catch (error) {
      console.error('Error in updateCartItem controller:', error.message, error.stack);
      next(error);
    }
  };

//delete cart item
export const deleteCartItem = async (req, res, next) => {
    try {
      const userID = res.locals.user.id; 
      const { cartID } = req.body;
      const data = await CartService.deleteCartItem(userID, cartID);
  
      if (!data.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          data: [],
          message: data.message || 'Failed to delete cart item',
        });
      }
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data.data,
        message: 'Cart item deleted successfully',
      });
    } catch (error) {
      console.error('Error in deleteCartItem controller:', error.message, error.stack);
      next(error);
    }
  };