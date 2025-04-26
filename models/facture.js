const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const parametreSchema = new mongoose.Schema({
    id: String,
    valeur: String
}, { _id: false });

const factureSchema = new mongoose.Schema({
    nomClient: String,
    montantTotal: Number,
    estPayee: Boolean,
    service: { type: Boolean, default: false },
    path: String,
    methode: String,
    parametre: [parametreSchema],

    commerçant : {type : mongoose.Schema.Types.ObjectId, ref: 'User',}, //one
    clients : {type : mongoose.Schema.Types.ObjectId, ref: 'Client',},
    produits : [{type : mongoose.Schema.Types.ObjectId, ref: 'Product',}]

}, { timestamps: true });

factureSchema.methods.envoyerParEmail = async function(destinataire) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "rabebyakoubi4@gmail.com",
            pass: "owtp qyqk ljdn emay" // utilise un mot de passe d'application (pas ton mot de passe perso !)
        }
    });

    const mailOptions = {
        from: '"Facture Service" <ton.email@gmail.com>',
        to: destinataire,
        subject: `Facture pour ${this.nomClient}`,
        text: `Bonjour,\n\nVoici les détails de la facture :\n- Client: ${this.nomClient}\n- Montant: ${this.montantTotal}€\n- Payée: ${this.estPayee ? "Oui" : "Non"}\n\nMerci.`,
    };

    await transporter.sendMail(mailOptions);
};

const FactureModel = mongoose.model("Facture", factureSchema);
module.exports = FactureModel;
