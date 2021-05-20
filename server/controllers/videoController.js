let Video = require('../services/mongodb/models/Video'),
	Topic = require('../services/mongodb/models/Topic');
var dataTypes = require('./../services/dataTypes/mongodb');

exports.getVideoById = async (req) => {
	try {
		const video = await Video.findById(req.params.id);
		return {
			message: 'SUCCESS',
			data: { video },
			error: null,
			statusCode: 200,
			status: 1,
		};
	} catch (error) {
		console.log(error);
		return {
			message: 'FAILED',
			data: null,
			errorMessage: 'Server Error',
			statusCode: 400,
			status: 0,
		};
	}
};

exports.addVideo = async (req) => {
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
			message: 'SUCCESS',
			data: { video },
			error: null,
			statusCode: 200,
			status: 1,
		};
	} catch (error) {
		console.log(error);
		return {
			message: 'FAILED',
			data: null,
			errorMessage: 'Server Error',
			statusCode: 400,
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
			message: 'SUCCESS',
			data: { video },
			error: null,
			statusCode: 200,
			status: 1,
		};
	} catch (error) {
		console.log(error);
		return {
			message: 'FAILED',
			data: null,
			errorMessage: 'Server Error',
			statusCode: 400,
			status: 0,
		};
	}
};

exports.deleteVideo = async (req) => {
	try {
		const video = await Video.findById(req.params.videoId);
		const topic = await Topic.findById(req.params.topicId);
		topic.video.splice(topic.videos.indexOf(video._id), 1);

		await video.remove();
		await topic.save();
		return {
			message: 'SUCCESS',
			data: { video },
			error: null,
			statusCode: 200,
			status: 1,
		};
	} catch (error) {
		console.log(error);
		return {
			message: 'FAILED',
			data: null,
			errorMessage: 'Server Error',
			statusCode: 400,
			status: 0,
		};
	}
};
