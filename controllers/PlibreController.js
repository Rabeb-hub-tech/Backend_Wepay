const PlibreModel = require('../models/Plibre')

module.exports.getAllPlibre = async (req, res) => {
    try {
        const paiements = await PlibreModel.find();
        res.status(200).json(paiements);
    } catch (error) {
        res.status(500).json(error.message);
    }
}


module.exports.addPaiementlibre = async (req, res) => {
        try {
            const {montant}=req.body
    
            const newPaiement = new PlibreModel({
                montant
            })
    
            const paiementadded = await newPaiement.save()
    
            res.status(200).json(paiementadded)
        } catch (error) {
            res.status(500).json(error.message)
        }
}