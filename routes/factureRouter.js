const express = require("express");
const router = express.Router();
const factureController = require("../controllers/factureController");

router.get("/getAllFacture", factureController.getAllFacture);
router.post("/addFacture", factureController.addFacture);
router.put("/updateFacture/:id", factureController.updateFacture);
router.get("/getFactureById/:id", factureController.getFactureById);
router.delete("/deletFactureById/:id", factureController.deletFactureById);
router.post("/envoyerFacture/:id", factureController.envoyerFactureParEmail);

// Optionnel : pour les services
router.post("/addService", factureController.addService);
router.delete("/deletServiceById/:id", factureController.deletServiceById);

module.exports = router;
