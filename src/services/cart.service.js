import { Cart } from '../models/cart.js';
import { Book } from '../models/book.js';

export const addBookToCart = async (userID, bookID) => {
  try {
    // Validate input
    if (!userID) {
      return { success: false, message: 'Invalid userID' };
    }
    if (!bookID) {
      return { success: false, message: 'Invalid bookID' };
    }

    // Check if the book exists
    const book = await Book.findByPk(bookID);
    if (!book) {
      return { success: false, message: 'Book not found' };
    }

    // Check if the book is already in the cart
    const existing = await Cart.findOne({ where: { userID, bookID } });
    if (existing) {
      existing.quantity += 1;
      await existing.save();
      return { success: true, data: existing };
    }

    // Add the book to the cart
    const cartItem = await Cart.create({
      userID,
      bookID,
      quantity: 1,
      price: book.price, // Assuming `price` exists in the `Book` model
    });
    return { success: true, data: cartItem };
    
  } catch (error) {
    console.error('Error adding book to cart:', error.message, error.stack);
    return { success: false, message: 'An error occurred while adding the book to the cart' };
  }
};

export const getCartItems = async (userID) => {
  try {
    // Validate input
    if (!userID) {
      return { success: false, message: 'Invalid userID' };
    }

    // Fetch cart items for the user
    const cartItems = await Cart.findAll({
      where: { userID },
      include: [{ model: Book }], // Include book details
    });

    return { success: true, data: cartItems };
  } catch (error) {
    console.error('Error fetching cart items:', error.message, error.stack);
    return { success: false, message: 'An error occurred while fetching cart items' };
  }
};

