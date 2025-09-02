const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    variant: {
      option: String,
      price: Number
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  coupon: {
    code: String,
    discount: Number,
    discountType: {
      type: String,
      enum: ['percentage', 'fixed']
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

cartSchema.index({ user: 1 });

cartSchema.methods.calculateTotal = function() {
  let total = 0;
  this.items.forEach(item => {
    total += item.price * item.quantity;
  });
  
  if (this.coupon && this.coupon.discount) {
    if (this.coupon.discountType === 'percentage') {
      total = total * (1 - this.coupon.discount / 100);
    } else {
      total = Math.max(0, total - this.coupon.discount);
    }
  }
  
  return total;
};

module.exports = mongoose.model('Cart', cartSchema);