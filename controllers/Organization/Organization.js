const Organization = require("../../models/Orgnization");
const express = require("express"); 
const bcrypt = require("bcryptjs"); 
const appErr = require("../../utils/appErr");

const createorganization = async (req,res) => {
    const {name , password , address , about } = req.body ; 
    try {
        if(!name || !password || !address || !about)
        {
            return res.render("organizations/register.ejs",{
                error:"All fields are mandatory",
              }); 
        }
        const salt = await bcrypt.genSalt(10); 
        const hashedpassword = await bcrypt.hash(password,salt);  
        const organization_registered = await Organization.create({
            name, 
            password:hashedpassword , 
            address , 
            about 
        }); 

        res.redirect("/api/v1/organization/login"); 
    } catch (error) {
        return res.json(error); 
    }
}; 

const organizationlogin = async (req,res,next) => {
    const { name , password } = req.body ; 
    try {
       if(!name || !password)
       {
          return res.render("organizations/login.ejs",{
            error:"All fields are mandatory",
          }); 
       } 
       const orgfound = await Organization.findOne({name}) ; 
       if(orgfound)
       {
          const pswd = await bcrypt.compare(password,orgfound.password); 
          if(!pswd)
          {
            return res.render("organizations/login.ejs",{
                error:"Invalid Login Credentials",
              }); 
          }
          else
          {
            req.session.orgAuth = orgfound._id ; 
            res.redirect("/"); 
          }
       }
    } catch (error) {
        return next(appErr(error)); 
    }
}


const organizationlogout = async (req,res,next) => {
    try {
        req.session.destroy() ; 
        res.redirect("/") ; 
    } catch (error) {
        return next(appErr(error)); 
    }
}

module.exports = {
    createorganization ,
    organizationlogin,
    organizationlogout, 
}