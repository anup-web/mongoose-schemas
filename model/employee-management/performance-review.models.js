const performanceReviewSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Employee is required']
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Reviewer is required']
  },
  reviewDate: {
    type: Date,
    required: [true, 'Review date is required'],
    default: Date.now
  },
  reviewPeriod: {
    start: {
      type: Date,
      required: [true, 'Review period start is required']
    },
    end: {
      type: Date,
      required: [true, 'Review period end is required'],
      validate: {
        validator: function(endDate) {
          return endDate >= this.start;
        },
        message: 'Review period end must be after start'
      }
    }
  },
  ratings: {
    qualityOfWork: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    productivity: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    communication: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    teamwork: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    initiative: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    }
  },
  overallRating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  strengths: [{
    type: String,
    trim: true,
    maxlength: [200, 'Strength cannot exceed 200 characters']
  }],
  areasForImprovement: [{
    type: String,
    trim: true,
    maxlength: [200, 'Improvement area cannot exceed 200 characters']
  }],
  goals: [{
    goal: {
      type: String,
      required: true,
      trim: true,
      maxlength: [300, 'Goal cannot exceed 300 characters']
    },
    deadline: Date,
    status: {
      type: String,
      enum: ['Not Started', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Not Started'
    }
  }],
  comments: {
    type: String,
    trim: true,
    maxlength: [1000, 'Comments cannot exceed 1000 characters']
  },
  employeeComments: {
    type: String,
    trim: true,
    maxlength: [1000, 'Employee comments cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'Reviewed', 'Archived'],
    default: 'Draft'
  },
  isFinalized: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
performanceReviewSchema.index({ employee: 1 });
performanceReviewSchema.index({ reviewer: 1 });
performanceReviewSchema.index({ reviewDate: 1 });
performanceReviewSchema.index({ status: 1 });

// Pre-save middleware to calculate overall rating
performanceReviewSchema.pre('save', function(next) {
  if (this.isModified('ratings')) {
    const ratings = Object.values(this.ratings);
    this.overallRating = parseFloat((ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1));
  }
  next();
});

module.exports = mongoose.model('PerformanceReview', performanceReviewSchema);