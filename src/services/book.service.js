import { Book } from "../models/book";  

// Get all books
export const getAllBooks = async () => {
  try {
    const data = await Book.findAll();
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching all books:', error);
    return { success: false, message: error.message };
  }
};

// Create a new book
export const newBook = async (bookData) => {
  try {
   
    const book = await Book.create(bookData);
    return { success: true, data: book };
  } catch (error) {
    console.error('Error creating book:', error);
    return { success: false, message: error.message };
  }
};

// Update a single book
export const updateBook = async (bookID, body) => {
  try {
    const [updatedRows] = await Book.update(body, {
      where: { bookID: bookID },
    });

    if (updatedRows === 0) {
      return { success: false, message: 'No book found to update' };
    }

    const updatedBook = await Book.findByPk(bookID);
    return { success: true, data: updatedBook };
  } catch (error) {
    console.error('Error updating book:', error);
    return { success: false, message: error.message };
  }
};

// Delete a single book
export const deleteBook = async (bookID) => {
  try {
    const deletedRows = await Book.destroy({ where: { bookID: bookID } });

    if (deletedRows === 0) {
      return { success: false, message: 'No book found to delete' };
    }

    return { success: true, message: 'Book deleted successfully' };
  } catch (error) {
    console.error('Error deleting book:', error);
    return { success: false, message: error.message };
  }
};

// Get a single book
export const getBook = async (bookID) => {
  try {
    const data = await Book.findByPk(bookID);

    if (!data) {
      return { success: false, message: 'Book not found' };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching book:', error);
    return { success: false, message: error.message };
  }
};