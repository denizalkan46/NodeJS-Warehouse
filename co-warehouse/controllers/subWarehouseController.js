const SubWarehouse = require('../models/subWarehouse');

// Tüm alt depoları getirme
exports.getSubWarehouses = async (req, res) => {
  try {
    const subWarehouses = await SubWarehouse.find().populate('mainWarehouse');
    res.json(subWarehouses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Yeni alt depo oluşturma
exports.createSubWarehouse = async (req, res) => {
  const { name, location, mainWarehouse } = req.body;
  const newSubWarehouse = new SubWarehouse({ name, location, mainWarehouse });

  try {
    const subWarehouse = await newSubWarehouse.save();
    res.status(201).json(subWarehouse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
