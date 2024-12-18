const Product = require('../models/product');
const Transfer = require('../models/transfer');

// Ürün transferi
exports.transferProduct = async (req, res) => {
  const { productId, mainWarehouse, subWarehouse, quantity } = req.body;

  try {
    // Ana depoda ürün miktarını kontrol et
    const product = await Product.findOne({ productId });
    if (!product || product.quantity < quantity) {
      return res.status(400).json({ message: 'Yetersiz stok' });
    }

    // Ana depoda ürün miktarını güncelle
    product.quantity -= quantity;
    await product.save();

    // Alt depoya ürün ekle veya güncelle
    const subWarehouseProduct = await Product.findOneAndUpdate(
      { productId, subWarehouse },
      { name: product.name, $inc: { quantity }, price: product.price, subWarehouse },
      { new: true, upsert: true }
    );

    // Transfer kaydı oluştur
    const transfer = new Transfer({ productId, mainWarehouse, subWarehouse, quantity });
    await transfer.save();

    res.status(200).json({ message: 'Ürün başarıyla transfer edildi', transfer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

