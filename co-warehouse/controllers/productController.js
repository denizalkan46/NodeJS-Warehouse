const Product = require('../models/product');

// Ürün ekleme veya güncelleme
exports.upsertProduct = async (req, res) => {
  const { productId, name, quantity, price } = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { productId },
      { name, $inc: { quantity }, price },
      { new: true, upsert: true }
    );
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Tüm ürünleri getirme
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Alt depodaki ürünleri getirme
exports.getProductsBySubWarehouse = async (req, res) => {
  const { subWarehouseId } = req.params;

  try {
    const products = await Product.find({ subWarehouse: subWarehouseId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

