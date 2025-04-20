const mongoose = require("mongoose");

const parametreSchema = new mongoose.Schema({
    id: String,
    valeur: String
}, { _id: false });

const facture = new mongoose.Schema({
    nomClient: String,
    montantTotal: Number,
   // produit: List,
    estPayee: Boolean,
    path: String,
    methode: String,
    parametre: [parametreSchema]
},{timestamps:true});

const Facture =mongoose.model("Facture",facture);
module.exports = Facture;