require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');





const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    } catch (error) {
        console.error(error);
    }
}
start();
