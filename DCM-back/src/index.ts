import 'reflect-metadata';
import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import { configureExpress } from './app/config/configureExpress';

const PORT = 3000;

const app = express();

app.use(cors());

configureExpress(app)
if(process.env.DB === "mongoDb"){
    mongoose.connect('mongodb://127.0.0.1:27017/DCM');
}

app.listen(PORT, () => {
    console.info(`Starting server on http://localhost:${PORT}`);
})