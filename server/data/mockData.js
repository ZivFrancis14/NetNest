import mongoose from 'mongoose';
import RoomModel from '../models/room_model.js';
import ScenarioModel from '../models/scenario_model.js';
import VoteModel from '../models/vote_model.js';
import UserModel from '../models/user_model.js'; // Add UserModel import
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve('./.env') });

// Main mock data creation function
const createMockData = async () => {
    try {
        // Check if DB_CONNECTION is defined
        if (!process.env.DB_CONNECTION) {
            throw new Error('DB_CONNECTION environment variable is not defined');
        }

        // Connect to MongoDB
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Clear existing collections
        await RoomModel.deleteMany({});
        await ScenarioModel.deleteMany({});
        await VoteModel.deleteMany({});
        await UserModel.deleteMany({}); // Clear user collection

        // Create mock users
        await UserModel.create([
            {
                userId: "111e4567-e89b-12d3-a456-426614174111",
                name: "Alice",
                email: "alice@example.com",
                password: "securepassword1", // Ideally hashed in a real scenario
                createdDate: new Date(),
            },
            {
                userId: "211e4567-e89b-12d3-a456-426614174112",
                name: "Bob",
                email: "bob@example.com",
                password: "securepassword2", // Ideally hashed in a real scenario
                createdDate: new Date(),
            },
        ]);

        // Create mock rooms
        await RoomModel.create([
            {
                roomId: "123e4567-e89b-12d3-a456-426614174000",
                name: "Room 1",
                ownerId: "111e4567-e89b-12d3-a456-426614174111",
                joinCode: "222e4567-e89b-12d3-a456-426614174222",
                currentScenarioId: null,
                status: "New",
                createdDate: new Date(),
            },
            {
                roomId: "223e4567-e89b-12d3-a456-426614174001",
                name: "Room 2",
                ownerId: "211e4567-e89b-12d3-a456-426614174112",
                joinCode: "333e4567-e89b-12d3-a456-426614174223",
                currentScenarioId: null,
                status: "Active",
                createdDate: new Date(),
            },
        ]);

        // Create mock scenarios
        await ScenarioModel.create([
            {
                scenarioId: 1,
                text: "Scenario 1 for Room 1",
            },
            {
                scenarioId: 2,
                text: "Scenario 2 for Room 1",
            },
        ]);

        // Create mock votes
        await VoteModel.create([
            {
                voteId: 1,
                scenarioId: 1,
                roomId: "123e4567-e89b-12d3-a456-426614174000",
                answer: true,
                createdDate: new Date(),
            },
            {
                voteId: 2,
                scenarioId: 1,
                roomId: "123e4567-e89b-12d3-a456-426614174000",
                answer: false,
                createdDate: new Date(),
            },
        ]);

        console.log('Mock data created successfully');
    } catch (error) {
        console.error('Error creating mock data:', error);
    } finally {
        mongoose.connection.close(); // Close the database connection
        console.log('Database connection closed');
    }
};

// Run the mock data creation function
createMockData();
