const express = require("express"); 
const jobRouter = express.Router() ; 

const {
    createjob, 
    fetchjobs,
    deletejob,
    applicantsjob,
    searchjobs,
} = require("../../controllers/Job/Job"); 

jobRouter.get("/create",(req,res)=>{
      res.render("job/post.ejs",{
        error:""
      }); 
}); 

jobRouter.post("/create/:id",createjob); 

jobRouter.get("/",fetchjobs); 

jobRouter.get("/applicants/:id",applicantsjob); 
jobRouter.delete("/delete/:id",deletejob); 
jobRouter.post("/searchjob",searchjobs); 

module.exports = jobRouter ; 