/**
 * Project Name: BEAN BAZAAR
 * Description: 'App that helps to discover, browse, compare coffee beans'.
 *
 * Author: Mariusz Gruszczynski
 * Email: mario.gruszczynski@gmail.com
 * Date: 14th September 2023
*/

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import productRoute from './routes/product.js';
import wishlistRoute from './routes/wishlist.js';
import emailRoute from './routes/email.js';
import userRoute from './routes/user.js';
import { createCoffeeData } from './services/coffeeItem.service.js';
import errorHandler from './middleware/error.middleware.js';
import loadEnv from './utils/loadEnv.js';


//Load environment variables from .env file
loadEnv('./.env');


const PORT = process.env.PORT || 5000;
const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', userRoute);
app.use('/api/v1/data', productRoute);
app.use('/api/v1/wishlist', wishlistRoute);
app.use('/api/v1/contact', emailRoute);

app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('HELLO FROM BEAN SEARCHER ENGINE!');
});


const runDataCreationBasedOnCondition = async () => {

    const shouldRunDataCreation = false; 
    
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



