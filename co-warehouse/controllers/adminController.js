const Warehouse = require('../models/warehouse');
const Product = require('../models/product');

// Ana depoyu ve içindeki ürünleri getirme
exports.getWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.find();
    const products = await Product.find();
    res.json({ warehouse, products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ana depo oluşturma (değişiklik yok)
exports.createWarehouse = async (req, res) => {
  const { name, location } = req.body;
  const newWarehouse = new Warehouse({ name, location });

  try {
    const warehouse = await newWarehouse.save();
    res.status(201).json(warehouse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
