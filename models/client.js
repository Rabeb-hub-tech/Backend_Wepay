const mongoose = require("mongoose");

const parametreSchema = new mongoose.Schema({
    id: String,
    valeur: String
}, { _id: false });

const clientSchema = new mongoose.Schema({
    nom: String,
    prenom: { type: String, minLength: 3, maxLength: 15 },
    email: {
        type: String,
        required: function () {
            return !this.service; // Email requis uniquement si ce n'est pas un "service"
        },
        unique: true
    },
    telephone: Number,
    service: { type: Boolean, default: false },
    path: String,
    methode: String,
    parametre: [parametreSchema],

    commerçant : {type : mongoose.Schema.Types.ObjectId, ref: 'User',} ,//one
    factures : [{type : mongoose.Schema.Types.ObjectId, ref: 'Facture',}]
    
}, { timestamps: true });

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
