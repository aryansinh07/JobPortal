const express = require("express"); 
const UserRoute = express.Router() ; 
const {
    registerctrl , 
    loginctrl ,
    updatectrl ,
    applyjob,
    logoutctrl, 
    userdetails,
    fetchappliedjobs,
    profilephotoupload,
    coverImageupload,
    resumeupload,
} = require("../../controllers/User/User"); 
const multer = require("multer"); 
const storage = require("../../config/Cloudinary");
const Job = require("../../models/Job");
const User = require("../../models/User");
const mongoose = require("mongoose"); 

const upload = multer({storage}); 

UserRoute.get("/login",(req,res)=>{
    res.render("users/login.ejs",{
         error:""
    }); 
}); 

UserRoute.get("/register",(req,res)=>{
    res.render("users/register.ejs",{
        error:""
    }); 
}); 
UserRoute.get("/applyjob",async (req,res)=>{
    const jobs = await Job.find(); 
    const user_id = res.locals.userlogin ;
    console.log(user_id) ; 
    res.render("users/applyjob.ejs",{jobs,user_id}); 
}); 

UserRoute.get("/profile",async (req,res)=>{
    const user = await User.findById(res.locals.userlogin).populate("Job"); 
    res.render("users/profile.ejs",{user}); 
})

UserRoute.get("/upload-profile-photo-form",(req,res)=>{
    res.render("users/profilephotoupload.ejs",{
        error:"",
    }); 
})

UserRoute.get("/upload-cover-photo-form",(req,res)=>{
    res.render("users/coverphotoupload.ejs",{
        error:""
    }); 
})

UserRoute.get("/upload-resume-form",(req,res)=>{
    res.render("users/resumeupload.ejs",{
        error:""
    }); 
})




UserRoute.post("/register",registerctrl); 
UserRoute.post("/login",loginctrl); 
UserRoute.put("/update/:id",updatectrl); 
UserRoute.post("/apply-job/:id",applyjob); 
UserRoute.get("/logout",logoutctrl); 
UserRoute.get("/details/:id",userdetails); 
UserRoute.get("/applied-jobs",fetchappliedjobs); 
UserRoute.put("/profile-photo-upload", upload.single("profile") , profilephotoupload); 
UserRoute.put("/cover-photo-upload", upload.single("cover") , coverImageupload);
UserRoute.put("/resume-upload", upload.single("resume") ,resumeupload);  

module.exports = UserRoute ; 


