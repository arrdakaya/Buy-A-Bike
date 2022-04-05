import express from "express";
import mongoose from "mongoose";
import Comment from "../db/Comment.js";

const commentRouter = express.Router()

commentRouter.get('/', async(req,res) =>{
    try{
        const allComments = await Comment.find().sort({createdAt:-1})
        res.json(allComments)
    }catch(error){
    console.log(error)
    }
})
commentRouter.get('/:id',async (req,res) =>{
    try{
        const {id} = req.params
        const comment = await Comment.findById(id)
        if(!comment) return
        res.status(200).json(comment)
    }catch(error){
        console.log(error)
    }
})

commentRouter.post('/', async(req,res) =>{
   try{ 
        const comment = req.body
        const createdComment = await Comment.create(comment)
        res.status(201).json(createdComment)
   }catch(error){
       console.log(error)
   }
})

 commentRouter.put('/:id', async(req,res) =>{
     try{
         const {id} = req.params
         const {useremail,username,content} = req.body
         if(!mongoose.Types.ObjectId.isValid(id))
         return res.status(404).send('comment cannot find')
         const updatedComment = {useremail,username,content, _id: id}
         await Comment.findByIdAndUpdate(id,updatedComment, {new:true})
         res.json(updatedComment)
     }catch(error){
        console.log(error)
    }
 })

commentRouter.delete('/:id', async (req,res) =>{
    try {
        const {id} = req.params
    await Comment.findByIdAndRemove(id)
    res.json ({message:'comment deleted'})
    } catch (error) {
        console.log(error)
    }
    
})
export default commentRouter