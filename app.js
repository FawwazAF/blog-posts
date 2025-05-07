// app.js
import express from 'express';
import {router as userRoutes} from './routes/user.js'
import {router as postRoutes} from './routes/post.js';
import sequelize from './config/db.js';

const app = express();
app.use(express.json());

// Load routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on port 3000'));
});