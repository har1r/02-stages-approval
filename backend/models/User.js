const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [50, 'Name must not exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['employee', 'supervisor', 'manager', 'director'],
      default: 'employee',
    },
  },
  { timestamps: true }
);

// Validate password length & hash password
userSchema.pre('save', async function (next) {
  // Validasi panjang password asli sebelum di-hash
  if (this.isModified('password') && this.password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }

  // Hash password
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});


// Export User model
module.exports = mongoose.model('User', userSchema);
