import { Cart } from '../models/cart.js';
import { Book } from '../models/book.js';
import { OrderSummary } from '../models/order.js';
import { CustomerDetails } from '../models/customer.js';

export const placeOrder = async (userID) => {
  try {
    // Fetch the customer details for the user
    const customer = await CustomerDetails.findOne({
      where: { userID }
    });

    if (!customer) {
      return { success: false, message: 'Customer details not found for the user' };
    }

    const customerID = customer.customerID; 

    const cartItems = await Cart.findAll({
      where: { userID, isPurchased: false }
    });

    if (!cartItems.length) {
      return { success: false, message: 'No items in cart to place order' };
    }
    
    const orderData = [];
    let totalAmount = 0;

    // Iterate through each item in the cart
    for (const item of cartItems) {
      const book = await Book.findByPk(item.bookID);

      if (!book || book.quantity < item.quantity) {
        return { success: false, message: `Insufficient stock for book ID ${item.bookID}` };
      }

      const lineTotal = item.price * item.quantity;
      totalAmount += lineTotal;

      // Prepare order data for bulk insert
      orderData.push({
        userID,
        customerID,
        bookID: item.bookID,
        quantity: item.quantity,
        price: item.price,
        totalAmount: lineTotal,
        isPurchased: true 
      });

      // Update the stock quantity in the Book table
      book.quantity -= item.quantity;
      await book.save();

      // Mark the cart item as purchased
      item.isPurchased = true;
      await item.save();
    }

    // Bulk create order summaries
    const orders = await OrderSummary.bulkCreate(orderData);

    // Clear the cart after placing the order
    await Cart.destroy({ where: { userID, isPurchased: true } });

    return { success: true, data: orders, totalAmount };
  } catch (error) {
    console.error('Order placement error:', error);
    return { success: false, message: 'Failed to place order' };
  }
};

//get order summary by userId with userdetails
export const getOrderSummary = async (userID) => {
  try {
    const orders = await OrderSummary.findAll({
      where: { userID },
      attributes: ['orderID','quantity', 'totalAmount', 'isPurchased', 'createdAt'],
      include: [
        {
          model: Book,
          as: 'book',
          attributes: ['bookName', 'author', 'price', 'discountPrice']
        },
        {
          model: CustomerDetails,
          as: 'customerDetails',
          attributes: ['fullName', 'address', 'mobileNumber', 'cityOrTown', 'state'] 
        }
      ]
    });

    if (!orders.length) {
      return { success: false, message: 'No orders found for the user' };
    }

    // Format the response for better readability
    const formattedOrders = orders.map(order => ({
      orderID: order.orderID,
      quantity: order.quantity,
      totalAmount: order.totalAmount,
      isPurchased: order.isPurchased,
      orderDate: order.createdAt,
      bookDetails: {
        title: order.book.title,
        author: order.book.author,
        price: order.book.price,
        discountPrice: order.book.discountPrice
      },
      customerDetails: {
        fullName: order.customerDetails.fullName,
        address: order.customerDetails.address,
        mobileNumber: order.customerDetails.mobileNumber,
        cityOrTown: order.customerDetails.cityOrTown,
        state: order.customerDetails.state
      }
    }));

    return { success: true, data: formattedOrders };
  } catch (error) {
    console.error('Error fetching order summary:', error);
    return { success: false, message: 'Failed to fetch order summary' };
  }
};

