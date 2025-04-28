const FactureModel = require("../models/facture");
const ClientModel = require('../models/client'); // ou le chemin correct vers ton modèle


module.exports.getAllFacture = async (req, res) => {
    try {
        const factureList = await FactureModel.find().populate('produits');
        res.status(200).json(factureList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getFactureById = async (req, res) => {
    try {
        const { id } = req.params;
        const facture = await FactureModel.findById(id).populate('produits');
        if (!facture) return res.status(404).json({ message: "Facture not found" });
        res.status(200).json(facture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Add new facture
module.exports.addFacture = async (req, res) => {
    try {
        const { nomClient, montantTotal, estPayee, produits, clientId } = req.body;

        const newFacture = new FactureModel({
            nomClient,
            montantTotal,
            estPayee,
            produits, // Ajout de la liste des produits
            clients: clientId // RELIER LA FACTURE AU CLIENT
        });

        const factureAdded = await newFacture.save();

        // Maintenant, mettre à jour le client pour ajouter la facture
        await ClientModel.findByIdAndUpdate(clientId, {
        $push: { factures: factureAdded._id }
});
        res.status(200).json(factureAdded);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update existing facture
module.exports.updateFacture = async (req, res) => {
    try {
        const { id } = req.params;
        const { montantTotal, estPayee } = req.body;

        await FactureModel.findByIdAndUpdate(id, { $set: { montantTotal, estPayee } });

        const updatedFacture = await FactureModel.findById(id);
        res.status(200).json(updatedFacture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deletFactureById = async (req, res) => {
    try {
        const { id } = req.params;
        await FactureModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Facture deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.envoyerFactureParEmail = async (req, res) => {
    try {
        const { id } = req.params;
        const { destinataire } = req.body;

        const facture = await FactureModel.findById(id);
        if (!facture) return res.status(404).json({ message: "Facture non trouvée" });

        await facture.envoyerParEmail(destinataire);

        res.status(200).json({ message: `Facture envoyée à ${destinataire}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Add service (with path, methode, parametre)
module.exports.addService = async (req, res) => {
    try {
        const { path, methode, parametre } = req.body;
        const newService = new FactureModel({ path, methode, parametre, service: true });
        const serviceAdded = await newService.save();
        res.status(200).json(serviceAdded);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete service by ID
module.exports.deletServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        await FactureModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Service deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
