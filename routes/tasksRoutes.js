import  express  from "express";
import {Task} from '../models/taskModel.js'
const router = express.Router()






// get (/tasks)
router.get('/',async (req, res) => {
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
   router.get('/:id',async (req, res) => {
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
  router.post('/',async (req, res) => {
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
  router.put('/:id',async (req, res) => {
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
  router.delete('/:id',async (req, res) => {
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

  export default router;