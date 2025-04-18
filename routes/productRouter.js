var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

router.get("/getAllProduct", productController.getAllProduct)
router.post("/addProduct", productController.addProduct)
router.put("/updateProduct/:id", productController.updateProduct)
router.get("/searchProduct/search", productController.searchProduct)

module.exports = router;
