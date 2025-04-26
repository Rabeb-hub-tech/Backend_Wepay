const mongoose = require("mongoose");

const Plibre = new mongoose.Schema({
    montant: Number,
    date: {
        type: Date,
        default: Date.now,// Ajoute automatiquement la date actuelle
    },
    commerçant : {type : mongoose.Schema.Types.ObjectId, ref: 'User',} //one
},{timestamps:true});

const PaiemantLibre =mongoose.model("PaiementLibre",Plibre);
module.exports = PaiemantLibre;