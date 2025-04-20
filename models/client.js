const mongoose = require("mongoose");

const parametreSchema = new mongoose.Schema({
    id: String,
    valeur: String
}, { _id: false });

const client = new mongoose.Schema({
    nom: String,
    prenom: {type :String,minLength :3 , maxLength : 15},
    email: { type: String, require: true, unique: true },
    telephone: Number,
    path: String,
    methode: String,
    parametre: [parametreSchema]
},{timestamps:true});

const Client = mongoose.model("Client",client);
module.exports = Client;