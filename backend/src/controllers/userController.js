

const User = require('../models/User');
// const Seedbook = require('../models/Seedbook');
// const Garden = require('../models/Garden');

const createUser = async (req, res) => {
  try {
    //removed ownedSeeds part of it
    const { name, location, latitude, longitude, email } = req.body;

    const newUser = new User({
      name,
      location,     // Now a string like "New York, NY"
      latitude,     // Number
      longitude,    // Number
      email
    //   ownedSeeds    // Should be array of { seedId, quantity }
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

module.exports = { createUser };



// const createSeedbook = async (req, res) => {
//   try {
//     const { userId, seeds } = req.body;

//     const newSeedbook = new Seedbook({
//       userId,
//       seeds
//     });

//     await newSeedbook.save();
//     res.status(201).json(newSeedbook);
//   } catch (err) {
//     console.error('Error creating seedbook:', err);
//     res.status(500).json({ error: 'Failed to create seedbook' });
//   }
// };

// module.exports = { createSeedbook };







// exports.syncUser = async (req, res) => {
//   try {
//     // The authenticated user information from Auth0
//     const user = req.oidc.user;

//     // Look for the user in the MongoDB collection by email
//     let existingUser = await User.findOne({ email: user.email });

//     // If the user does not exist, create a new user document
//     if (!existingUser) {
//       existingUser = new User({
//         name: user.name,
//         email: user.email,
//         location: user.location,  // You may also have location from Auth0
//         // NOTE: change this to lat and lon
//       });
//       await existingUser.save();  // Save the new user in MongoDB
//     }

//     // Return the user data
//     res.json(existingUser);
//   } catch (err) {
//     console.error('Error syncing user:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Export both functions
// module.exports = {
//   createUser,
//   syncUser,
// };
