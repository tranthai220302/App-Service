import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import route from './Route/authRoute.js';
import routeUser from './Route/userRoute.js';
import routeGig from './Route/gigRoute.js';
import routeReview from './Route/reviewRoute.js';
import routeOrder  from './Route/oderRoute.js';
import routeConver from './Route/ConverRoute.js';
import routeMessage from './Route/messageRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
dotenv.config();
const PORT = process.env.PORT || 6969;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
mongoose.connect(process.env.MONGODB_URL, {
    }).then(() =>
    {
        console.log("Connect mongodb successful!");
    }).catch((err)=>
    {
        console.log(err);
    })

app.use('/api/auth', route);
app.use('/api/user', routeUser);
app.use('/api/gigs', routeGig);
app.use('/api/reviews', routeReview);
app.use('/api/order', routeOrder);
app.use('/api/conversation', routeConver)
app.use('/api/message', routeMessage);
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
  
    return res.status(errorStatus).send(errorMessage);
  });
app.listen(PORT, ()=>
{
    console.log(`Connect server is ${PORT}`);
    
})