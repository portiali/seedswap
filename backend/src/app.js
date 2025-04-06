const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seedRoutes = require('./routes/seedRoutes');
const userRoutes = require('./routes/userRoutes')
dotenv.config({ path: '../.env' });

dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware to parse incoming JSON
app.use(express.json());

// Basic endpoint to verify if server is working
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});


app.use('/api/user', userRoutes);

app.use('/api/seeds', seedRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});












// const express = require('express');
// const mongoose = require('mongoose');
// const { auth } = require('express-openid-connect');
// // const {isAuthenticated} = require('./middleware/auth')
// // require('dotenv').config();
// require('dotenv').config({ path: '../.env' });


// const userController = require('./controllers/userController');

// const app = express();

// console.log(process.env); // This should print all the loaded environment variables

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.AUTH0_SECRET,
//   baseURL: process.env.AUTH0_BASE_URL,
//   clientID: process.env.AUTH0_CLIENT_ID,
//   issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
// };


// console.log("baseURL:", process.env.AUTH0_BASE_URL);
// console.log("AUTH0_SECRET:", process.env.AUTH0_SECRET); // Check if it's loaded correctly


// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected!'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // app.get('/', (req, res) => {
// //   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// // });

// // app.get('/logout', (req, res) => {
// //   res.logout({
// //     returnTo: process.env.LOGOUT_REDIRECT_URL || 'http://localhost:3001', // Redirect after logout
// //   });
// // });





// // app.get('/callback', (req, res) => {
// //   // Handle Auth0 callback here (store session, etc.)
// //   res.send('Callback received!');
// // });

// // // Sync Auth0 user with MongoDB
// // app.get('/profile', isAuthenticated, userController.syncUser);

// app.listen(process.env.PORT, () => {
//   console.log(`Server started on port ${process.env.PORT}`);
// });




