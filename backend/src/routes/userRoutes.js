// routes/seedRoutes.js
const express = require('express');
const router = express.Router();
const { createUser, loginUser, swapUserSeeds, addSeedToUser, moveToGarden} = require('../controllers/userController');

// POST /api/users
console.log(createUser);  // This should log a function definition
router.post('/', createUser);

router.post('/login', loginUser);

router.post('/swap', swapUserSeeds);

router.post('/add', addSeedToUser);

router.post('/move', moveToGarden);

// router.post('/', createUser);

module.exports = router;
