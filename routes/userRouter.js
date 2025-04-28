var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const {requireAuthUser} = require("../middlewares/authMiddeleware")


router.post('/inscrire', userController.inscrire);
router.get('/afficherProfil/:id', userController.afficherProfil);
router.put('/modifierProfil/:id', userController.modifierProfil);
router.put('/changerMotDePasse/:id',userController.changerMotDePasse);
router.delete('/supprimerProfil/:id',userController.supprimerProfil);

router.post('/addAPI',userController.addAPI);

router.post('/login',userController.login );
router.post('/logout',requireAuthUser,userController.logout );

module.exports = router;