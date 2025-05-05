// models/OrderSummary.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { Book } from './book.js';
import { User } from './user.js';
import { CustomerDetails } from './customer.js';

const OrderSummary = sequelize.define('OrderSummary', {
  orderID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userID'
    }
  },
  bookID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Book,
      key: 'bookID'
    }
  },
  customerID: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CustomerDetails,
      key: 'customerID'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  isPurchased: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'OrderSummaries',
  timestamps: true
});

// Define relationships
OrderSummary.belongsTo(Book, { foreignKey: 'bookID', as: 'book' });
OrderSummary.belongsTo(User, { foreignKey: 'userID', as: 'user' });
OrderSummary.belongsTo(CustomerDetails, { foreignKey: 'customerID', as: 'customerDetails' }); // Add this relationship

export { OrderSummary };