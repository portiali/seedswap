

const User = require('../models/User');
// const Seedbook = require('../models/Seedbook');
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

    const userA = await User.findById(userAId);
    const userB = await User.findById(userBId);

    if (!userA || !userB) {
      return res.status(404).json({ message: 'One or both users not found' });
    }

    // Find the seeds in each user's collection
    const seedFromAIndex = userA.ownedSeeds.findIndex(seed => seed.seedId.toString() === seedIdFromA);
    const seedFromBIndex = userB.ownedSeeds.findIndex(seed => seed.seedId.toString() === seedIdFromB);

    if (seedFromAIndex === -1 || seedFromBIndex === -1) {
      return res.status(404).json({ message: 'One or both seeds not found for the users' });
    }

    // Extract seed entries
    const seedFromA = userA.ownedSeeds[seedFromAIndex];
    const seedFromB = userB.ownedSeeds[seedFromBIndex];

    // Swap: Add seedFromA to userB, and seedFromB to userA
    userB.ownedSeeds.push(seedFromA);
    userA.ownedSeeds.push(seedFromB);

    // Remove original seed entries
    userA.ownedSeeds.splice(seedFromAIndex, 1);
    userB.ownedSeeds.splice(seedFromBIndex, 1);

    await userA.save();
    await userB.save();

    res.status(200).json({ message: 'Seeds successfully swapped', userA, userB });

  } catch (err) {
    console.error('Swap error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};




// const getUser = async (req, res) => {
//   try {
//     // Assuming you're using email to fetch the user. You can change it to user ID if necessary.
//     const { email } = req.query; // Or use `req.params` or `req.body` depending on your request structure.

//     // Find the user in the database by email (you can also use ID if necessary)
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' }); // Respond with error if user is not found
//     }

//     // Exclude the password from the response to avoid exposing it
//     const { password, ...userData } = user.toObject(); // Destructure to exclude password

//     // Send the user data excluding the password
//     res.status(200).json(userData); // Respond with user information
//   } catch (err) {
//     // Handle any other errors that may occur
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

module.exports = { 
    createUser,
    // getUser,
    loginUser
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
