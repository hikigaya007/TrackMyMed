import mongoose from "mongoose";
import express , {Request , Response , NextFunction} from 'express'
import dotenv from 'dotenv'
import cors from "./utils/cors";
import residentRouter from './routes/resident'
import medicationRouter from './routes/medication'
import administrationRouter from "./routes/administration";

dotenv.config()
const app = express();


// Configuration for backend
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors)

/*
An async function to first connect the DB then start the server
*/
const startServer = async () => {
    try {
      if (!process.env.DB_URI) {
        throw new Error("DB_URI is not defined in the environment variables");
      }
      if (!process.env.PORT) {
        throw new Error("PORT is not defined in the environment variables");
      } 
      await mongoose.connect(process.env.DB_URI);
      console.log("DB connected");
  
      app.listen(process.env.PORT, () => {
        console.log(`The server is running at ${process.env.PORT}`);
      });
    } catch (error) {
      console.error("Failed to connect to the database", error);
      process.exit(1); 
    }
  };
  
  startServer();


// Routes
app.use('/resident' , residentRouter);
app.use('/medication' , medicationRouter);
app.use('/administration' , administrationRouter);



//   Middleware to handle errors
app.use((err:any , req:Request , res:Response , next:NextFunction) => {

    const statusCode = err.statusCode || 500 ;

    const message = err.message || "Internal server error"

    return res
    .status(statusCode)
    .json({
        success: false,
        message
    })


})


