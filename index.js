import express from 'express'; 

import { PORT, dbUrl } from './config.js';
import mongoose from 'mongoose';
import {Task} from './models/todoModels.js'
const app = express();
app.use(express.json())


app.get('/', (req, res) => {
  console.log(req);
  res.sendStatus(234);
});
// get (/tasks)
app.get('/tasks',async (req, res) => {
  try{
const tasks = await Task.find({})
return res.status(200).json({count:tasks.length,
  data:tasks});
  }
  catch(error){
    console.log(error.message);
    res.sendStatus(500).send({message: error.message});
  }

});

 // get id (/tasks/id)
app.get('/tasks/:id',async (req, res) => {
  try{
    const {id} = req.params
const task = await Task.findById(id)
return res.status(200).json(task);
  }
  catch(error){
    console.log(error.message);
    res.sendStatus(500).send({message: error.message});
  }

});


// post  (/tasks)
app.post('/tasks',async (req, res) => {
  try{
    if(!req.body.des|| !req.body.time ){
     return res.status(400).send({message : 'send all fields'});
    }
const newTask= {
  des : req.body.des,
  time: req.body.time,
  completed : req.body.completed,
}
const task = await Task.create(newTask)
return res.status(201).send(task)
  } 
  catch(error){
    console.log(error);
    res.sendStatus(500)
  }
})

// UPDATE   tasks/id
app.put('/tasks/:id',async (req, res) => {
  try{
    const {id} = req.params
    const result = await Task.findByIdAndUpdate(id, req.body)  
    if(!result){return res.status(404).json({message:"Task not found"})}  
    return res.status(200).json({message:"updated successfully"})
  }
  catch(error){
    console.log(error.message);
    res.sendStatus(500).send({message: error.message});
  }

});



// DELETE  tasks/id
app.delete('/tasks/:id',async (req, res) => {
  try{
    const {id} = req.params
    const result = await Task.findByIdAndDelete(id, req.body)  
    if(!result){return res.status(404).json({message:"Task not found"})}  
    return res.status(200).json({message:"deleted successfully"})
  }
  catch(error){
    console.log(error.message);
    res.sendStatus(500).send({message: error.message});
  }

});

mongoose.connect(dbUrl)
.then(()=>{
  console.log('connected')
  app.listen(PORT, () => {
    console.log(`Server is listening on port successfully ${PORT}`);
  });
})
.catch((error)=>{
console.log(error)
})






















