const mongoose = require("mongoose");
const factureModel = require('../models/facture')

module.exports.getAllFacture = async (req,res)=>{
    try {
        
        const factureList = await factureModel.find()

        res.status(200).json(factureList)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.getFactureById = async (req,res)=>{
    try {
        const {id}=req.params
        const facture = await factureModel.findById(id)

        res.status(200).json(facture)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.addFacture = async (req,res)=>{
    try {
        
        const {nomClient,montantTotal,estPayee}=req.body

        const newFacture = new factureModel({
            nomClient,montantTotal,estPayee
        })

        const factureadded = await newFacture.save()

        res.status(200).json(factureadded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.updateFacture = async (req,res)=>{
    try {
        const {id}=req.params
        const {montantTotal,estPayee}=req.body
        
        await factureModel.findByIdAndUpdate(id,{
            $set: {montantTotal,estPayee}
        })

        const facture = await factureModel.findById(id)

        res.status(200).json(facture)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.deletFactureById = async (req,res)=>{
    try {
        const {id}=req.params
        await factureModel.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.addService = async (req,res)=>{
    try {
        
        const {path,methode,parametre}=req.body

        const newService = new factureModel({
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
        await factureModel.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
}
