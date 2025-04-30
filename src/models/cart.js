import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { User } from './user.js';
import { Book } from './book.js';


const Cart = sequelize.define('Carts', {
    cardID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
      },
    isPurchased: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'Carts',
    timestamps: true
});

// Relationships
User.hasMany(Cart, { foreignKey: 'userID' });
Cart.belongsTo(User, { foreignKey: 'userID' });

Book.hasMany(Cart, { foreignKey: 'bookID' });
Cart.belongsTo(Book, { foreignKey: 'bookID' });


export { Cart };
