const mongoose = require("mongoose");

const product = new mongoose.Schema({
    nom: String,
    prix: { type: Number, min: 0 },
    quantite: { type: Number, min: 0 },
    product_image:String,
},{timestamps:true});

const Product = mongoose.model("Product", product);
module.exports = Product;