import mongoose, { Schema } from "mongoose";

const companySchema = new Schema({
    
    companyName:{
        type:String,
        required:true,
        trim:true
    },
   
    companyCode:{
        type:String,
        required:true,
    },

    workers:[
        {
            type:String,
        }     
    ],

    projects:[
        {
            type:Schema.Types.ObjectId,
            ref:"Projects"
        }
    ]
},{timestamps:true});




export const Company = mongoose.model("Company",companySchema)