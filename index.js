import express from 'express'; 

import { PORT } from './config.js';
import mongoose from 'mongoose';
import {Task} from './models/todoModels.js'
import tasksRoutes from "./routes/tasksRoutes.js"
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

// Access your environment variables
const mongoDBConnectionString = process.env.MONGODB_CONNECTION_STRING;

const app = express();
app.use(express.json())

app.use(cors())
app.get('/', (req, res) => {
  console.log(req);
  res.sendStatus(234);
});

app.use('/tasks',tasksRoutes)
mongoose.connect(mongoDBConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
  console.log('connected')
  app.listen(PORT, () => {
    console.log(`Server is listening on port successfully ${PORT}`);
  });
})
.catch((error)=>{
console.log(error)
})






















