const mongoose = require('mongoose');

const TransferSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  mainWarehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  subWarehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'SubWarehouse', required: true },
  quantity: { type: Number, required: true },
  transferDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transfer', TransferSchema);
