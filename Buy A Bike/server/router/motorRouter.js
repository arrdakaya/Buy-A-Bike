import express from "express";
import Motor from "../db/motor.js";



const motorRouter = express.Router()

motorRouter.post('/',(req,res) => {
    try {
        const motor = req.body
        const createdMotor =  Motor.create(motor)
        res.status(201).json(createdMotor)
    } catch (error) {
        console.log(error)
    }
    
})
motorRouter.get('/',(req,res) =>{
    Motor.find()
    .then((result) => {
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    })
})
motorRouter.get('/:id',(req,res) =>{
    let name = req.params.id;
    Motor.findOne({"title":name})
    .then((result) => {
        
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    })
    
})

export default motorRouter