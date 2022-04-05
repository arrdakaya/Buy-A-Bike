import mongoose from 'mongoose'
const motorSchema = mongoose.Schema({

    title:{
        type:String,
        require:true
    },
    model:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
});

const Motor = mongoose.model('motor',motorSchema);
export default  Motor