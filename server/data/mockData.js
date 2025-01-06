const mongoose = require('mongoose');
const Room = require('../models/room_model').default;
const Scenario = require('../models/scenario_model');
const Vote = require('../models/vote_model');

const createMockData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/your_database_name', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Create mock rooms
        await Room.create([
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
        await Scenario.create([
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
        await Vote.create([
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
    } 
    catch (error) {
        console.error('Error creating mock data:', error);
        throw new Error('Error creating mock data');
    }
};

createMockData();
