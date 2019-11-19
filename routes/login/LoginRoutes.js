const express = require('express');

const router = express.Router();

/* Initial Login Page */
router.get('/', (req, res) => {
  res.render('login', {
    pageTitle: 'Knowledge Base - Login',
    loginImageLink: 'images/vector-knowledge.jpg',
    loginCSS: true,
  });
});

/* Registration Page */
router.get('/register', (req, res) => {
  res.render('registration', {
    pageTitle: 'Knowledge Base - Register',
    registrationCSS: true,
  });
});

module.exports = router;
