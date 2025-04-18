const mongoose = require("mongoose");

const parametreSchema = new mongoose.Schema({
    id: String,
    valeur: String
}, { _id: false });

const serviceAPI = new mongoose.Schema({
    ressource: String,
    path: String,
    methode: String,
    parametre: [parametreSchema]
}, { timestamps: true });

const Service = mongoose.model("Service", serviceAPI);
module.exports = Service;