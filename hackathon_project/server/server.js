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
app.use('/room', roomRoutes);
app.use('/scenario', scenarioRoutes);
app.use('/user', userRoutes);
app.use('/vote', voteRoutes);

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
    return true;
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    throw error;  // Exit the application if DB connection fails
  });

// Start the server
const PORT = process.env.PORT || 3000; // Fallback to port 3000 if PORT is not in .env
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
