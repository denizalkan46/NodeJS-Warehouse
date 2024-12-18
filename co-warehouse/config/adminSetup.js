const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const createAdmin = async () => {
  const username = 'admin';  // Admin kullanıcı adı
  const password = 'admin123';  // Admin şifresi
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new User({
    username,
    password: hashedPassword,
    role: 'admin'
  });

  try {
    await admin.save();
    console.log('Admin Kullanıcı Oluşturuldu!');
  } catch (error) {
    console.error('ERROR Admin Oluşturulamadı:', error.message);
  }
};

const connectDBAndCreateAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await createAdmin();
  mongoose.connection.close();
};

connectDBAndCreateAdmin();
