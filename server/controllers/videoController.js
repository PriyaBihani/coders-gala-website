let Video = require('../services/mongodb/models/Video'),
	Topic = require('../services/mongodb/models/Topic');
var dataTypes = require('./../services/dataTypes/mongodb');
const { validationResult } = require('express-validator');



exports.getVideoById = async (req) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return {
			data: null,
			error: errors.array(),
			message: 'validation Error',
			statusCode: 400,
			status: 0,
		};
	}
	try {
		const video = await Video.findById(req.params.id);
		return {
			message: 'Video fetched successfully',
			data: { video },
			error: [],
			statusCode: 200,
			status: 1,
		};
	} catch (error) {
		console.log(error);
		return {
			message: 'Server Error',
			data: null,
			error: [{ msg: error.message }],
			statusCode: 500,
			status: 0,
		};
	}
};

exports.addVideo = async (req) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return {
			data: null,
			error: errors.array(),
			message: 'validation Error',
			statusCode: 400,
			status: 0,
		};
	}
	try {
		const video = new Video(req.body);
		const videoSaved = await video.save();

		let modifiedTopic = await Topic.findOne({
			_id: dataTypes.ObjectId(req.params.topicId),
		});

		// Check if it can be done in one line
		let videosInTopic = modifiedTopic.videos;
		modifiedTopic.videos = videosInTopic.push(
			dataTypes.ObjectId(videoSaved._id)
		);

		await Topic.findByIdAndUpdate(req.params.topicId, modifiedTopic);
		return {
			message: 'Video added successfully',
			data: { video },
			error: [],
			statusCode: 200,
			status: 1,
		};
	} catch (error) {
		console.log(error);
		return {
			message: 'Server Error',
			data: null,
			error: [{ msg: error.message }],
			statusCode: 500,
			status: 0,
		};
	}
};

exports.updateVideoById = async (req) => {
	try {
		const video = await Video.findOneAndUpdate(
			{ _id: req.params.id },
			req.body
		);

		return {
			message: 'Video updated successfully',
			data: { video },
			error: [],
			statusCode: 200,
			status: 1,
		};
	} catch (error) {
		console.log(error);
		return {
			message: 'Server Error',
			data: null,
			error: [{ msg: error.message }],
			statusCode: 500,
			status: 0,
		};
	}
};

exports.deleteVideo = async (req) => {
	try {
		const video = await Video.findById(req.params.videoId);
		const topic = await Topic.findById(req.params.topicId);

		topic.videos.splice(topic.videos.indexOf(video._id), 1);

		await video.remove();
		await topic.save();
		return {
			message: 'Video deleted successfully',
			data: { video },
			error: [],
			statusCode: 200,
			status: 1,
		};
	} catch (error) {
		console.log(error);
		return {
			message: 'Server Error',
			data: null,
			error: [{ msg: error.message }],
			statusCode: 500,
			status: 0,
		};
	}
};
