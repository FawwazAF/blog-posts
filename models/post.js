import { DataTypes } from 'sequelize';
import dbSequalize from '../config/db.js';
import User from '../models/user.js';

const Post = dbSequalize.define('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    authorId: DataTypes.INTEGER
});
Post.belongsTo(User, { foreignKey: 'authorId' });

export default Post;