const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    // required: true,
  },
  socialId: {
    type: String,
  },
  socialType: {
    type: String,
    enum: ['Facebook', 'Gmail', 'Apple', null],
  },
  displayName: {
    type: String,
  },
  deviceType: {
    type: String,
    enum: ['android', 'ios'],
    default: 'android'
  },
  birthdate: {
    type: Date,
  },
  profileColor: {
    type: String,
  },
  otherFields: [
    {
      type: {
        type: String,
        required: true,
        enum: ['phone', 'email', 'mobile', 'home_phone', 'work_phone', 'other', 'address'],
      },
      title: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }
  ],
  verifyForgotCode: {
    type: String,
  },
  badge: {
    type: Number,
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = User = mongoose.model('user', UserSchema, 'users');