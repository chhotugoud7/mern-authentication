import express from "express";
import cors from "cors"; // used to connect backend and frontend 
import 'dotenv/config';  // used to store involvement var in backend 
import cookieParser from "cookie-parser"; 

import connectDB from "./config/mongodb.js";


// making app 
const app = express();
const port = process.env.PORT || 4000

//add connectDB function
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}))

// {} object , ()=> arrow function 
// `` backticks used to write template literals

// checking backend server working on localhost:4000 port 
app.get('/', (req, res)=> res.send("API Working fine"));

//here whenever backend is started -- this app is started and this message is shown in terminal 
app.listen(port, ()=> console.log(`Server started on PORT:${port}`));


