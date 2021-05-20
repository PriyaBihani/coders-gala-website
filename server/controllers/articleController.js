let Article = require('../services/mongodb/models/Article'),
	Topic = require('../services/mongodb/models/Topic');
const { validationResult } = require('express-validator');
var dataTypes = require('./../services/dataTypes/mongodb');

exports.addArticle = async (req) => {
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
		const article = new Article(req.body);
		const articleSaved = await article.save();
		// let modifiedTopic = await Topic.findOne({
		// 	_id: dataTypes.ObjectId(req.params.topicId),
		// });
		// let articlesInTopic = modifiedTopic.articles;
		// modifiedTopic.articles = articlesInTopic.push(
		// 	dataTypes.ObjectId(articleSaved._id)
		// );
		// await Topic.findByIdAndUpdate(req.params.topicId, modifiedTopic);
		return {
			message: 'SUCCESS',
			data: { article: article },
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

exports.getArticle = async (req) => {
	try {
		const article = await Article.findOne({
			name: req.body.name,
		});

		return {
			message: 'SUCCESS',
			data: { article: article },
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

exports.updateArticleById = async (req) => {
	try {
		const article = await Article.findOneAndUpdate(
			{ _id: req.params.id },
			req.body
		);

		return {
			message: 'SUCCESS',
			data: { article: article },
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

exports.getArticleById = async (req) => {
	try {
		const article = await Article.findById(req.params.id);

		return {
			message: 'SUCCESS',
			data: { article: article },
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

exports.deleteArticle = async (req) => {
	try {
		// find article
		const article = await Article.findById(req.params.articleId);
		// find topic
		const topic = await Topic.findById(req.params.topicId);
		// remove article from topic's article array
		topic.articles.splice(topic.articles.indexOf(article._id), 1);
		// delete article
		await article.remove();
		// update articles array in topic
		await topic.save();

		return {
			message: 'SUCCESS',
			data: { article: article },
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


exports.getAllArticles = async (req) => {
	try {
		const articles = await Article.find({});

		return {
			message: 'SUCCESS',
			data: { articles },
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
}