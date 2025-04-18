const mongoose = require("mongoose");

const confAPI = new mongoose.Schema({
    label: String,  
    typeAPI: String, 
    url: { type: String, require: true, unique: true },      
    nbServices: Number,    
    securityType: String ,
    token: String
},{timestamps:true});

const Configuration = mongoose.model("Configuration", confAPI);
module.exports = Configuration;