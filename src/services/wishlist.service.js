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

  //remove a book from the wishlist
export const removeFromWishlist = async (userID, bookID) => {
    try {
      const existing = await Wishlist.findOne({ where: { userID, bookID } });
      if (!existing) {
        return { success: false, message: 'Book not found in wishlist' };
      }
  
      await Wishlist.destroy({ where: { userID, bookID } });
      return { success: true, message: 'Book removed from wishlist' };
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return { success: false, message: 'Failed to remove from wishlist' };
    }
  };

  //get all books in the wishlist by userID
  export const getWishlistByUserID = async (userID) => {
    try {
      const wishlist = await Wishlist.findAll({
        where: { userID },
        include: [{ model: Book }],
      });
  
      return { success: true, data: wishlist };
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      return { success: false, message: 'Failed to get wishlist' };
    }
  };
