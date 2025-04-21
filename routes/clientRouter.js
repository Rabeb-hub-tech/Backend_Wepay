const express = require('express');
const router = express.Router();
const clientController = require("../controllers/clientController");

router.get('/getAllClient', clientController.getAllClients);
router.post('/addClient', clientController.addClient);
router.put('/updateClient/:id', clientController.updateClient);
router.delete('/deleteClientById/:id', clientController.deleteClientById);

// Routes services
router.post('/addService', clientController.addService);
router.delete('/deleteServiceById/:id', clientController.deleteServiceById);

module.exports = router;
