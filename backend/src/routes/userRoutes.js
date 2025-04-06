// routes/seedRoutes.js
const express = require('express');
const router = express.Router();
const { createUser, loginUser, swapUserSeeds, addSeedToUser, moveToGarden, fetchUserSeeds} = require('../controllers/userController');

// POST /api/users
console.log(createUser);  // This should log a function definition
router.post('/', createUser);

router.post('/login', loginUser);

router.post('/swap', swapUserSeeds);

router.post('/add', addSeedToUser);

router.post('/move', moveToGarden);

router.get('/seeds/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await fetchUserSeeds(userId);  // Call the fetchUserSeeds function
    res.status(200).json(result);  // Return the result as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message });  // Return an error response if something goes wrong
  }
});


// router.post('/', createUser);

module.exports = router;
