const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: String,
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  image: String,
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  seo: {
    title: String,
    description: String,
    slug: {
      type: String,
      unique: true,
      sparse: true
    }
  },
  attributes: [{
    name: String,
    type: {
      type: String,
      enum: ['text', 'number', 'select', 'checkbox']
    },
    options: [String],
    isRequired: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
});

categorySchema.index({ parent: 1 });
categorySchema.index({ order: 1 });

module.exports = mongoose.model('Category', categorySchema);