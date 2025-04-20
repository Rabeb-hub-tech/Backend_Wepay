const mongoose =require('mongoose')
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
        
        const {nom,prix,quantite}=req.body


        const newProduct = new productModel({
            nom,prix,quantite
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
        const {prix,quantite}=req.body
        
        await userModel.findByIdAndUpdate(id,{
            $set: {prix,quantite}
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

module.exports.addProductWithImage = async (req, res) => {
    try {
    const productData = {
        ...req.body,
    };
    if (req.file ) {
        const { filename } = req.file;
        console.log(filename);
        productData.product_image = filename;
    }
    const product = new productModel(productData);
    const addedproducts = await product.save();

    res.status(200).json(addedproducts);
    } catch (error) {
    res.status(500).json(error.message );
    }
}

module.exports.getAllService = async (req,res)=>{
    try {
        
        const serviceList = await productModel.find()

        res.status(200).json(serviceList)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.addService = async (req,res)=>{
    try {
        
        const {path,methode,parametre}=req.body

        const newService = new productModel({
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
        await productModel.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
};