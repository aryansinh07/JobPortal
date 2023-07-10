const mongoose = require("mongoose"); 
const dbconnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://saryan72881:KMVEtSTxs8iC4wT9@cluster0.lakloir.mongodb.net/JOB-PORTAL?retryWrites=true&w=majority"); 
        console.log("DataBase Connected Successfully"); 
    } catch (error) {
        console.log(error); 
    }

}

dbconnect(); 