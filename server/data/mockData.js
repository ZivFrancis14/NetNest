import mongoose from 'mongoose';
import RoomModel from '../models/room_model.js';
import ScenarioModel from '../models/scenario_model.js';
import VoteModel from '../models/vote_model.js';
import UserModel from '../models/user_model.js'; 
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
console.log('DB_CONNECTION:', process.env.DB_CONNECTION);

const createMockData = async () => {
    try {
    
        if (!process.env.DB_CONNECTION) {
            throw new Error('DB_CONNECTION environment variable is not defined');
        }

  
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        
        await RoomModel.deleteMany({});
        await ScenarioModel.deleteMany({});
        await VoteModel.deleteMany({});
        await UserModel.deleteMany({}); 

        await UserModel.create([
            {
                userId: "111e4567-e89b-12d3-a456-426614174111",
                roomId: "123e4567-e89b-12d3-a456-426614174000",
            },
            {
                userId: "211e4567-e89b-12d3-a456-426614174112",
                roomId: "223e4567-e89b-12d3-a456-426614174001",
            },
        ]);
        

      
        await RoomModel.create([
            {
                roomId: "123e4567-e89b-12d3-a456-426614174000",
                name: "Room 1",
                ownerId: "111e4567-e89b-12d3-a456-426614174111",
                joinCode: "222e4567-e89b-12d3-a456-426614174222",
                currentScenarioId:"677a8d0c0370f94234fb682d" ,
                status: "New",
                createdDate: new Date(),
            },
            {
                roomId: "223e4567-e89b-12d3-a456-426614174001",
                name: "Room 2",
                ownerId: "211e4567-e89b-12d3-a456-426614174112",
                joinCode: "333e4567-e89b-12d3-a456-426614174223",
                currentScenarioId: "677a8d0c0370f94234fb682e" ,
                status: "Active",
                createdDate: new Date(),
            },
        ]);

  
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
        mongoose.connection.close(); 
        console.log('Database connection closed');
    }
};


createMockData();
