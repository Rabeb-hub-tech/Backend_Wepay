const mongoose = require("mongoose");

const parametreSchema = new mongoose.Schema({
    id: String,
    valeur: String
}, { _id: false });

const clientSchema = new mongoose.Schema({
    nom: String,
    prenom: { type: String, minLength: 3, maxLength: 15 },
    email: { type: String, required: true, unique: true },
    telephone: Number,
    service: { type: Boolean, default: false },
    path: String,
    methode: String,
    parametre: [parametreSchema]
}, { timestamps: true });

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
