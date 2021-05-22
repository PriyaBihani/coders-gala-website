let Topic = require('../services/mongodb/models/Topic'),
	User = require('../services/mongodb/models/User'),
	Speciality = require('../services/mongodb/models/Speciality'),
	Article = require('../services/mongodb/models/Article');
const { validationResult } = require('express-validator');
var dataTypes = require('./../services/dataTypes/mongodb');

exports.addTopic = async (req) => {
	console.log('skdfhksj');
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return {
			data: null,
			error: errors.array(),
			message: 'Validation Error',
			statusCode: 400,
			status: 0,
		};
	}

	try {
		console.log(req.body)
		const topic = new Topic(req.body);

		await topic.save();

		return {
			message: 'Topic added successfully',
			data: { topic },
			error: [],
			statusCode: 200,
			status: 1,
		};
	} catch (err) {
		console.log(err.message);
		return {
			data: null,
			error: [{ msg: error.message }],
			message: 'Internal Server Error',
			statusCode: 500,
			status: 0,
		};
	}
};

exports.getAllTopics = async (req) => {
	console.log('Fetching tpoics');
	try {
		const speciality = await Speciality.findOne({
			name: req.params.specialityName,
		});
		const topics = await Topic.find({
			specialityId: dataTypes.ObjectId(speciality._id),
		})
			.populate('articles')
			.populate('videos');

		return {
			message: 'Fetched topics successfully',
			data: topics,
			error: [],
			statusCode: 200,
			status: 1,
		};
	} catch (err) {
		console.log(err);
		return {
			data: null,
			error: [{ msg: error.message }],
			message: 'Internal Server Error',
			statusCode: 500,
			status: 0,
		};
	}
};

exports.updateTopic = async (req) => {
	try {
		const topic = await Topic.findOneAndUpdate(
			{ _id: req.params.topicId },
			req.body
		);

		return {
			message: 'Updated topic successfully',
			data: topic,
			error: [],
			statusCode: 200,
			status: 1,
		};
	} catch (err) {
		console.log(err);
		return {
			data: null,
			error: [{ msg: error.message }],
			message: 'Internal Server Error',
			statusCode: 500,
			status: 0,
		};
	}
};

exports.deleteTopic = async (req) => {
	try {
		const topic = await Topic.findById(req.params.topicId);
		const articlesArray = topic.articles;

		await Article.deleteMany({
			_id: {
				$in: articlesArray,
			},
		});

		await topic.remove();

		console.log(topic);
		return {
			message: 'Topic deleted successfully',
			data: topic,
			error: [],
			statusCode: 200,
			status: 1,
		};
	} catch (err) {
		console.log(err);
		return {
			data: null,
			error: [{ msg: error.message }],
			message: 'Internal Server Error',
			statusCode: 500,
			status: 0,
		};
	}
};
exports.unlockTopicForUser = async (req) => {
	try {
		console.log(req.decodedToken.userId);
		const user = await User.findById(req.decodedToken.userId);
		var { unLockedTopics, points } = user;
		if (!unLockedTopics.includes(req.params.topicId) && points > 0) {
			unLockedTopics.push(req.params.topicId);
			user.points = points - 1;
			const updatedUser = await user.save();
			return {
				message: 'Unlocked topic successfully',
				data: { user: updatedUser },
				error: [],
				statusCode: 200,
				status: 1,
			};
		} else {
			return {
				message: 'Not enough points to unlock topic',
				data: { user: user },
				error: [{ msg: 'Not enough points' }],
				statusCode: 200,
				status: 0,
			};
		}

		// console.log(user);
	} catch (err) {
		console.log(err);
		return {
			data: null,
			error: [{ msg: error.message }],
			message: 'Internal Server Error',
			statusCode: 500,
			status: 0,
		};
	}
};
