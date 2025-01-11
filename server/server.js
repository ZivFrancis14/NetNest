import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import roomRoutes from './routes/room_route.js';
import scenarioRoutes from './routes/scenario_route.js';
import userRoutes from './routes/user_route.js';
import voteRoutes from './routes/vote_route.js';

dotenv.config();

const app = express();

// Enable CORS for requests from the frontend
app.use(cors({
  origin: process.env.CLIENT_URL,
}));

// Middleware to parse JSON requests
app.use(express.json());

// Routes for different functionalities
app.use('/rooms', roomRoutes);
app.use('/scenarios', scenarioRoutes);
app.use('/users', userRoutes);
app.use('/votes', voteRoutes);

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log('Connected to MongoDB');
    return true;
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  });

// Start the server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});