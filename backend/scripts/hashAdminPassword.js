const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Login = require('../models/Login');

require('dotenv').config();

async function hashPassword() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const admin = await Login.findOne({ username: 'admin' });
  if (!admin) {
    console.log('Admin user not found');
    process.exit(1);
  }

  if (admin.password.startsWith('$2')) {
    console.log('Password already hashed');
    process.exit(0);
  }

  admin.password = await bcrypt.hash(admin.password, 10);
  await admin.save();
  console.log('Password hashed successfully');
  process.exit(0);
}

hashPassword();