const Speciality = require('../services/mongodb/models/Speciality');
const Topic = require('../services/mongodb/models/Topic');
const Article = require('../services/mongodb/models/Article');
var dataTypes = require('./../services/dataTypes/mongodb');

const { validationResult } = require('express-validator');

exports.getSpeciality = async (req) => {
	try {
		const speciality = await Speciality.findOne({
			name: req.params.specialityName,
		});
		console.log(speciality);
		return {
			message: 'SUCCESS',
			data: { speciality },
			error: null,
			statusCode: 200,
			status: 1,
		};
	} catch (err) {
		console.log(err);
		return {
			message: 'FAILED',
			data: null,
			errorMessage: 'Server Error',
			statusCode: 400,
			status: 0,
		};
	}
};

exports.addSpeciality = async (req) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return {
			message: 'FAILED',
			data: null,
			errors: errors.array(),
			errorMessage: 'validation Error',
			statusCode: 400,
			status: 0,
		};
	}

	try {
		const speciality = new Speciality(req.body);
		await speciality.save();

		return {
			message: 'SUCCESS',
			data: { speciality: speciality },
			error: null,
			statusCode: 200,
			status: 1,
		};
	} catch (err) {
		console.log(err);
		return {
			message: 'FAILED',
			data: null,
			errorMessage: 'Server Error',
			statusCode: 400,
			status: 0,
		};
	}
};

exports.getAllSpecialities = async (req) => {
	try {
		const speciality = await Speciality.find({});

		return {
			message: 'SUCCESS',
			data: speciality,
			error: null,
			statusCode: 200,
			status: 1,
		};
	} catch (err) {
		console.log(err);
		return {
			message: 'FAILED',
			data: null,
			errorMessage: 'Server Error',
			statusCode: 400,
			status: 0,
		};
	}
};

exports.updateSpeciality = async (req) => {
	try {
		const speciality = await Speciality.findOneAndUpdate(
			{ _id: req.params.specialityId },
			req.body
		);

		return {
			message: 'SUCCESS',
			data: speciality,
			error: null,
			statusCode: 200,
			status: 1,
		};
	} catch (err) {
		console.log(err);
		return {
			message: 'FAILED',
			data: null,
			errorMessage: 'Server Error',
			statusCode: 400,
			status: 0,
		};
	}
};

exports.deleteSpeciality = async (req) => {
	try {
		const topics = await Topic.find({ SpecialityId: req.params.specialityId });
		console.log(topics);
		if (topics.length == 0) {
			const speciality = await Speciality.findById(req.params.specialityId);
			await speciality.remove();
		} else {
			throw 'Can not delete speciality';
		}

		return {
			message: 'SUCCESS',
			error: null,
			statusCode: 200,
			status: 1,
		};
	} catch (err) {
		console.log(err);
		return {
			message: 'FAILED',
			data: null,
			errorMessage: 'Server Error',
			statusCode: 400,
			status: 0,
		};
	}
};
