

const User = require('../models/User');
// const Seedbook = require('../models/Seedbook');
// const Garden = require('../models/Garden');

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



const getUser = async (req, res) => {
  try {
    // Assuming you're using email to fetch the user. You can change it to user ID if necessary.
    const { email } = req.query; // Or use `req.params` or `req.body` depending on your request structure.

    // Find the user in the database by email (you can also use ID if necessary)
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Respond with error if user is not found
    }

    // Exclude the password from the response to avoid exposing it
    const { password, ...userData } = user.toObject(); // Destructure to exclude password

    // Send the user data excluding the password
    res.status(200).json(userData); // Respond with user information
  } catch (err) {
    // Handle any other errors that may occur
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { 
    createUser,
    getUser
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
