var express = require('express');
var router = express.Router();
const factureController = require('../controllers/factureController');

router.get("/getAllFacture", factureController.getAllFacture)
router.post("/addFacture", factureController.addFacture)
router.put("/updateFacture/:id", factureController.updateFacture)
router.get("/getFactureById", factureController.getFactureById)
router.delete("/deletFactureById/:id",factureController.deletFactureById)

module.exports = router;