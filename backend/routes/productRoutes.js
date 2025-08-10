const express = require('express');
const { body } = require('express-validator');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getUserProducts
} = require('../controllers/productController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Validation middleware
const productValidation = [
  body('name')
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 100 })
    .withMessage('Product name cannot exceed 100 characters'),
  body('description')
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('category')
    .notEmpty()
    .withMessage('Product category is required')
    .isIn(['Pertanian', 'Perkebunan', 'Perikanan', 'Peternakan', 'Kerajinan', 'Makanan', 'Lainnya'])
    .withMessage('Invalid category'),
  body('harvestSeason')
    .notEmpty()
    .withMessage('Harvest season is required')
    .isIn(['Musim Hujan', 'Musim Kemarau', 'Sepanjang Tahun'])
    .withMessage('Invalid harvest season'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Price cannot be negative'),
  body('unit')
    .notEmpty()
    .withMessage('Product unit is required')
    .isIn(['kg', 'gram', 'liter', 'pcs', 'pack', 'dozen'])
    .withMessage('Invalid unit'),
  body('village')
    .notEmpty()
    .withMessage('Village name is required'),
  body('contact.name')
    .notEmpty()
    .withMessage('Contact name is required'),
  body('contact.phone')
    .notEmpty()
    .withMessage('Contact phone is required')
];

// Routes
router.get('/categories', getCategories);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', productValidation, createProduct);
router.put('/:id', auth, updateProduct);      // Edit produk
router.delete('/:id', auth, deleteProduct);   // Hapus produk
router.get('/user', auth, getUserProducts);

// Endpoint upload gambar produk
router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
  // Cloudinary menyimpan url di req.file.path
  res.json({ success: true, url: req.file.path });
});

module.exports = router;