import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import registerRouter from './router/registerRouter.js'
import loginRouter from './router/loginRouter.js'
import userRouter from './router/userRouter.js'
import motorRouter from './router/motorRouter.js'
import commentRouter from './router/commentRouter.js'

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();
app.use(express.urlencoded({extended:true}))

app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/user', userRouter)
app.use('/motor',motorRouter)
app.use('/comments',commentRouter)



app.listen(process.env.PORT, () => {
    mongoose
    .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(console.log('server is start'))
    .catch((err) => console.log(err))
})