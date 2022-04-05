import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    useremail:{
        type:String,
    },
   
    username:{
        type:String,
    },
    
    content:{
        type:String,
        required:true,
        minlength:3
    },
}, {timestamps: true})
const Comment = mongoose.model('comment',commentSchema);
export default Comment;