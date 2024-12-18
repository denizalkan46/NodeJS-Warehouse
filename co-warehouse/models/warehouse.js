const mongoose = require('mongoose');

const WarehouseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true }
});

module.exports = mongoose.model('Warehouse', WarehouseSchema);
