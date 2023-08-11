import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose, { mongo } from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import chartRoutes from "./routes/chart.js";
import User from "./models/User.js";
import { insertIt } from "./toInsert.js";


dotenv.config();
const app = express();
app.use(express.json())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cors());


// Routes
app.use("/chart", chartRoutes);


// Mongoose Connection
const port = process.env.port || 9000;
mongoose.connect(process.env.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(port, ()=>console.log(`server port: ${port}`));

    // User.insertMany(insertIt);
}).catch((e)=>console.log(`${e} did not connect`));