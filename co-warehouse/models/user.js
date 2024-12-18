const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },  // Admin veya normal kullanıcı rolleri
  subWarehouses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubWarehouse' }]  // Kullanıcıya ait alt depolar
});

module.exports = mongoose.model('User', UserSchema);
