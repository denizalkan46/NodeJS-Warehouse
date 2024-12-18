const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const transferController = require('../controllers/transferController');

// Ürün transfer rotası
router.post('/transfers', authMiddleware, transferController.transferProduct);

module.exports = router;
