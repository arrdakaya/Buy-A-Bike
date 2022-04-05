import express from 'express'
import User from '../db/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const loginRouter = express.Router()

loginRouter.post('/',(req,res,next) => {
    User.findOne({email: req.body.email}, (err,user) =>{
        if(err)  return res.status(500).json({
            title:'server error',
            error: err,
        })
    
        if(!user) {
            return res.status(401).json({
            title:'user not found',
            error: 'invalid credentials'
          })
        }
        //incorrect pass
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'login failed',
                error: 'invalid credentials'
            })
        }
        let token =jwt.sign({ userId: user._id, username:user.name, useremail:user.email}, 'secretkey');
        return res.status(200).json({
            title:'login success',
            token: token
        })
        
    })
})
    export default loginRouter