const express = require('express');
const { body } = require('express-validator');
const {
  getUMKMs,
  getUMKM,
  createUMKM,
  updateUMKM,
  deleteUMKM,
  getCategories,
  getUserUMKM
} = require('../controllers/umkmController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const umkmValidation = [
  body('name')
    .notEmpty()
    .withMessage('UMKM name is required')
    .isLength({ max: 100 })
    .withMessage('UMKM name cannot exceed 100 characters'),
  body('description')
    .notEmpty()
    .withMessage('UMKM description is required')
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('category')
    .notEmpty()
    .withMessage('UMKM category is required')
    .isIn(['Kuliner', 'Fashion', 'Kerajinan', 'Jasa', 'Teknologi', 'Perdagangan', 'Lainnya'])
    .withMessage('Invalid category'),
  body('village')
    .notEmpty()
    .withMessage('Village name is required'),
  body('contact.name')
    .notEmpty()
    .withMessage('Contact name is required'),
  body('contact.phone')
    .notEmpty()
    .withMessage('Contact phone is required'),
  body('contact.email')
    .optional()
    .isEmail()
    .withMessage('Please enter a valid email'),
  body('contact.address')
    .notEmpty()
    .withMessage('Address is required'),
  body('establishedYear')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage('Please enter a valid year'),
  body('employeeCount')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Employee count must be at least 1')
];

// Routes
router.get('/categories', getCategories);
router.get('/', getUMKMs);
router.get('/:id', getUMKM);
router.post('/', umkmValidation, createUMKM);
router.put('/:id', auth, updateUMKM);      // Edit UMKM
router.delete('/:id', auth, deleteUMKM);   // Hapus UMKM
router.get('/user', auth, getUserUMKM);

module.exports = router;