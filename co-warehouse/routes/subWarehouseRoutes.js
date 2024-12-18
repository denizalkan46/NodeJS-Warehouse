const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const subWarehouseController = require('../controllers/subWarehouseController');

// Alt depo rotaları
router.get('/sub-warehouses', authMiddleware, subWarehouseController.getSubWarehouses);
router.post('/sub-warehouses', authMiddleware, subWarehouseController.createSubWarehouse);

module.exports = router;
