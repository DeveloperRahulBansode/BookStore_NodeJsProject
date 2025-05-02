import { Book } from "../models/book";
import { Op } from "sequelize"; // Import Op from Sequelize


// // Get all books
// export const getAllBooks = async () => {
//   try {
//     const data = await Book.findAll();
//     return { success: true, data };
//   } catch (error) {
//     console.error('Error fetching all books:', error);
//     return { success: false, message: error.message };
//   }
// };

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


// Get all books with pagination
export const getAllBooks = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit; // show datas per page and skip last page data and show only current page data
    const { rows: data, count: total } = await Book.findAndCountAll({
      limit,//
      offset,
    });

    return {
      success: true,
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),//round up to the nearest whole number that make total number of pages that show data
      },
    };
  } catch (error) {
    console.error('Error fetching all books:', error);
    return { success: false, message: error.message };
  }
};

// Search books by title
export const searchBooksByTitle = async (bookName) => {
  try {
    const data = await Book.findAll({
      where: { bookName: { [Op.like]: `%${bookName}%` } },
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error searching books by title:', error);
    return { success: false, message: error.message };
  }
};

// Search books by author
export const searchBooksByAuthor = async (author) => {
  try {
    const data = await Book.findAll({
      where: { author: { [Op.like]: `%${author}%` } },
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error searching books by author:', error);
    return { success: false, message: error.message };
  }
};

// Search books by createdAt date
export const searchBooksByDate = async (createdAt) => {
  try {
    const startDate = new Date(createdAt);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    const data = await Book.findAll({
      where: {
        createdAt: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        },
      },
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error searching books by date:', error);
    return { success: false, message: error.message };
  }
};

// Sort books by price
export const sortBooksByPrice = async (order = 'ASC') => {
  try {
    if (order !== 'ASC' && order !== 'DESC') {
      return { success: false, message: 'Invalid order parameter. Use "ASC" or "DESC".' };
    }
    const data = await Book.findAll({
      order: [['price', order]],
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error sorting books by price:', error);
    return { success: false, message: error.message };
  }
};
