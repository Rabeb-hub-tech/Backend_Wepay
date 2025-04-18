var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const uploadfile = require('../middlewares/uploadFile');

router.post('/inscrire', userController.inscrire);
router.post('/seConnecter', userController.seConnecter);
router.get('/afficherProfil/:id', uploadfile, userController.afficherProfil);
router.put('/modifierProfil/:id', uploadfile, userController.modifierProfil);
router.put('/changerMotDePasse/:id', uploadfile, userController.changerMotDePasse);

module.exports = router;