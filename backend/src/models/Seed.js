// models/Seed.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const seedSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false
  },
  description: {
    type: String
  },
  compatibilities: {
    compatibleWith: {
      type: [String],
      default: []
    },
    incompatibleWith: {
      type: [String],
      default: []
    }
  }
}, {
  timestamps: true
});

const Seed = mongoose.model('Seed', seedSchema);

module.exports = Seed;
