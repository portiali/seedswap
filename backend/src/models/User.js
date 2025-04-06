const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String, // Human-readable address (e.g., "New York, NY")
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
  // ownedSeeds: [
  //   {
  //     seedId: {
  //       type: Schema.Types.ObjectId,
  //       ref: 'Seed',
  //       required: true
  //     },
  //     quantity: {
  //       type: Number,
  //       required: true,
  //       min: 1
  //     }
  //   }
  // ]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
