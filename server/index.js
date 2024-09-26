import express from 'express'
import UserRoute from './routes/user.js'
import Chatroute from './routes/chats.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import {ConnectDB } from './utils/features.js';
import cookieParser from 'cookie-parser';
import { createuser } from './seeders/user.js';
dotenv.config({
    path: "./.env"
});
const mongoURI = process.env.MONGO_URL;
//console.log(mongoURI);
const port = process.env.PORT || 3003;
if (!mongoURI) {
    console.error("MONGO_URL is not defined in the environment variables");
    process.exit(1);
}
mongoose.connect("mongodb://localhost:27017/Bujji")
    .then(() => {
        const app = express();
        app.use(cookieParser());
        app.use('/user', UserRoute);
        app.use('/chats',Chatroute);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
        //process.exit(1);
    })
    
    .catch(error => {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    });