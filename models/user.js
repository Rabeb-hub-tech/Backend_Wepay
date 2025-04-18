const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const user = new mongoose.Schema({
    nom: String,
    prenom: String,
    nomCommercial: String,
    email: { type: String, require: true, unique: true },
    password: {type :String, require:true , minLength : 8 },
},{timestamps:true});

user.pre("save",async function(next){
    try {
        const salt = await bcrypt.genSalt()
        const User = this
        User.password = await bcrypt.hash(User.password,salt)
        isActive = false
        next()
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model("User", user);
module.exports = User;