require("dotenv").config();
const express = require("express"); 
const session = require("express-session"); 
const mongoose = require("mongoose"); 
const methodOverride = require("method-override");
const MongoStore = require("connect-mongo"); 
const UserRoute = require("./routes/User/User");
const jobRouter = require("./routes/Job/Job");
const { OrganizationRouter } = require("./routes/Organization/Organization");
const globalErrHandler = require("./Middleware/globalHandlers");
const Job = require("./models/Job");
const Organization = require("./models/Orgnization");
require("./config/dbconnect"); 

const app = express() ; 
const port = 5000 ; 

app.set("view-engine","ejs"); 

app.use(express.static(__dirname + "/public")); 
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 
app.use(methodOverride("_method")); 

//To create a session 

app.use(session({
    secret: process.env.SESSION_KEY , 
    resave : false , 
    saveUninitialized : true , 
    store: new MongoStore({
        mongoUrl : process.env.MONGO_URL , 
        ttl: 24*60*60 ,
    }),
})); 


//To store the user data on the page 
app.use((req,res,next)=>{
    if(req.session.userAuth)
    {
        res.locals.userlogin  = req.session.userAuth ; 
    }
    else
    {
        res.locals.userlogin = null ;
    }

    if(req.session.orgAuth)
    {
        res.locals.orgAuth = req.session.orgAuth ; 
    }
    else
    {
        res.locals.orgAuth = null ;  
    }
    next() ;
}); 

app.get("/",async (req,res,next)=> {
    try {
        const jobs = await Job.find().populate('Organization') ;
        const org = await Organization.findById(res.locals.orgAuth).populate('jobs');  
        res.render("home.ejs",{jobs,org});
    } catch (error) {
        res.render("home.ejs",{error:error.message}); 
    }
}); 

app.use(globalErrHandler); 
app.use("/api/v1/user", UserRoute); 
app.use("/api/v1/job", jobRouter); 
app.use("/api/v1/organization",OrganizationRouter); 

app.listen(port , ()=>{
    console.log(`Server is up and runing on port no ${port}`); 
}); 
