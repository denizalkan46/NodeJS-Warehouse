const mongoose = require('mongoose');

const SubWarehouseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  mainWarehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true }
});

module.exports = mongoose.model('SubWarehouse', SubWarehouseSchema);
