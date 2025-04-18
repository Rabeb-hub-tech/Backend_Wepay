const mongoose =require('mongoose');
const productModel = require('../models/product')

module.exports.getAllProduct = async (req,res)=>{
    try {
        
        const productList = await productModel.find()

        res.status(200).json(productList)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.addProduct = async (req,res)=>{
    try {
        
        const {nom,prix,quantite,product_image}=req.body


        const newProduct = new productModel({
            nom,prix,quantite,product_image
        })

        const productadded = await newProduct.save()

        res.status(200).json(productadded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.updateProduct = async (req,res)=>{
    try {
        const {id}=req.params
        const {prix,quantite,product_image}=req.body
        
        await userModel.findByIdAndUpdate(id,{
            $set: {prix,quantite,product_image}
        })

        const productUpdated = await productModel.findById(id)

        res.status(200).json(productUpdated)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.searchProduct = async (req, res) => {
    try {
        const { query } = req.query;

        const searchConditions = [];

        if (mongoose.Types.ObjectId.isValid(query)) {
            searchConditions.push({ _id: query });
        }

        searchConditions.push({ nom: { $regex: query, $options: 'i' } });

        const products = await productModel.find({
            $or: searchConditions
        });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}