import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes'; // Import user routes
import errorHandler from './middlewares/errorHandler'; // Import error handler

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes); // Use user routes

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use(errorHandler); // Use error handling middleware

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // await sequelize.sync({ alter: true }); // Removed in favor of migrations
    // console.log('All models were synchronized successfully.');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();

export default app;
