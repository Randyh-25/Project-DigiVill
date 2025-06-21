// backend/controllers/uploadRequestController.js
const UploadRequest = require('../models/UploadRequest');
const Product = require('../models/Product');
const UMKM = require('../models/UMKM');

// User submit produk/umkm
exports.createUploadRequest = async (req, res) => {
  const { type, data } = req.body;
  const user = req.user.id;
  if (!['product', 'umkm'].includes(type)) {
    return res.status(400).json({ success: false, message: 'Tipe tidak valid' });
  }
  const request = new UploadRequest({ type, data, user });
  await request.save();
  res.json({ success: true, message: 'Request berhasil dikirim, menunggu persetujuan admin.' });
};

// Admin: list pending
exports.getPendingRequests = async (req, res) => {
  const requests = await UploadRequest.find({ status: 'pending' }).populate('user');
  res.json({ success: true, data: requests });
};

// Admin: approve
exports.approveRequest = async (req, res) => {
  const request = await UploadRequest.findById(req.params.id);
  if (!request) return res.status(404).json({ success: false, message: 'Request tidak ditemukan' });

  if (request.type === 'product') {
    await Product.create({ ...request.data, user: request.user });
  } else {
    await UMKM.create({ ...request.data, user: request.user });
  }
  request.status = 'approved';
  await request.save();
  res.json({ success: true, message: 'Request diterima & data masuk database.' });
};

// Admin: reject
exports.rejectRequest = async (req, res) => {
  const { reason } = req.body;
  const request = await UploadRequest.findById(req.params.id);
  if (!request) return res.status(404).json({ success: false, message: 'Request tidak ditemukan' });
  request.status = 'rejected';
  request.reason = reason;
  await request.save();
  res.json({ success: true, message: 'Request ditolak.' });
};

// User: lihat status request
exports.getUserRequests = async (req, res) => {
  const requests = await UploadRequest.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json({ success: true, data: requests });
};