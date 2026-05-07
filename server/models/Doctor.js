const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  specialization: { 
    type: String, 
    required: true 
  },
  experience: { 
    type: Number, 
    required: true 
  },
  fees: { 
    type: Number, 
    required: true 
  },
  availableSlots: [
    {
      day: { type: String },
      startTime: { type: String },
      endTime: { type: String }
    }
  ],
  approved: { 
    type: Boolean, 
    default: false 
  },
  phone: { 
    type: String 
  },
  address: { 
    type: String 
  }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);