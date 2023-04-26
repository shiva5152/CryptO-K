import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouts.js';
import listRouter from './routes/listRoutes.js'
import connectDB from "./mongoDB/connect.js"
import errorMiddleware from './middleware/error.js'
import cookieSession from 'cookie-session';
import cors from 'cors'

// to get static file from client
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// import path from 'path';

const app=express();
dotenv.config({});

app.use(cookieSession({
    name:'session',keys:["shiva"],maxAge:24*60*60*100
}))
// app.use(passport.session());
app.use(cors({
    origin:"http://127.0.0.1:5173",
    methods:"GET,POST,PATCH,PUT,DELETE",
    Credentials:true,
}))
// middleware
app.use(express.json());
app.use(cookieParser());

// static->frontend
// const __dirname = dirname(fileURLToPath(import.meta.url));
// app.use(express.static(path.resolve(__dirname,'../client/dist')))

// app routes
app.use('/api/v1/auth',userRouter)
app.use('/api/v1/coins',listRouter)

app.get('*', function (req, res) {
    res.status(404).json({
        success:false,
        message:" Not Found"
    });
  });

// errorMiddleware
app.use(errorMiddleware);

const port = process.env.PORT || 8080
const start=async ()=>{
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(port,()=>{
            console.log(`server is running on ${port}` )
        })
    }catch(err){
        console.log(err)
    }
}
start();