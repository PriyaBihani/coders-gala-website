const User = require("../services/mongodb/models/User");
const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
let dbFilters = require("./../services/filters/db-filters"),
  jwt = require("./../services/jwt/jwt");
const { event } = require("../services/events/event");

const crypto = require("crypto");

exports.signup = async (req) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return {
      message: "FAILED",
      data: null,
      errors: errors.array(),
      errorMessage: "validation Error",
      statusCode: 400,
      status: 0,
    };
  }

  // check for referral code if it exists then increment the points of user whose referral code was used

  const { firstName, lastName, email, password, age, codeReferred } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return {
        message: "FAILED",
        data: null,
        errorMessage: "User already exists",
        statusCode: 200,
        status: 0,
      };
    }
    const initials = firstName[0] + lastName[0];
    const randomNumber = Math.floor(Math.random() * (90 - 65 + 1) + 65);
    const notSoRandom = randomNumber + lastName.length;
    const referCode =
      initials +
      age +
      firstName[1] +
      firstName.length +
      lastName[1] +
      notSoRandom +
      String.fromCharCode(randomNumber);

    user = new User({
      referCode,
      firstName,
      lastName,
      email,
      password,
      age,
      codeReferred,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    if (codeReferred != "") {
      console.log(codeReferred);
      const referCodeUser = await User.findOne({ referCode: codeReferred });
      if (referCodeUser) {
        referCodeUser.points = referCodeUser.points + 2;
        await referCodeUser.save();
      }
    }
    console.log(user);
    // Return jwt

    const token = jwt.signJWT(dbFilters.sanitizeUser(user));
    // event to log user
    event.emit("log", {
      type: "USER_ADDED",
      metadata: dbFilters.sanitizeUser(user),
      hasFailed: false,
      // message: `Agent "${userSave.name}" was Added`,
    });

    return {
      data: { user: dbFilters.sanitizeUser(user), token },
      error: null,
      message: "SUCCESS",
      statusCode: 200,
      status: 1,
    };
  } catch (err) {
    console.error(err.message);
    event.emit("log", {
      type: "USER_ADDED",
      metadata: req.body,
      hasFailed: true,
      // message: `Agent "${userSave.name}" was Added`,
    });
    return {
      message: "FAILED",
      data: null,
      errorMessage: "Server Error",
      statusCode: 400,
      status: 0,
    };
  }
};

exports.signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return {
      message: "FAILED",
      data: null,
      errors: errors.array(),
      errorMessage: "validation Error",
      statusCode: 400,
      status: 0,
    };
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return {
        message: "FAILED",
        data: null,
        errorMessage: "User does not exist",
        statusCode: 200,
        status: 0,
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        message: "FAILED",
        data: null,
        errorMessage: "Incorrect password",
        statusCode: 200,
        status: 0,
      };
    }

    const token = jwt.signJWT(dbFilters.sanitizeUser(user));

    return {
      data: { user: dbFilters.sanitizeUser(user), token },
      error: null,
      message: "SUCCESS",
      statusCode: 200,
      status: 1,
    };
  } catch (err) {
    console.error(err.message);
    return {
      message: "FAILED",
      data: null,
      errorMessage: "Server Error",
      statusCode: 400,
      status: 0,
    };
  }
};

exports.getUserById = async (req) => {
  try {
    const user = await User.findById(req.params.userId);

    return {
      data: { user: dbFilters.sanitizeUser(user) },
      error: null,
      message: "SUCCESS",
      statusCode: 200,
      status: 1,
    };
  } catch (err) {
    return {
      message: "FAILED",
      data: null,
      errorMessage: "Server Error",
      statusCode: 400,
      status: 0,
    };
  }
};

// exports.getUserById = async (req)=>{}

exports.fetchAllUsers = async (req) => {
  try {
    const users = await User.find({});
    return {
      data: users,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
      status: 1,
    };
  } catch (err) {
    return {
      message: "FAILED",
      data: null,
      errorMessage: "Server Error",
      statusCode: 400,
      status: 0,
    };
  }
};
