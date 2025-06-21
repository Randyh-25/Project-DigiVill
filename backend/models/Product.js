const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  image: {
    type: String,
    required: [true, 'Product image is required'],
    default: '/images/default-product.jpg'
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['Pertanian', 'Perkebunan', 'Perikanan', 'Peternakan', 'Kerajinan', 'Makanan', 'Lainnya'],
    default: 'Lainnya'
  },
  harvestSeason: {
    type: String,
    required: [true, 'Harvest season is required'],
    enum: ['Musim Hujan', 'Musim Kemarau', 'Sepanjang Tahun'],
    default: 'Sepanjang Tahun'
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  unit: {
    type: String,
    required: [true, 'Product unit is required'],
    enum: ['kg', 'gram', 'liter', 'pcs', 'pack', 'dozen'],
    default: 'kg'
  },
  village: {
    type: String,
    required: [true, 'Village name is required'],
    trim: true
  },
  contact: {
    name: {
      type: String,
      required: [true, 'Contact name is required']
    },
    phone: {
      type: String,
      required: [true, 'Contact phone is required']
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ village: 1 });
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);