const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exist"]
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  authImage: {
    type: String,
    // required: true
  },
  role: {
    type: String,
    enum: ["buyer", "seller", "admin"],
    default: "admin"
  },
  restaurantName: {
    type: String,
    // required: [true, 'Please provide your restaurant name'],
    trim: true
  },
  cuisineType: {
    type: String,
    // required: [true, 'Please specify cuisine type'],
    enum: [
      'Italian',
      'Mexican',
      'Chinese',
      'Indian',
      'American',
      'Japanese',
      'Mediterranean',
      'Other'
    ]
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  
  // Location Information
  address: {
    type: String,
    // required: [true, 'Please provide your address']
  },
  city: {
    type: String,
    // required: [true, 'Please provide your city']
  },
  state: {
    type: String,
    // required: [true, 'Please provide your state']
  },
  zipCode: {
    type: String,
    // required: [true, 'Please provide your zip code']
  },
  deliveryRadius: {
    type: Number,
    // required: [true, 'Please specify delivery radius'],

  },
  
  // Business Hours
  openingTime: {
    type: String,
    // required: [true, 'Please specify opening time'],
  },
  closingTime: {
    type: String,
    // required: [true, 'Please specify closing time'],
  },
  
  
  // Status and Verification
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  verificationToken: String,

  verificationExp: String,
  
  // Ratings and Stats
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must not exceed 5']
  },
  ratingCount: {
    type: Number,
  },
  ordersCompleted: {
    type: Number,
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const userModel = mongoose.model("user", userSchema)

module.exports = userModel