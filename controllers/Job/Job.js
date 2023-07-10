const Job = require("../../models/Job");
const express = require("express"); 
const Organization = require("../../models/Orgnization");
const appErr = require("../../utils/appErr");
const User = require("../../models/User");

const createjob = async(req,res) => {
    const { position , description , no_of_vacancy , skills , location } = req.body ; 
    try {
        const organization_found = await Organization.findById(req.params.id); 
        if(!organization_found)
        {
            return res.json({
                "msg":"Not authorized to post a Job"
            }); 
        }
        const jobCreated = await Job.create({
            position,
            description, 
            no_of_vacancy, 
            skills, 
            location, 
            Organization:organization_found._id
        }); 

        await organization_found.jobs.push(jobCreated._id); 
        organization_found.save() ; 
        res.redirect("/"); 
    } catch (error) {
        return res.json(error); 
    }
}

const fetchjobs = async(req,res) => {
    try {
        const job = await Job.find() ; 
        res.json({
            "msg":"All Jobs fetched Successfully", 
            jobs:job
        }); 
    } catch (error) {
        return res.json(error)
    }
}

const deletejob = async(req,res) => {
    try {
        await Job.findByIdAndDelete(req.params.id); 
        res.json({
            "msg":"Job Deleted Succesfully", 
        }); 
    } catch (error) {
        return res.json(error); 
    }
}; 

const applicantsjob = async(req,res) => {

    try {
        const job = await Job.findById(req.params.id).populate("User") ; 
        res.render("job/applicants.ejs",{job}); 
    } catch (error) {
        return next(appErr(error.message)); 
    }
}

const searchjobs = async(req,res,next) => {
    const {category } = req.body ; 
    try {
      console.log(category); 
      const jobfounds = await Job.find({position:category}).populate("Organization"); 
      console.log(jobfounds);  
      const user_id = res.locals.userlogin ;  
      res.render("job/filteredjobs.ejs",{jobfounds,category,user_id}); 
      
    } catch (error) {
        return next(appErr(error.message)); 
    }
}

module.exports = {
    createjob, 
    fetchjobs,
    deletejob,
    applicantsjob,
    searchjobs,
}; 