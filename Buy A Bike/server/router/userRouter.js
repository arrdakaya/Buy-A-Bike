import express from "express";

import User from "../db/User.js";
import jwt from 'jsonwebtoken'


const userRouter = express.Router()

userRouter.get('/', (req,res,next) => {
    let token = req.headers.token;
    jwt.verify(token, 'secretkey',(err,decoded) =>{
        if (err) return res.status(401).json({
            title:'unauthorized'
        })
        
        User.findOne({ _id: decoded.userId}, (err,user) =>{
            if(err) return console.log(err)
            return res.status(200).json({
                title: 'user grabbed',
                user: {
                    email: user.email,
                    name: user.name
                }
            })
        })
    })
})
export default userRouter