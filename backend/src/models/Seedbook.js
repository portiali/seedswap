const mongoose = require('mongoose');
const { Schema } = mongoose;

// Updated schema to reflect changes in seed collection
const seedbookSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who owns the seed
    required: true
  },
  seeds: {
    type:[
    {
        // set false for needing a seedID & status each time-- maybe issues?
      seedId: {
        type: Schema.Types.ObjectId,
        ref: 'Seed',  // Reference to the seed document
        required: false
      },
      status: {
        type: String,  // Can be 'available', 'not_available', 'up_for_trade', etc.
        required: false,
        default: 'up_for_trade'  // Default status is 'up_for_trade'
      }
    }
  ],
  default: []
}
}, { timestamps: true });

const Seedbook = mongoose.model('Seedbook', seedbookSchema);

module.exports = Seedbook;
