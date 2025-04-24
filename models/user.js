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
    token: String
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


const User = mongoose.model("User", user);
module.exports = User;