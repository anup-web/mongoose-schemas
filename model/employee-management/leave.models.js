const leaveSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Employee is required']
  },
  leaveType: {
    type: String,
    required: [true, 'Leave type is required'],
    enum: ['Annual', 'Sick', 'Maternity', 'Paternity', 'Unpaid', 'Other']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function(endDate) {
        return endDate >= this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  duration: {
    type: Number,
    min: [0.5, 'Duration must be at least 0.5 days'],
    required: [true, 'Duration is required']
  },
  reason: {
    type: String,
    required: [true, 'Reason is required'],
    trim: true,
    maxlength: [500, 'Reason cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'],
    default: 'Pending'
  },
  reviewedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  },
  reviewNotes: {
    type: String,
    trim: true,
    maxlength: [500, 'Review notes cannot exceed 500 characters']
  },
  reviewedAt: {
    type: Date
  },
  isPaid: {
    type: Boolean,
    default: true
  },
  attachment: {
    filename: String,
    originalName: String,
    mimeType: String,
    size: Number,
    path: String
  }
}, {
  timestamps: true
});

// Indexes
leaveSchema.index({ employee: 1 });
leaveSchema.index({ status: 1 });
leaveSchema.index({ startDate: 1, endDate: 1 });

// Virtual for leave days
leaveSchema.virtual('leaveDays').get(function() {
  if (this.startDate && this.endDate) {
    const timeDiff = this.endDate - this.startDate;
    const daysDiff = timeDiff / (1000 * 3600 * 24) + 1; // +1 to include both start and end dates
    return daysDiff;
  }
  return this.duration;
});

module.exports = mongoose.model('Leave', leaveSchema);