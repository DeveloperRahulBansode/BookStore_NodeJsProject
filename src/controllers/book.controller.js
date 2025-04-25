import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.service';

//
/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllBooks = async (req, res, next) => {
  try {
    const data = await BookService.getAllBooks();
    if (!data.success) {
      return res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        data: [],
        message: 'No books found'
      });
    }
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All books fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};
//
/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const createBook = async (req, res, next) => {
    try {
      const data = await BookService.newBook(req.body);
      if (!data.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          data: [],
          message: 'Failed to create book',
        });
      }
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Book created successfully',
      });
    } catch (error) {
      next(error);
    }
  };

// Controller to update a book
/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateBook = async (req, res, next) => {
  try {
    const data = await BookService.updateBook(req.params.bookID, req.body);
    if (!data.success) {
      return res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        data: [],
        message: 'Book not found'
      });
    }
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Book updated successfully'
    });
  } catch (error) {
    next(error);
  }
};
//
// Controller to delete a book

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteBook = async (req, res, next) => {
  try {
    const data = await BookService.deleteBook(req.params.bookID);
    if (!data.success) {
      return res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        data: [],
        message: 'Book not found'
      });
    }
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
//
// Controller to get a single book by ID
/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const getBook = async (req, res, next) => {
  try {
    const data = await BookService.getBook(req.params.bookID);
    if (!data.success) {
      return res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        data: [],
        message: 'Book not found'
      });
    }
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Book fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};
//
