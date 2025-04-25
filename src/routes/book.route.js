import express from 'express';
import * as bookController from '../controllers/book.controller';
import { newbookValidator } from '../validators/book.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { hasRole } from '../middlewares/role.js';

const router = express.Router();

// //route to get all books
router.get('', bookController.getAllBooks);

//route to create a new book

router.post('/create', userAuth, hasRole(['admin']), newbookValidator, bookController.createBook);

//route to update a book
router.put('/:bookID', userAuth, hasRole(['admin']), newbookValidator, bookController.updateBook);

//route to delete a book
router.delete('/:bookID', userAuth, hasRole(['admin']), bookController.deleteBook);

//route to get a single book
router.get('/:bookID', userAuth, hasRole(['admin']), newbookValidator, bookController.getBook);

export default router;
