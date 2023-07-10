const bcrypt = require("bcryptjs"); 
const User = require("../../models/User");
const Job = require("../../models/Job");
const Organization = require("../../models/Orgnization");
const appErr = require("../../utils/appErr");

const registerctrl = async(req,res) => {
    const {name , email , password , about} = req.body ; 
    try {
        if(!name || !email || !password || !about)
        {
            return res.render("users/register.ejs",{
                error:"All fields are madatory"
              }); 
        }
        const userexist = await User.findOne({email}); 
        if(userexist)
        {
            return res.render("users/register.ejs",{
                error:"User Already Exist"
              }); 
        }
        const salt = await bcrypt.genSalt(10); 
        const hashedpassword = await bcrypt.hash(password,salt); 
        const Userregistered = await User.create({
            name, 
            email, 
            password:hashedpassword,
            about
        }); 
        res.redirect("/api/v1/user/login");
    } catch (error) {
        return next(appErr(error.message)) ; 
         
    }
}; 

const loginctrl = async(req,res) => {
    const {email,password} = req.body ; 
    try {
        if(!email || !password)
        {
            return res.render("users/login.ejs",{
                error:"All fields are madatory"
              }); 
        }
        const userfound = await User.findOne({email}); 
        if(userfound)
        {
            const passwordcorrect = await bcrypt.compare(password,userfound.password)
            if(!passwordcorrect)
            {
                return res.render("users/login.ejs",{
                    error:"Invalid Login Credentials"
                  }); 
            }
            else{
                req.session.userAuth = userfound._id ; 
                res.redirect("/");  
            }
        }
        else{
            return res.json({
                msg:"User does not exist" 
            }) ; 
        }
        
    } catch (error) {
        return next(appErr(error.message)) ; 
    }
}

const updatectrl = async(req,res) => {
    const {name , email , password } = req.body ;
     try {
        const userid = req.params.id ; 
        const userUpdated = await User.findByIdAndUpdate(userid,{
           name , 
           email, 
           password
          }, {
            new:true
          }); 
        res.json({
            "msg":"User details updated successfully" , 
            user : userUpdated
        }); 

     } catch (error) {
        return next(appErr(error.message)) ; 
     }
}

const userdetails = async(req,res,next) => {
    const userid = req.params.id
    try {
        const userfound = await User.findById(userid); 
        if(userfound)
        {
            return res.json({
                "data":userfound
            }); 
        }
        else
        {
            return res.json({
                msg:"User does not exist"
            }) ; 
        }
    } catch (error) {
        return next(appErr(error.message));
    }
}

const logoutctrl = async(req,res) => {
    try {
        req.session.destroy() ; 
        res.redirect("/"); 
    } catch (error) {
        return next(appErr(error.message)) ; 
    }
}

const applyjob = async (req,res,next) => {
    const jobid = req.params.id ; 
    try {
        const userfound = await User.findById(res.locals.userlogin) ; 
        await userfound.Job.push(jobid); 
        userfound.save() ; 
        const jobfound = await Job.findById(req.params.id).populate("User"); 
        await jobfound.User.push(userfound._id); 
        jobfound.save() ; 
        return res.json({
            msg:"You have successfully applied for the job"
        })

    } catch (error) {
        return next(appErr(error.message)) ; 
    }

}; 

const fetchappliedjobs = async(req,res,next) => {
    try {
        const userid = req.session.userAuth ; 
        const userfound = await User.findById(userid); 
        if(userfound)
        {
            const jobsapplied = await User.find().populate("Job"); 
            return res.json({
               data:jobsapplied
            }); 
        }
        else
        {
            return res.json({
                msg:"User not found"
            }); 
        }
    } catch (error) {
        return next(appErr(error.message)); 
    }
}

const profilephotoupload = async(req,res,next) => {
    if(!req.file)
    {
        return res.json({
            msg:"Please upload the Image"
          });
    }
    try {
      const userId = res.locals.userlogin ; 
      await User.findByIdAndUpdate(userId,{
        profileImage: req.file.path 
      },{
        new: true 
      }); 
      res.redirect("/api/v1/user/profile"); 
    } catch (error) {
      return next(appErr(error.message)); 
    }
}

const coverImageupload = async(req,res,next) => {
    if(!req.file)
    {
      return res.json({
        msg:"Please upload the Image"
      }); 
    }
    try {
      const UserId = res.locals.userlogin ;  
      await User.findByIdAndUpdate(UserId,{
        coverImage: req.file.path 
      },{
        new: true 
      }); 
      res.redirect("/api/v1/user/profile"); 
    } catch (error) {
      return next(appErr(error.message)); 
    }
}

const resumeupload = async(req,res,next) => {
    if(!req.file)
    {
        return res.json({
          msg:"Please upload the file"
        }); 
    }
    try {
        const UserId = res.locals.userlogin ;  
        await User.findByIdAndUpdate(UserId,{
          resume: req.file.path 
        },{
          new: true 
        }); 
        res.redirect("/api/v1/user/profile"); 
      } catch (error) {
        return next(appErr(error.message)); 
      }
}



module.exports = {
    registerctrl , 
    loginctrl, 
    updatectrl,
    applyjob,
    logoutctrl,
    userdetails,
    fetchappliedjobs,
    profilephotoupload,
    coverImageupload,
    resumeupload,
}; 