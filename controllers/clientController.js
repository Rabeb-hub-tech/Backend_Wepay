const clientModel = require('../models/client')

module.exports.addClient = async (req,res)=>{
    try {
        
        const {nom, prenom,email,telephone}=req.body

        const newClient = new clientModel({
            nom, prenom,email,telephone
        })

        const clientadded = await newClient.save()

        res.status(200).json(clientadded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.updateClient = async (req,res)=>{
    try {
        const {id}=req.params
        const {email,telephone}=req.body
        
        await clientModel.findByIdAndUpdate(id,{
            $set: {email,telephone}
        })

        const client = await clientModel.findById(id)

        res.status(200).json(client)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.deletClientById = async (req,res)=>{
    try {
        const {id}=req.params
        await clientModel.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.getAllClient = async (req,res)=>{
    try {
        
        const clientList = await clientModel.find()

        res.status(200).json(clientList)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.addService = async (req,res)=>{
    try {
        
        const {path,methode,parametre}=req.body

        const newService = new clientModel({
            path,methode,parametre
        })

        const serviceadded = await newService.save()

        res.status(200).json(serviceadded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.deletServiceById = async (req,res)=>{
    try {
        const {id}=req.params
        await clientModel.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
}