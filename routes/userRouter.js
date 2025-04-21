var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.post('/inscrire', userController.inscrire);
router.get('/afficherProfil/:id', userController.afficherProfil);
router.put('/modifierProfil/:id', userController.modifierProfil);
router.put('/changerMotDePasse/:id',userController.changerMotDePasse);
router.delete('/supprimerProfil/:id',userController.supprimerProfil);

module.exports = router;