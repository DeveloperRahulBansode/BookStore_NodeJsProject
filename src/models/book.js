// models/Book.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Book = sequelize.define('Books', {
  bookID: {
    type: DataTypes.TEXT,
    primaryKey: true,
  },
  description: {
    type: DataTypes.TEXT,
    validate: {
      notEmpty: true
    }
  },
  discountPrice: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: true,
    }
  },
  bookImage: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  admin_user_id: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  bookName: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true
    }
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
    }
  }
}, {
  tableName: 'Books',
  timestamps: true // adds createdAt and updatedAt automatically
});

export { Book };
