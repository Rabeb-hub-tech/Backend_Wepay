var express = require('express');
var router = express.Router();
const PlibreController = require("../controllers/PlibreController");

router.get('/getAllPlibre',PlibreController.getAllPlibre);
router.post('/addPaiementlibre',PlibreController.addPaiementlibre);

module.exports = router; 