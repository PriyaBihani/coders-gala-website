const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

let {
	getVideoById,
	addVideo,
	updateVideoById,
	deleteVideo,
} = require('./../controllers/videoController'),
	authMiddleware = require('./../services/middlewares/auth'),
	adminMiddleware = require('./../services/middlewares/admin');

router.get('/get/:id', async (req, res) => {
	try {
		const video = await getVideoById(req);
		const code = video.statusCode;
		delete video.statusCode;
		res.status(code).send(video);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			data: null,
			error: [{ msg: error.message }],
			message: 'Internal server error',
			status: 0,
		});
	}
});

router.post(
	'/add/:topicId',
	authMiddleware,
	adminMiddleware,
	[check('name', 'Video name not be empty').notEmpty()],
	[check('url', 'Video url can not be empty').notEmpty()],
	async (req, res) => {
		try {
			let video = await addVideo(req);
			let code = video.statusCode;
			delete video.statusCode;
			res.status(code).send(video);
		} catch (error) {
			console.log(error);
			res.status(500).send({
				data: null,
				error: [{ msg: error.message }],
				message: 'Internal server error',
				status: 0,
			});
		}
	}
);

router.post(
	'/update/:id',
	authMiddleware,
	adminMiddleware,
	async (req, res) => {
		try {
			const video = await updateVideoById(req);
			const code = video.statusCode;
			delete video.statusCode;
			res.status(code).send(video);
		} catch (error) {
			console.log(error);
			res.status(500).send({
				data: null,
				error: [{ msg: error.message }],
				message: 'Internal server error',
				status: 0,
			});
		}
	}
);

router.post(
	'/delete/:videoId/:topicId',
	authMiddleware,
	adminMiddleware,
	async (req, res) => {
		try {
			let video = await deleteVideo(req);
			let code = video.statusCode;
			delete video.statusCode;
			res.status(code).send(video);
		} catch (error) {
			console.log(error);
			res.status(500).send({
				data: null,
				error: [{ msg: error.message }],
				message: 'Internal server error',
				status: 0,
			});
		}
	}
);

module.exports = router;
