const mongoose = require("mongoose");

const facture = new mongoose.Schema({
    nomClient: String,
    montantTotal: Number,
   // produit: List,
    estPayee: Boolean
},{timestamps:true});

const Facture =mongoose.model("Facture",facture);
module.exports = Facture;