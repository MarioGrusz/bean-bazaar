/**
 * Project Name: BEAN SEARCHER
 * Description: '______________'.
 *
 * Author: Mariusz Gruszczynski
 * Email: mario.gruszczynski@gmail.com
 * Date: 14th September 2023
*/

import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import productRoute from './routes/product.js';
import wishlistRoute from './routes/wishlist.js';
import userRoute from './routes/user.js';
import cookieRoute from './routes/cookie.js';
import { createCoffeeData } from './services/coffeeItem.service.js';
import errorHandler from './middleware/error.middleware.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/session', cookieRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/data', productRoute);
app.use('/api/v1/wishlist', wishlistRoute);

app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('HELLO FROM BEAN SEARCHER ENGINE!');
});



const runDataCreationBasedOnCondition = async () => {

    const shouldRunDataCreation = false; // Replace with your condition
    
    if (shouldRunDataCreation) {
         createCoffeeData()
         .then(() => console.log('Data scraped and saved to database'))
         .catch(error => console.error(`Error in data creation process: ${error.message}`));
    }
}

runDataCreationBasedOnCondition();




const startServer = async () => {

    try{
        connectDB(process.env.MONGODB_URL);
        
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        });

    } catch (error) {
        console.log(error)
    }
};

startServer();



