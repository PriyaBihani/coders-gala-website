const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
let specialityController = require('./../controllers/specialityController'),
	authMiddleware = require('./../services/middlewares/auth'),
	adminMiddleware = require('./../services/middlewares/admin');

router.post(
	'/add',
	adminMiddleware,
	[check('content', 'Article can not be empty').notEmpty()],
	[check('name', 'Speciality name can not be empty').notEmpty()],
	[check('imageUrl', 'ImageURL can not be empty').notEmpty()],
	async (req, res) => {
		try {
			console.log('working');
			let speciality = await specialityController.addSpeciality(req);
			let code = speciality.statusCode;
			delete speciality.statusCode;
			res.status(code).send(speciality);
		} catch (error) {
			res.status(500).send({
				error: [{ msg: error.message }],
				message: 'Internal server error',
				data: null,
				statusCode: 500,
				status: 0,
			})
		}
	}
)

router.get('/all', async (req, res) => {
	try {
		let speciality = await specialityController.getAllSpecialities(req);
		let code = speciality.statusCode;
		delete speciality.statusCode;
		res.status(code).send(speciality);
	} catch (error) {
		res.status(500).send({
			error: [{ msg: error.message }],
			message: 'Internal server error',
			data: null,
			statusCode: 500,
			status: 0,
		})
	}
});

router.get('/get/:specialityName', async (req, res) => {
	try {
		let speciality = await specialityController.getSpeciality(req);
		let code = speciality.statusCode;
		delete speciality.statusCode;
		res.status(code).send(speciality);
	} catch (error) {
		res.status(500).send({
			error: [{ msg: error.message }],
			message: 'Internal server error',
			data: null,
			statusCode: 500,
			status: 0,
		})
	}
});

router.post('/update/:specialityId', adminMiddleware, async (req, res) => {
	try {
		let speciality = await specialityController.updateSpeciality(req);
		let code = speciality.statusCode;
		delete speciality.statusCode;
		res.status(code).send(speciality);
	} catch (error) {
		res.status(500).send({
			error: [{ msg: error.message }],
			message: 'Internal server error',
			data: null,
			statusCode: 500,
			status: 0,
		})
	}
});

router.post('/delete/:specialityId', adminMiddleware, async (req, res) => {
	try {
		let speciality = await specialityController.deleteSpeciality(req);
		let code = speciality.statusCode;
		delete speciality.statusCode;
		res.status(code).send(speciality);
	} catch (error) {
		res.status(500).send({
			error: [{ msg: error.message }],
			message: 'Internal server error',
			data: null,
			statusCode: 500,
			status: 0,
		})
	}
});

module.exports = router;
