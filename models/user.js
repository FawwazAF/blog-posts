import { DataTypes } from 'sequelize';
import dbSequalize from '../config/db.js';

const User = dbSequalize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING
});

export default User;