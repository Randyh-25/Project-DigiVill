const Login = require('../models/Login');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // ekC admin
  const admin = await Login.findOne({ username });
  if (admin && await bcrypt.compare(password, admin.password)) {
    const token = jwt.sign({ id: admin._id, username: admin.username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ success: true, token, role: 'admin', name: admin.username });
  }

  // Cek user
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id, username: user.username, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ success: true, token, role: 'user', name: user.name, userId: user._id });
  }

  // Tidak ditemukan
  if (!user) {
    return res.status(404).json({ success: false, message: 'Akun tidak ditemukan. Silakan register.' });
  }

  return res.status(401).json({ success: false, message: 'Password salah.' });
};

exports.register = async (req, res) => {
  const { username, password, name, email } = req.body;
  if (!username || !password || !name) {
    return res.status(400).json({ success: false, message: 'Semua field wajib diisi.' });
  }
  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(409).json({ success: false, message: 'Username sudah terdaftar.' });
  }
  const hashed = await bcrypt.hash(password, 10);
  // Hanya tambahkan email jika ada nilainya
  const userData = { username, password: hashed, name };
  if (email) userData.email = email;
  const user = new User(userData);
  await user.save();
  res.json({ success: true, message: 'Registrasi berhasil. Silakan login.' });
};