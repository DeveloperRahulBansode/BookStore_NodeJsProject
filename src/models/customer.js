// models/CustomerDetails.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { User } from './user.js';

const CustomerDetails = sequelize.define('CustomerDetails', {
  customerID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  fullName: {
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
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  cityOrTown: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addressType: {
    type: DataTypes.ENUM('home', 'office', 'other'),
    allowNull: false
  }
}, {
  tableName: 'CustomerDetails',
  timestamps: true
});

// Relationships 
User.hasMany(CustomerDetails, { foreignKey: 'userID' });
CustomerDetails.belongsTo(User, { foreignKey: 'userID' });


export { CustomerDetails };
