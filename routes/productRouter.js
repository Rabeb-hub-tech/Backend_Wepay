var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const uploadfile = require('../middlewares/uploadFile');

router.get("/getAllProduct", productController.getAllProduct)
router.post("/addProduct", productController.addProduct)
router.post("/addProductWithImage",uploadfile.single("image_product"),productController.addProductWithImage)
router.put("/updateProduct/:id", productController.updateProduct)
router.get("/searchProduct/search", productController.searchProduct)

module.exports = router;
