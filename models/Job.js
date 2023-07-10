const mongoose = require("mongoose"); 

const jobSchema = new mongoose.Schema({
    position:{
        type:"String", 
        required:true
    }, 
    description:{
        type:"String",
        required:true , 
    }, 
    no_of_vacancy:{
        type:"Number", 
        required:true
    }, 
    skills:{
        type:"String", 
        required:true
    }, 
    location:{
        type:"String",
        required:true
    }, 
    Organization:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Organization', 
        required:true
    }, 
    User:[{
        type:mongoose.Schema.Types.ObjectId , 
        ref:'User'
    }]
}); 

const Job = mongoose.model("Job", jobSchema); 

module.exports = Job ; 