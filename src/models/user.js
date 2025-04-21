// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true
    }
  },
}, {
  tableName: 'Users',
  timestamps: true // adds createdAt and updatedAt
});

export {User};



