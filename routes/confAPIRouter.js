var express = require('express');
var router = express.Router();
const confController = require('../controllers/confController');

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.status(200).json('Helllooo WePay');
});*/

router.post('/addAPI',confController.addAPI);

module.exports = router;
