let jwt = require("./../jwt/jwt");

module.exports = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.split(" ");
    let jwtToken = token[1];
    let decodedToken = await jwt.verify(jwtToken);

    req.decodedToken = decodedToken.data;

    next();
  } catch (error) {
    res.status(500).send({
      error: [{ msg: error.message }],
      message: 'Access Denied',
      data: null,
      statusCode: 304,
      status: 0,
    })
  }
};
