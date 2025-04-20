const userModel = require('../models/user')
const bcrypt = require("bcrypt")

module.exports.inscrire = async (req, res) => {
        try {
            const {nom, prenom,nomCommercial,email,password}=req.body
    
            const newUser = new userModel({
                nom, prenom,nomCommercial,email,password
            })
    
            const useradded = await newUser.save()
    
            res.status(200).json(useradded)
        } catch (error) {
            res.status(500).json(error.message)
        }
}

module.exports.afficherProfil = async (req, res) => {
    try {
        const {id}=req.params
        const user = await userModel.findById(id)
        
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(error.message);
    }
}

module.exports.modifierProfil = async (req, res) => {
    try {
        const {id}=req.params
        const { nom, prenom, nomCommercial, email } = req.body;

        await userModel.findByIdAndUpdate(id,{
        $set: { nom, prenom, nomCommercial, email }
        })

        const user = await userModel.findById(id)

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error.message )
    }
}

module.exports.supprimerProfil = async (req,res)=>{
    try {
        const {id}=req.params
        await userModel.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.changerMotDePasse = async (req, res) => {
    try {
        const {id}=req.params
        const {password}=req.body
        
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password,salt)
        
        const user = await userModel.findByIdAndUpdate(id,{
            $set: {password : hashPassword}
        })

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.addAPI = async (req,res)=>{
    try {
        
        const {label, typeAPI,url,nbServices,securityType,token}=req.body


        const newConfiguration = new userModel({
            label, typeAPI,url,nbServices,securityType,token
        })

        const confadded = await newConfiguration.save()

        res.status(200).json(confadded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}