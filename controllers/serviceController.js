const serviceModel = require('../models/serviceAPI')

module.exports.getAllService = async (req,res)=>{
    try {
        
        const serviceList = await serviceModel.find()

        res.status(200).json(serviceList)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.addService = async (req,res)=>{
    try {
        
        const {ressource,path,methode,parametre}=req.body

        const role = "service"

        const newService = new serviceModel({
            ressource,path,methode,parametre
        })

        const serviceadded = await newService.save()

        res.status(200).json(serviceadded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.updateService = async (req,res)=>{
    try {
        const {id}=req.params
        const {methode,parametre}=req.body
        
        await serviceModel.findByIdAndUpdate(id,{
            $set: {methode,parametre}
        })

        const serviceUpdated = await serviceModel.findById(id)

        res.status(200).json(serviceUpdated)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.deletServiceById = async (req,res)=>{
    try {
        const {id}=req.params
        await serviceModel.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
}