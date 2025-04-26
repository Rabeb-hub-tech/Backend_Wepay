const mongoose = require("mongoose");

const parametreSchema = new mongoose.Schema({
    id: String,
    valeur: String
}, { _id: false });

const product = new mongoose.Schema({
    nom: String,
    prix: { type: Number, min: 0 },
    quantite: { type: Number, min: 0 },
    product_image:String,
    service: { type: Boolean, default: false },
    path: String,
    methode: String,
    parametre: [parametreSchema],

    commerçant : {type : mongoose.Schema.Types.ObjectId, ref: 'User',} ,//one
    factures : [{type : mongoose.Schema.Types.ObjectId, ref: 'Facture',}],
},{timestamps:true});

const Product = mongoose.model("Product", product);
module.exports = Product;