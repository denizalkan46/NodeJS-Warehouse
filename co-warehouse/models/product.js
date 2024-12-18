const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true },
  subWarehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'SubWarehouse' }  // Ürünün ait olduğu alt depo
});

module.exports = mongoose.model('Product', ProductSchema);
