const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  medicalRecord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MedicalRecord'
  },
  medications: [{
    medicationName: String,
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String,
    quantity: Number,
    refills: {
      type: Number,
      default: 0
    }
  }],
  issueDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: Date,
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  notes: String,
  isDispensed: {
    type: Boolean,
    default: false
  },
  dispenseDate: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Prescription', prescriptionSchema);