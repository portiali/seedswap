const mongoose = require('mongoose');
const { Schema } = mongoose;

const gardenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference to the user who owns the garden
    required: true
  },
  plantedSeeds: [
    {
      seedId: {
        type: Schema.Types.ObjectId,
        ref: 'Seed',  // Reference to the seed document
        required: true
      }
    }
  ]
}, { timestamps: true });

const Garden = mongoose.model('Garden', gardenSchema);

module.exports = Garden;
