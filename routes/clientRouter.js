var express = require('express');
var router = express.Router();
const clientController = require("../controllers/clientController");

router.get('/getAllClient',clientController.getAllClient);
router.post('/addClient',clientController.addClient);
router.put('/updateClient/:id',clientController.updateClient);
router.delete('/deleteClientById/:id',clientController.deletClientById);

module.exports = router;