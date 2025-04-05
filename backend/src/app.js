const express = require('express');
const mongoose = require('mongoose');
const { auth } = require('express-openid-connect');
require('dotenv').config();

const userController = require('./controllers/userController');

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


// Sync Auth0 user with MongoDB
app.get('/profile', userController.syncUser);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});


