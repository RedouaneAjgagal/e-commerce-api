require('dotenv').config();
require('express-async-errors');

// Express
const express = require('express');
const app = express();

// Database
const connectDB = require('./db/connect');

// Extra packages
const morgan = require('morgan');

// routes
const authRouter = require('./routes/authRoutes');

// Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.use(morgan('dev'))
app.use(express.json());


app.get('/', (req, res) => {
    res.send('hello world');
});

app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
