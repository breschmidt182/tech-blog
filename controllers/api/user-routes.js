const router = require('express').Router();
const sequelize = require('../../config/connection');
const { response } = require('express');
const { User } = require('../../models');

// CREATE new user
router.post('/', (req, res) => {
     User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
    .then(response => {
        req.session.save(() => {
            // Set up sessions with a 'loggedIn' variable set to `true`
            req.session.loggedIn = true;
            res.status(200).json(response);
          });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
