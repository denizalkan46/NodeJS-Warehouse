const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

// Ana depo rotaları
router.get('/warehouse', authMiddleware, adminController.getWarehouse);
router.post('/warehouse', authMiddleware, adminController.createWarehouse);

module.exports = router;
