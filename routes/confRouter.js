var express = require('express');
var router = express.Router();
const confController = require('../controllers/confController');

router.post('/addAPI',confController.addAPI);

module.exports = router;