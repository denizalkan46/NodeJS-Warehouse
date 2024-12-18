const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');

// Ürün rotaları
router.post('/products', authMiddleware, productController.upsertProduct);
router.get('/products/:subWarehouseId', authMiddleware, productController.getProductsBySubWarehouse)

module.exports = router;
 