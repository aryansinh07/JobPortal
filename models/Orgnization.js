const mongoose = require("mongoose"); 

const organizationSchema = new mongoose.Schema({
    name:{
        type:"String",
        required:true
    }, 
    password:{
        type:"String", 
        required:true,
    }, 
    address:{
        type:"String", 
        required:true
    },
    about:{
        type:"String", 
        required:true
    }, 
    jobs:[{
        type:mongoose.Schema.Types.ObjectId , 
        ref:'Job'
    }]
}); 

const Organization = mongoose.model("Organization", organizationSchema); 

module.exports = Organization ; 