// backend/models/UploadRequest.js
const mongoose = require('mongoose');

const uploadRequestSchema = new mongoose.Schema({
  type: { type: String, enum: ['product', 'umkm'], required: true },
  data: { type: Object, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  reason: { type: String }, // alasan penolakan
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UploadRequest', uploadRequestSchema);