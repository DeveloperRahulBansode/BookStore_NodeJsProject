import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { User } from './user.js';
import { Book } from './book.js';

const Wishlist = sequelize.define('Wishlists', {
    wishlistID: {
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
}, {
    tableName: 'Wishlists',
    timestamps: true
});

// Relationships
User.hasMany(Wishlist, { foreignKey: 'userID' });
Wishlist.belongsTo(User, { foreignKey: 'userID' });

Book.hasMany(Wishlist, { foreignKey: 'bookID' });
Wishlist.belongsTo(Book, { foreignKey: 'bookID' });

export { Wishlist };