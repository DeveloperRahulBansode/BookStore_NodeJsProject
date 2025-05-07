import HttpStatus from 'http-status-codes';
import * as WishlistService from '../services/wishlist.service';

//add book to wishlist
export const addToWishlist = async (req, res, next) => {
  try {
    const userID = res.locals.user.id; // Assuming userID is stored in res.locals.user after authentication
    const data = await WishlistService.addToWishlist(userID, req.params.bookID);

    if (!data.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: [],
        message: data.message || 'Failed to add book to wishlist',
      });
    }
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data.data,
      message: 'Book added to wishlist successfully',
    });
  } catch (error) {
    console.error('Error in addToWishlist controller:', error.message, error.stack);
    next(error);
  }
};

//remove book from wishlist
export const removeFromWishlist = async (req, res, next) => {
  try {
    const userID = res.locals.user.id; // Assuming userID is stored in res.locals.user after authentication
    const data = await WishlistService.removeFromWishlist(userID, req.params.bookID);

    if (!data.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: [],
        message: data.message || 'Failed to remove book from wishlist',
      });
    }
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data.data,
      message: 'Book removed from wishlist successfully',
    });
  } catch (error) {
    console.error('Error in removeFromWishlist controller:', error.message, error.stack);
    next(error);
  }
};

//get all books in the wishlist by userID
export const getWishlist = async (req, res, next) => {
  try {
    const userID = res.locals.user.id; // Assuming userID is stored in res.locals.user after authentication
    const data = await WishlistService.getWishlistByUserID(userID);

    if (!data.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: [],
        message: data.message || 'Failed to fetch wishlist',
      });
    }
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data.data,
      message: 'Wishlist fetched successfully',
    });
  } catch (error) {
    console.error('Error in getWishlistByUserID controller:', error.message, error.stack);
    next(error);
  }
};