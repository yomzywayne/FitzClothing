/* eslint-disable */
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const passportJWT = require('passport-jwt');

// Require dotenv and initialize environment variables
require('dotenv').config();

// Create JWT authentication strategy
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SEC,
    },
    function (jwtPayload, cb) {
      // find the user in db if needed
      return User.findById(jwtPayload._id)
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(new Error('User not found'));
    }
    const { _id, username, email, isAdmin } = user; // <-- add isAdmin here
    return done(null, { _id, username, email, isAdmin }); // <-- include isAdmin in req.user
  } catch (err) {
    return done(err);
  }
});

// Middleware to authenticate user using JWT
const authMiddleware = passport.authenticate('jwt', { session: false });

// CREATE a new user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const loginUser = { _id: user._id, firstname: user.firstname, lastname: user.lastname, username: user.username, email: user.email, isAdmin: user.isAdmin, img: user.img};

    res.status(201).json(loginUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username, password: password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the user is an admin
    if (user.username === 'admin') {
      user.isAdmin = true;
    }

    const loginUser = { _id: user._id, firstname: user.firstname, lastname: user.lastname, username: user.username, email: user.email, isAdmin: user.isAdmin, img: user.img};
    return res.json(loginUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// READ all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();

    var loginUsers = [];
    
    users.forEach(user => {
      const loginUser = { _id: user._id, firstname: user.firstname, lastname: user.lastname, username: user.username, email: user.email, isAdmin: user.isAdmin, img: user.img};
      loginUsers.push(loginUser);
    });
    
    res.json(loginUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE one user
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.firstname != null) {
    res.user.firstname = req.body.firstname;
  }
  if (req.body.lastname != null) {
    res.user.lastname = req.body.lastname;
  }
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.isAdmin != null) {
    res.user.isAdmin = req.body.isAdmin;
  }
  if (req.body.img != null) {
    res.user.img = req.body.img;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE one user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;