import mongoose from "mongoose";
import { Schema} from "mongoose";

const taskSchema = new Schema({
    taskName:{
        type:String,
        required:true,
    },
    taskProgress:{
        type: Number,
        required: true,
        enum: [1, 2,3],
        default:1
    },
    priority:{
        type:Number,
        enum:[1,2,3],
        default:2,
    },
    dueDate:{
        type:Date,
        required:true
    }
},{timestamps:true})

export const Task = new mongoose.model("Task",taskSchema)