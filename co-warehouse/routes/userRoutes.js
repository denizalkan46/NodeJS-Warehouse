const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/sub-warehouses', authMiddleware, userController.getUserSubWarehouses);
router.post('/add-sub-warehouse', authMiddleware, userController.addSubWarehouseToUser);

module.exports = router;
