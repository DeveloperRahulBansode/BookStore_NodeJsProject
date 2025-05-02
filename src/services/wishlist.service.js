import { Book } from '../models/book.js';
import { Wishlist } from '../models/wishlist.js';


//add a book to the wishlist
export const addToWishlist = async (userID, bookID) => {
    try {
      const existing = await Wishlist.findOne({ where: { userID, bookID } });
      if (existing) {
        return { success: false, message: 'Book already in wishlist' };
      }
  
      const wish = await Wishlist.create({ userID, bookID });
      return { success: true, data: wish };
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return { success: false, message: 'Failed to add to wishlist' };
    }
  };

