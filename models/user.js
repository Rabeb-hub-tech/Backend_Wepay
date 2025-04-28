const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const user = new mongoose.Schema({
    nom: String,
    prenom: String,
    nomCommercial: String,
    email: {
        type: String,
        required: function () {
        return this.configuration === false || this.configuration === undefined;
        },
        unique: true
    },
    password: {
        type: String,
        required: function () {
        return this.configuration === false || this.configuration === undefined;
        },
        minLength: 8
    },
    configuration: { type: Boolean, default: false },
    label: String,
    typeAPI: String,
    url: { type: String, require: true, unique: true },
    nbServices: Number,
    securityType: String ,
    token: String,
    paiments : [{type : mongoose.Schema.Types.ObjectId, ref: 'PaiementLibre',}] ,//many
    products : [{type : mongoose.Schema.Types.ObjectId, ref: 'Product',}] ,//many
    factures : [{type : mongoose.Schema.Types.ObjectId, ref: 'Facture',}], //many
    clients : [{type : mongoose.Schema.Types.ObjectId, ref: 'Client',}], //many
},{timestamps:true});


user.pre("save", async function (next) {
    try {
        if (this.password) {
            const salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } catch (error) {
        next(error);
    }
});

user.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
        //if (user.isActive) {
            return user;
        //}
        //throw new Error("compte desactiver");
        }
        throw new Error("incorrect password");
    }
    throw new Error("incorrect email");
};


const User = mongoose.model("User", user);
module.exports = User;