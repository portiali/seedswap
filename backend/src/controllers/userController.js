// In your userController.js
exports.syncUser = async (req, res) => {
  try {
    // The authenticated user information from Auth0
    const user = req.oidc.user;

    // Look for the user in the MongoDB collection by email
    let existingUser = await User.findOne({ email: user.email });

    // If the user does not exist, create a new user document
    if (!existingUser) {
      existingUser = new User({
        name: user.name,
        email: user.email,
        location: user.location,  // You may also have location from Auth0
        // NOTE: change this to lat and lon
      });
      await existingUser.save();  // Save the new user in MongoDB
    }

    // Return the user data
    res.json(existingUser);
  } catch (err) {
    console.error('Error syncing user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
