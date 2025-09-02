const attendanceSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Employee is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    validate: {
      validator: function(date) {
        return date <= new Date();
      },
      message: 'Attendance date cannot be in the future'
    }
  },
  checkIn: {
    type: Date,
    required: [true, 'Check-in time is required']
  },
  checkOut: {
    type: Date,
    validate: {
      validator: function(checkOut) {
        return checkOut > this.checkIn;
      },
      message: 'Check-out time must be after check-in time'
    }
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late', 'Half-day', 'Leave'],
    default: 'Present'
  },
  hoursWorked: {
    type: Number,
    min: [0, 'Hours worked cannot be negative'],
    max: [24, 'Hours worked cannot exceed 24 hours']
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  },
  approvedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Compound index for unique attendance records per employee per day
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

// Pre-save middleware to calculate hours worked
attendanceSchema.pre('save', function(next) {
  if (this.checkIn && this.checkOut) {
    const diffMs = this.checkOut - this.checkIn;
    this.hoursWorked = parseFloat((diffMs / (1000 * 60 * 60)).toFixed(2));
  }
  next();
});

module.exports = mongoose.model('Attendance', attendanceSchema);