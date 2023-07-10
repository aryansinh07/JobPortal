require("dotenv").config() ; 
const cloudinary = require("cloudinary").v2 ; 
const {CloudinaryStorage} = require("multer-storage-cloudinary"); 

cloudinary.config({
    cloud_name:  process.env.CLOUD_NAME,
    api_key: process.env.KEY, 
    api_secret: process.env.SECRET, 
}); 

const storage = new CloudinaryStorage({
    cloudinary , 
    allowedFormats : ['jpg','jpeg','png','pdf'], 
    params:{
        folder:"Job Portal",
        transformation:[{height:500 , width:500 , crop:'limit'}]
    }
}); 

module.exports = storage ; 