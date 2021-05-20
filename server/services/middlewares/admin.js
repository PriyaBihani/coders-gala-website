const e = require('express');
let jwt = require('./../jwt/jwt');

module.exports = async (req, res, next) => {
	try {
		// Get the token from header
		// Split the token And get the JWT token from  Authorization header
		// Verify the token
		// if it's valid call next with appending userId to req.body
		// console.log(req.headers);
		console.log('dkfhjk');
		let token = req.headers.authorization;
		token = token.split(' ');
		let jwtToken = token[1];
		let decodedToken = await jwt.verify(jwtToken);
		console.log(decodedToken);
		if (decodedToken.data.role > 0) {
			req.decodedToken = decodedToken.data;
			next();
		} else {
			return res.status(400).send({
				message: 'SUCCESS',
				data: null,
				errorMessage: 'Access denied',
				error: error,
				status: 1,
			});
		}
	} catch (error) {
		res.status(400).send({
			message: 'FAILED',
			data: null,
			errorMessage: 'SERVER ERROR / ACCESS DENIED',
			error: error,
			status: 0,
		});
	}
};
