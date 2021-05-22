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
			message: 'Speciality Fetched',
			data: { speciality },
			error: [],
			statusCode: 200,
			status: 1,
		};
	} catch (err) {
		console.log(err);
		return {
			message: 'Server Error',
			data: null,
			error: [{ msg: error.message }],
			statusCode: 500,
			status: 0,
		};
	}
};

exports.addSpeciality = async (req) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return {
			message: 'Validation Error',
			data: null,
			error: errors.array(),
			statusCode: 400,
			status: 0,
		};
	}

	try {
		const speciality = new Speciality(req.body);
		await speciality.save();

		return {
			message: 'Speciality added successfully',
			data: { speciality: speciality },
			error: [],
			statusCode: 200,
			status: 1,
		};
	} catch (err) {
		console.log(err);
		return {
			message: 'Server Error',
			data: null,
			error: [{ msg: error.message }],
			statusCode: 500,
			status: 0,
		};
	}
};

exports.getAllSpecialities = async (req) => {
	try {
		const speciality = await Speciality.find({});

		return {
			message: 'Specialities fetched',
			data: speciality,
			error: [],
			statusCode: 200,
			status: 1,
		};
	} catch (err) {
		console.log(err);
		return {
			message: 'Server Error',
			data: null,
			error: [{ msg: error.message }],
			statusCode: 500,
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
			message: 'Speciality updated successfully',
			data: speciality,
			error: [],
			statusCode: 200,
			status: 1,
		};
	} catch (err) {
		console.log(err);
		return {
			message: 'Server Error',
			data: null,
			error: [{ msg: error.message }],
			statusCode: 500,
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
			message: 'Speciality deleted successfully',
			error: null,
			statusCode: 200,
			status: 1,
		};
	} catch (err) {
		console.log(err);
		return {
			message: 'Server Error',
			data: null,
			error: [{ msg: error.message }],
			statusCode: 500,
			status: 0,
		};
	}
};
