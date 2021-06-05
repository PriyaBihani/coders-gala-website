const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		featured: {
			type: Boolean,
			default: false,
		},
		name: {
			type: String,
			unique: true,
			required: true,
		},
		keywords: {
			type: String,
			required: false,
		},
		thumbnailUrl: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Article', ArticleSchema);
