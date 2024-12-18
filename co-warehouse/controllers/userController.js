const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SubWarehouse = require('../models/subWarehouse');

// Kullanıcı kaydı
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Kullanıcı adı zaten mevcut' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role: 'user'
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Kullanıcı girişi
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Kullanıcı alt depoları getirme
exports.getUserSubWarehouses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('subWarehouses');
    res.json(user.subWarehouses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Kullanıcıya ait alt depoları ekleme
exports.addSubWarehouseToUser = async (req, res) => {
  const { name, location } = req.body;

  const newSubWarehouse = new SubWarehouse({
    name,
    location,
    owner: req.user.id
  });

  try {
    const subWarehouse = await newSubWarehouse.save();
    const user = await User.findById(req.user.id);
    user.subWarehouses.push(subWarehouse._id);
    await user.save();
    res.status(201).json(subWarehouse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
