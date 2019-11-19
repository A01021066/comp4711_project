const express = require('express');
const bodyParser = require('body-parser');
const userAuth = require('../models/userAuth');

const app = express();

app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json());

// pass the email, name, and password into the next page
// where actual registration happens
exports.signup = (req, res) => {
  const userAuthData = {
    name: `${req.body.firstName} ${req.body.lastName}`,
    password: `${req.body.password}`,
    email: `${req.body.email}`,
  };

  res.render('register', { data: userAuthData });
};

// calls the api functions for registration, insert the data into userauth and userinfo
// TODO: we should probably block invalid input in front-end, which is easier to handle
exports.register = (req, res) => {
  const userAuthData = {
    password: req.body.password,
    email: req.body.email,
  };
  const userInfoData = {
    name: req.body.name,
    picture: `${req.body.picture}`,
    statement_of_intent: `${req.body.statement_of_intent}`,
    birthday: `${req.body.birthday}`,
  };
  // backend data validation. only checks empty value for now.
  userAuthData.foreach((elem) => {
    if (elem === undefined || elem === '' || elem == null) {
      throw new Error('Invalid authentication input');
    }
  });
  userInfoData.foreach((elem) => {
    if (elem === undefined || elem === '' || elem == null) {
      throw new Error('Invalid information input');
    }
  });

  userAuth.registerAuth(userAuthData).then(
    () => userAuth.registerInfo(userInfoData),
  ).catch(
    (reason) => console.log(reason),
  );
};

// handles the login
exports.login = (req, res) => {
  const userAuthData = {
    email: `${req.body.email}`,
    password: `${req.body.password}`,
  };
  // this function returns the user id if success, -1 if fail to login
  const loginCheck = userAuth.login(userAuthData);
  if (loginCheck === -1) {
    res.render('login', { loginFailed: true });
  } else {
    res.render('main', { userId: loginCheck });
  }
};