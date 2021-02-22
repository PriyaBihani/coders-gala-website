var express = require('express');

let authController = require('./../controllers/authController'),
  authMiddleware = require('./../services/middlewares/auth'),
  adminMiddleware = require('./../services/middlewares/admin');

var router = express.Router();
const { check } = require('express-validator');

var ms = require('ms');
var TIME_OUT_TIME = '30m';

// SNIPPET TO INCREASE REQUEST TIME OUT
const setConnectionTimeout = (time) => {
  var delay = typeof time === 'string' ? ms(time) : Number(time || 5000);

  return function (req, res, next) {
    res.connection.setTimeout(delay);
    next();
  };
};

router.post(
  '/signup',
  setConnectionTimeout(`${TIME_OUT_TIME}`),
  [
    check('firstName', 'First name is required').notEmpty(),
    check('lastName', 'Last name is required').notEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('age', 'Age is required').notEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more character'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      let userRegister = await authController.signup(req);
      let code = userRegister.statusCode;
      delete userRegister.statusCode;
      res.status(code).send(userRegister);
    } catch (error) {
      res.status(500).send({
        message: 'FAILED',
        data: null,
        error: error,
      });
    }
  }
);

router.post(
  '/login',
  setConnectionTimeout(`${TIME_OUT_TIME}`),
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password field is required').isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    try {
      let userRegister = await authController.signin(req);
      let code = userRegister.statusCode;
      delete userRegister.statusCode;
      res.status(code).send(userRegister);
    } catch (error) {
      res.status(500).send({
        message: 'FAILED',
        data: null,
        error: error,
      });
    }
  }
);

router.get(
  '/user/:userId',
  setConnectionTimeout(`${TIME_OUT_TIME}`),
  async (req, res) => {
    try {
      let user = await authController.getUserById(req);
      let code = user.statusCode;
      delete user.statusCode;
      res.status(code).send(user);
    } catch (error) {
      res.status(500).send({
        message: 'FAILED',
        data: null,
        error: error,
      });
    }
  }
);

router.get(
  '/getUsers',
  setConnectionTimeout(`${TIME_OUT_TIME}`),
  adminMiddleware,
  async (req, res) => {
    try {
      let users = await authController.fetchAllUsers(req);
      let code = users.statusCode;
      delete users.statusCode;
      res.status(code).send(users);
    } catch (error) {
      res.status(500).send({
        message: 'FAILED',
        data: null,
        error: error,
      });
    }
  }
);

module.exports = router;
