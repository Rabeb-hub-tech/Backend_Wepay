const mongoose = require("mongoose");

const client = new mongoose.Schema({
    nom: String,
    prenom: {type :String,minLength :3 , maxLength : 15},
    email: { type: String, require: true, unique: true },
    telephone: Number,
},{timestamps:true});

const Client = mongoose.model("Client",client);
module.exports = Client;