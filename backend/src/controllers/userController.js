

const User = require('../models/User');
const Seedbook = require('../models/Seedbook');
// const Garden = require('../models/Garden');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the provided password matches the stored password (plain-text comparison)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If credentials match, return success message or user data (exclude password for security)
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
        latitude: user.latitude,
        longitude: user.longitude,
        // Optionally, you can return a token (JWT) for authentication purposes
      }
    });
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};





const createUser = async (req, res) => {
  try {
    //removed ownedSeeds part of it
    const { name, location, latitude, longitude, email, password } = req.body;

    const newUser = new User({
      name,
      location,     // Now a string like "New York, NY"
      latitude,     // Number
      longitude,    // Number
      email,
      password
    //   ownedSeeds    // Should be array of { seedId, quantity }
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};




// assume frontend sends over json with userid for swap with another user in DB
// write a swapuser function that will swap seeds based on seedid by adding to each users
// seed collection and deleting from the origina users seed collection

const swapUserSeeds = async (req, res) => {
  try {
    const { userAId, userBId, seedIdFromA, seedIdFromB } = req.body;

    // Check if both users exist in the database
    const userA = await User.findById(userAId);
    const userB = await User.findById(userBId);

    if (!userA || !userB) {
      return res.status(404).json({ message: 'One or both users not found' });
    }

    // Now, check the seedbooks for both users by their userId
    const seedbookA = await Seedbook.findOne({ userId: userAId });
    const seedbookB = await Seedbook.findOne({ userId: userBId });

    if (!seedbookA || !seedbookB) {
      return res.status(404).json({ message: 'One or both users\' seedbooks not found' });
    }

    // Find the seeds in each user's seedbook
    const seedFromAIndex = seedbookA.seeds.findIndex(seed => seed.seedId.toString() === seedIdFromA);
    const seedFromBIndex = seedbookB.seeds.findIndex(seed => seed.seedId.toString() === seedIdFromB);

    if (seedFromAIndex === -1 || seedFromBIndex === -1) {
      return res.status(404).json({ message: 'One or both seeds not found in the users\' seedbooks' });
    }

    // Extract seed entries
    const seedFromA = seedbookA.seeds[seedFromAIndex];
    const seedFromB = seedbookB.seeds[seedFromBIndex];

    // Swap the seeds: Add seedFromA to userB's seedbook and seedFromB to userA's seedbook
    seedbookB.seeds.push(seedFromA);
    seedbookA.seeds.push(seedFromB);

    // Remove the original seeds from the respective seedbooks
    seedbookA.seeds.splice(seedFromAIndex, 1);
    seedbookB.seeds.splice(seedFromBIndex, 1);

    // Save the updated seedbooks
    await seedbookA.save();
    await seedbookB.save();

    res.status(200).json({ message: 'Seeds successfully swapped', userAId, userBId, seedbookA, seedbookB });

  } catch (err) {
    console.error('Swap error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};




const addSeedToUser = async (req, res) => {
  try {
    const { userId, seedId, status } = req.body;

    if (!userId || !seedId) {
      return res.status(400).json({ message: 'userId and seedId are required' });
    }

    // Optional status, defaults to 'up_for_trade'
    const seedStatus = status || 'up_for_trade';

    // Check if seedbook exists for user
    let seedbook = await Seedbook.findOne({ userId });

    if (!seedbook) {
      // If not, create one
      seedbook = new Seedbook({
        userId,
        seeds: [{ seedId, status: seedStatus }]
      });
    } else {
      // Check if this seed is already in the seedbook
      const existing = seedbook.seeds.find(seed => seed.seedId.toString() === seedId);

      if (existing) {
        // Optionally update status
        existing.status = seedStatus;
      } else {
        // Add new seed to seedbook
        seedbook.seeds.push({ seedId, status: seedStatus });
      }
    }

    await seedbook.save();

    res.status(200).json({ message: 'Seed added to seedbook successfully', seedbook });

  } catch (err) {
    console.error('Error adding seed to seedbook:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = { 
    createUser,
    loginUser,
    swapUserSeeds,
    addSeedToUser
};



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
