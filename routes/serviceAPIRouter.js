var express = require('express');
var router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/getAllService',serviceController.getAllService);
router.post('/addService',serviceController.addService);
router.put('/updateService/:id',serviceController.updateService);
router.delete('/deletServiceById/:id',serviceController.deletServiceById);

module.exports = router;