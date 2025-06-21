const mongoose = require('mongoose');

const umkmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'UMKM name is required'],
    trim: true,
    maxlength: [100, 'UMKM name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'UMKM description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  logo: {
    type: String,
    default: '/images/default-umkm.jpg'
  },
  contact: {
    name: {
      type: String,
      required: [true, 'Contact name is required']
    },
    phone: {
      type: String,
      required: [true, 'Contact phone is required']
    },
    email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    address: {
      type: String,
      required: [true, 'Address is required']
    }
  },
  category: {
    type: String,
    required: [true, 'UMKM category is required'],
    enum: ['Kuliner', 'Fashion', 'Kerajinan', 'Jasa', 'Teknologi', 'Perdagangan', 'Lainnya'],
    default: 'Lainnya'
  },
  village: {
    type: String,
    required: [true, 'Village name is required'],
    trim: true
  },
  establishedYear: {
    type: Number,
    min: [1900, 'Year must be valid'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  employeeCount: {
    type: Number,
    min: [1, 'Employee count must be at least 1'],
    default: 1
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  socialMedia: {
    instagram: String,
    facebook: String,
    whatsapp: String,
    website: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
umkmSchema.index({ category: 1, isActive: 1 });
umkmSchema.index({ village: 1 });
umkmSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('UMKM', umkmSchema);