// backend/routes/uploadRequestRoutes.js
const express = require('express');
const { createUploadRequest, getPendingRequests, approveRequest, rejectRequest, getUserRequests } = require('../controllers/uploadRequestController');
const auth = require('../middleware/auth');
const router = express.Router();

// User submit
router.post('/', auth, createUploadRequest);
// User lihat status
router.get('/user', auth, getUserRequests);
// Admin lihat pending
router.get('/pending', auth, getPendingRequests);
// Admin approve/reject
router.post('/:id/approve', auth, approveRequest);
router.post('/:id/reject', auth, rejectRequest);

module.exports = router;