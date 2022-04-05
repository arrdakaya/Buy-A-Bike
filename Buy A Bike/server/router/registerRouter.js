import express from 'express'
import User from '../db/User.js'
import bcrypt from 'bcrypt'

const registerRouter = express.Router()

registerRouter.post('/',(req,res,next) => {
    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,10)
    })
    newUser.save(err => {
        if(err){
            return res.status(400).json({
                title: 'error',
                error: 'Email in use',
            })
        }
        return res.status(200).json({
            title:'Singup succes',
        })
    })
})
    export default registerRouter