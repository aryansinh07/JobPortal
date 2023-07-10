const express = require("express"); 

const OrganizationRouter = express.Router() ; 

const {
    createorganization ,
    organizationlogin, 
    organizationlogout,
} = require("../../controllers/Organization/Organization"); 
const Organization = require("../../models/Orgnization");
const { model } = require("mongoose");

OrganizationRouter.get("/login",(req,res)=>{
    res.render("organizations/login.ejs",{
        error:"",
    }); 
}); 

OrganizationRouter.get("/register",(req,res)=>{
    res.render("organizations/register.ejs",{
        error:"",
    });
})




OrganizationRouter.get("/jobs", async (req,res)=> {
    const org = await Organization.findById(res.locals.orgAuth).populate({
        path:"jobs",
      })
    console.log(org); 
    res.render("organizations/jobs.ejs",{org}); 
})
OrganizationRouter.post("/register",createorganization); 
OrganizationRouter.post("/login",organizationlogin);
OrganizationRouter.get("/logout",organizationlogout);  

module.exports = {
    OrganizationRouter , 
}; 