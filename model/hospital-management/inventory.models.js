const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['medication', 'equipment', 'supplies', 'furniture']
  },
  description: String,
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true
  },
  minimumStockLevel: {
    type: Number,
    required: true
  },
  supplier: {
    name: String,
    contact: String,
    email: String
  },
  purchaseDate: Date,
  expiryDate: Date,
  location: {
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department'
    },
    room: String,
    shelf: String
  },
  cost: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'low-stock', 'out-of-stock', 'expired'],
    default: 'available'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Inventory', inventorySchema);