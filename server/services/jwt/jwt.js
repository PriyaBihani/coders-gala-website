require("dotenv").config({ path: "../../.env" });
let jwt = require("jsonwebtoken");

exports.signJWT = (data, expiry = null) => {
  if (expiry === "infinite") {
    return jwt.sign(
      {
        data: data,
      },
      process.env.JWT_SECRET
    );
  } else if (expiry) {
    return jwt.sign(
      {
        data: data,
      },
      process.env.JWT_SECRET,
      { expiresIn: expiry }
    );
  } else {
    return jwt.sign(
      {
        data: data,
      },
      process.env.JWT_SECRET,
      { expiresIn: "20h" }
    );
  }
};

exports.verify = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        reject(err.message);
      } else {
        resolve(decoded);
      }
    });
  });
};
