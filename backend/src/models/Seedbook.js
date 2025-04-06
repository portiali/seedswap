const mongoose = require('mongoose');
const { Schema } = mongoose;

// Updated schema to reflect changes in seed collection
const seedbookSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who owns the seed
    required: true
  },
  seeds: [
    {
      seedId: {
        type: Schema.Types.ObjectId,
        ref: 'Seed',  // Reference to the seed document
        required: true
      },
      status: {
        type: String,  // Can be 'available', 'not_available', 'up_for_trade', etc.
        required: true,
        default: 'up_for_trade'  // Default status is 'up_for_trade'
      }
    }
  ]
}, { timestamps: true });

const Seedbook = mongoose.model('Seedbook', seedbookSchema);

module.exports = Seedbook;
