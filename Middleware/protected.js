const appErr = require("../utils/appErr");
const protected =  (req,res,next) => {
      
    if(req.session.userAuth )
    {
        next() ; 
    }
    else
    {
        return next(appErr("500","You are not Authorized to view this Page")); 
    }

}

module.exports = protected ;  