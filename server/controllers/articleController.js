let Article = require('../services/mongodb/models/Article'),
	User = require('../services/mongodb/models/User'),
	Topic = require('../services/mongodb/models/Topic');
const { validationResult } = require('express-validator');
var dataTypes = require('./../services/dataTypes/mongodb');
let dbFilters = require('./../services/filters/db-filters');



exports.likeArticle = async (req) => {
	const { articleId, action } = req.params
	const { userId } = req.body
	console.log(userId)
	try {
		// get User
		var user = await User.findById(userId)
		// get user's liked articles
		var likedArticles = user.likedArticles
		console.log('likedarticles', likedArticles)
		switch (action) {
			case "like":
				if (!likedArticles.includes(articleId)) {
					likedArticles.push(articleId)
				}
				break
			case "unlike":
				if (likedArticles.includes(articleId)) {
					likedArticles.splice(likedArticles.indexOf(articleId), 1)

				}
				break
		}
		console.log('likedArticlesarray', likedArticles)
		user.likedArticles = likedArticles
		console.log(user)

		await user.save()
		return {
			message: `Article ${action}d successfully`,
			data: { user: dbFilters.sanitizeUser(user) },
			error: [],
			statusCode: 200,
			status: 1,
		};
	} catch (error) {
		console.log(err);
		return {
			message: 'Server Error',
			data: null,
			error: [{ msg: error.message }],
			statusCode: 500,
			status: 0,
		};
	}
}

exports.addArticle = async (req) => {
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
			message: 'Article added successfully',
			data: { article: article },
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

exports.getArticle = async (req) => {
	try {
		const article = await Article.findOne({
			name: req.body.name,
		});

		return {
			message: 'SUCCESS',
			data: { article: article },
			error: [],
			statusCode: 200,
			status: 1,
		};
	} catch (err) {
		console.log(err);
		return {
			data: null,
			error: [{ msg: error.message }],
			message: 'Internal server error',
			status: 0,
			statusCode: 500,

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
			message: 'Updated Article Successfully',
			data: { article: article },
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

exports.getArticleById = async (req) => {
	try {
		const article = await Article.findById(req.params.id);

		return {
			message: 'Article Fetched',
			data: { article: article },
			error: [],
			statusCode: 200,
			status: 1,
		};
	} catch (err) {
		console.log(err);
		return {
			error: [{ msg: error.message }],
			message: 'Internal server error',
			data: null,
			statusCode: 500,
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
			message: 'Deleted article successfully',
			data: { articles },
			error: [],
			statusCode: 200,
			status: 1,
		};
	} catch (err) {
		console.log(err);
		return {
			error: [{ msg: error.message }],
			message: 'Internal server error',
			data: null,
			statusCode: 500,
			status: 0,
		};
	}
};


exports.getAllArticles = async (req) => {
	try {
		const articles = await Article.find({});
		return {
			message: 'All articles fetched',
			data: { articles },
			error: [],
			statusCode: 200,
			status: 1,
		};
	} catch (err) {
		console.log(err);
		return {
			data: null,
			error: [{ msg: error.message }],
			message: 'Internal server error',
			status: 0,
			statusCode: 500,
		};
	}
}


exports.getArticleOptions = async (req) => {

	try {

		const options = await Article.aggregate([
			{
				$match: {},
			},
			{
				"$group": {
					"_id": {
						"_id": "$_id",
						"label": "$name",
						"value": "$_id",

					},
				}
			},
			{
				"$project": {
					"_id": 0,
					"label": "$_id.label",
					"value": "$_id.value"
				}
			},

		])

		return {
			message: 'All options fetched',
			data: { options },
			error: [],
			statusCode: 200,
			status: 1,
		};
	} catch (error) {
		console.log(error);
		return {
			data: null,
			error: [{ msg: error.message }],
			message: 'Internal server error',
			status: 0,
			statusCode: 500,
		};
	}
}