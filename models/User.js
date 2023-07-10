const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema({
    name:{
        type:"String",
        required:true 
    }, 
    email:{
        type:"String",
        required:true
    }, 
    password:{
        type:"String", 
        required:true
    },
    about:{
        type:"String",
        required:true
    },
    profileImage:{
        type:String,
    },
    coverImage:{
        type:String,
    },
    resume:{
        type:String,
    },
    Job:[{
        type:mongoose.Schema.Types.ObjectId , 
        ref:'Job'
    }]
},{
    timestamps:true,
}); 

const User = mongoose.model("User", userSchema); 
module.exports = User ; 
