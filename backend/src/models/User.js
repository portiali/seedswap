const mongoose = require('mongoose');


const { Schema } = mongoose;

const Seedbook = require('./Seedbook'); 
const Garden = require('./Garden');  

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

// Post save middleware to create a Seedbook for the user
userSchema.post('save', async function (doc) {
  try {
    console.log('Creating Seedbook...');
    const seedbook = new Seedbook({
      userId: doc._id,  // Reference to the user who owns this seedbook
      seeds: []  // Start with an empty array for the seeds
    });
    
    console.log('Saving Seedbook to database...');
    await seedbook.save();  // Save the new Seedbook to the database
    console.log(`Seedbook created for user: ${doc.name}`);

    console.log('Creating Garden...');
    const garden = new Garden({
    userId: doc._id, // Link to the created user
    plantedSeeds: [] // Initially empty, can be updated later
    });
  
    await garden.save(); // Save the Garden to the database
    console.log(`Garden created for user ${doc.name}`);
  } catch (err) {
    console.error('Error creating Seedbook or Garden:', err);
  }
});




const User = mongoose.model('User', userSchema);

module.exports = User;
