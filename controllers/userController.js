const userModel = require('../models/user')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.afficherProfil = async (req, res) => {
    try {
        const {id}=req.params
        const user = await userModel.findById(id)
        
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(error.message);
    }
}

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

module.exports.supprimerProfil = async (req,res)=>{
    try {
        const {id}=req.params
        await userModel.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error.message)
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


        const Configuration = new userModel({
            label, typeAPI,url,nbServices,securityType,token,
            configuration: true
        })

        const confadded = await Configuration.save()

        res.status(200).json(confadded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.login = async (req,res)=>{
    try {
        const { email , password} = req.body
        
        const user = await userModel.login(email,password)
        const connecte = true
        await userModel.findByIdAndUpdate(user._id,{
            $set: {connecte}
        })
        const token = createToken(user._id)
        res.cookie('jwt_token',token,{httpOnly:true,maxAge:60*1000})
        res.status(200).json({message :"connected",user : user})
    } catch (error) {
        res.status(500).json({message:error.message} )
    }
}
const createToken = (id) => {
    return jwt.sign({ id }, "net 9antra25 secret", {
        expiresIn: "1d" // 1 jour, tu peux ajuster
    });
}

module.exports.logout = async (req,res)=>{
    try {
        const id = req.user_id
        
        const connecte = false
        await userModel.findByIdAndUpdate(id,{
            $set: {connecte}
        })
        
        res.cookie("jwt_token","",{httpOnly:false,maxAge:1})
        res.status(200).json("User successfully logged out")
    } catch (error) {
        res.status(500).json({message:error.message} )
    }
}