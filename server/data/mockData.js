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

  
        await ScenarioModel.create(
            [
            
                {
                  "scenarioId": 1,
                  "text": "A stranger sends you a direct message on Instagram, saying they are your age and want to be friends. They ask for your personal details like your school name or phone number."
            
                },
                {
                  "scenarioId": 2,
                  "text": "Someone you don’t know on Snapchat sends you a message saying they have seen embarrassing photos of you online and threatens to share them unless you send more pictures."
               
                },
                {
                  "scenarioId": 3,
                  "text": "A classmate starts leaving mean comments on your TikTok videos, making fun of your appearance. Other students begin liking and replying to the comments."
             
                },
                {
                  "scenarioId": 4,
                  "text": "You get a message from someone pretending to be a famous influencer, asking you to click a link to join an exclusive fan club."
            
                },
                {
                  "scenarioId": 5,
                  "text": "A popular student in your school adds you to a WhatsApp group chat where everyone shares jokes. However, they start teasing and excluding another student in the group."
            
                },
                {
                  "scenarioId": 6,
                  "text": "You join a new Discord server for gaming, and someone in the chat starts sending you private messages asking for personal photos."
               
                },
                {
                  "scenarioId": 7,
                  "text": "You post a selfie on Instagram, and someone you don’t know starts commenting about how pretty you are and asks you to follow them back."
            
                },
                {
                  "scenarioId": 8,
                  "text": "You decide to post your vacation plans on social media, including details about where you’re going and when you’ll be back."
            
                },
                {
                  "scenarioId": 9,
                  "text": "You are playing an online multiplayer game, and someone starts harassing you in the chat, calling you names and telling you to quit the game."
            
                },
                {
                  "scenarioId": 10,
                  "text": "A teacher shares an online safety tip in class, advising you never to click on unfamiliar links or share passwords with anyone."
            
                },
                {
                  "scenarioId": 11,
                  "text": "You decide to change your social media settings to make your account private so only friends can see your posts."
            
                },
                {
                  "scenarioId": 12,
                  "text": "You receive an email from what appears to be your school administration, asking you to click a link to access your grades. The email address looks slightly suspicious."
            
                },
                {
                  "scenarioId": 13,
                  "text": "You see a classmate oversharing details about their family problems on Instagram Stories. You are unsure if they realize how public their posts are."
            
                },
                {
                  "scenarioId": 14,
                  "text": "A friend sends you a link to a fun-looking online quiz. When you open it, the website asks for your name and email to show the results."
            
                },
                {
                  "scenarioId": 15,
                  "text": "You block someone on a social media platform after they keep sending you inappropriate messages, but they create a new account and contact you again."
            
                }
              
              
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
