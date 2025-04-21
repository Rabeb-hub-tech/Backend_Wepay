const clientModel = require('../models/client');

module.exports.addClient = async (req, res) => {
    try {
        const { nom, prenom, email, telephone } = req.body;

        const newClient = new clientModel({ nom, prenom, email, telephone });
        const clientAdded = await newClient.save();

        res.status(200).json(clientAdded);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, telephone } = req.body;

        await clientModel.findByIdAndUpdate(id, { $set: { email, telephone } });
        const updatedClient = await clientModel.findById(id);

        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.deleteClientById = async (req, res) => {
    try {
        const { id } = req.params;
        await clientModel.findByIdAndDelete(id);

        res.status(200).json({ message: "Client deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getAllClients = async (req, res) => {
    try {
        const clientList = await clientModel.find();
        res.status(200).json(clientList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.addService = async (req, res) => {
    try {
        const { path, methode, parametre } = req.body;

        const newService = new clientModel({
            path,
            methode,
            parametre,
            service: true
        });

        const serviceAdded = await newService.save();
        res.status(200).json(serviceAdded);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.deleteServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        await clientModel.findByIdAndDelete(id);

        res.status(200).json({ message: "Service deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
