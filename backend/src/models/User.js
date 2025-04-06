// mongoose schema for user

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true, unique: true },
  location: {
    latitude: Number,
    longitude: Number,
  },
  ownedSeeds: [
    {
      seedId: mongoose.Schema.Types.ObjectId,
      quantity: Number
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
