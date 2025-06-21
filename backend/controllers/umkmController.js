const UMKM = require('../models/UMKM');
const { validationResult } = require('express-validator');

// Get all UMKM with filtering and pagination
const getUMKMs = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, village, search } = req.query;
    
    // Build filter object
    const filter = { isActive: true };
    
    if (category) filter.category = category;
    if (village) filter.village = new RegExp(village, 'i');
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    const umkms = await UMKM.find(filter)
      .populate('products', 'name price category')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .exec();

    const total = await UMKM.countDocuments(filter);

    res.json({
      success: true,
      data: umkms,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching UMKM',
      error: error.message
    });
  }
};

// Get single UMKM by ID
const getUMKM = async (req, res) => {
  try {
    const umkm = await UMKM.findById(req.params.id).populate('products');
    
    if (!umkm) {
      return res.status(404).json({
        success: false,
        message: 'UMKM not found'
      });
    }

    res.json({
      success: true,
      data: umkm
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching UMKM',
      error: error.message
    });
  }
};

// Create new UMKM
const createUMKM = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const umkm = new UMKM(req.body);
    await umkm.save();

    res.status(201).json({
      success: true,
      message: 'UMKM created successfully',
      data: umkm
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating UMKM',
      error: error.message
    });
  }
};

// Update UMKM
const updateUMKM = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const umkm = await UMKM.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!umkm) {
      return res.status(404).json({
        success: false,
        message: 'UMKM not found'
      });
    }

    res.json({
      success: true,
      message: 'UMKM updated successfully',
      data: umkm
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating UMKM',
      error: error.message
    });
  }
};

// Delete UMKM
const deleteUMKM = async (req, res) => {
  try {
    const umkm = await UMKM.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!umkm) {
      return res.status(404).json({
        success: false,
        message: 'UMKM not found'
      });
    }

    res.json({
      success: true,
      message: 'UMKM deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting UMKM',
      error: error.message
    });
  }
};

// Get UMKM categories
const getCategories = async (req, res) => {
  try {
    const categories = await UMKM.distinct('category');
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

module.exports = {
  getUMKMs,
  getUMKM,
  createUMKM,
  updateUMKM,
  deleteUMKM,
  getCategories
};