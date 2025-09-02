const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },
  roomType: {
    type: String,
    enum: ['general', 'private', 'semi-private', 'icu', 'emergency', 'operation-theater'],
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  floor: {
    type: String,
    required: true
  },
  beds: [{
    bedNumber: String,
    isOccupied: {
      type: Boolean,
      default: false
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient'
    },
    admissionDate: Date,
    dischargeDate: Date
  }],
  facilities: [String],
  ratePerDay: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  maintenanceStatus: {
    type: String,
    enum: ['operational', 'maintenance', 'out-of-service'],
    default: 'operational'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);