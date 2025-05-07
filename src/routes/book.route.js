import express from 'express';
import * as bookController from '../controllers/book.controller';
import { newbookValidator } from '../validators/book.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { hasRole } from '../middlewares/role.js';

const router = express.Router();

//route to get all books
router.get('', userAuth, hasRole(['admin', 'user']), bookController.getAllBooks);

//route to create a new book
router.post('', userAuth, hasRole(['admin']), newbookValidator, bookController.createBook);


// Route to search books by title
router.get('/search/bookName', userAuth, hasRole(['admin', 'user']), bookController.searchBooksByTitle);

// Route to search books by author
router.get('/search/author', userAuth, hasRole(['admin', 'user']), bookController.searchBooksByAuthor);

// Route to search books by date
router.get('/search/createdAt', userAuth, hasRole(['admin', 'user']), bookController.searchBooksByDate);

// Route to sort books by price
router.get('/sort/price', userAuth, hasRole(['admin', 'user']), bookController.sortBooksByPrice);


//route to update a book
router.put('/:bookID', userAuth, hasRole(['admin']), newbookValidator, bookController.updateBook);

//route to delete a book
router.delete('/:bookID', userAuth, hasRole(['admin']), bookController.deleteBook);

//route to get a single book
router.get('/:bookID', userAuth, hasRole(['admin', 'user']), bookController.getBook);

export default router;