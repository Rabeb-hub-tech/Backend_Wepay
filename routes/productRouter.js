const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const uploadfile = require('../middlewares/uploadFile');

// Produits
router.get("/getAllProduct", productController.getAllProduct);
router.post("/addProduct", productController.addProduct);
router.post("/addProductWithImage", uploadfile.single("image_product"), productController.addProductWithImage);
router.put("/updateProduct/:id", productController.updateProduct);
router.get("/searchProduct/search", productController.searchProduct);

// Services
router.get("/getAllService", productController.getAllService);
router.post("/addService", productController.addService);
router.delete("/deleteService/:id", productController.deletServiceById);

module.exports = router;
