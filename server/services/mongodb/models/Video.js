const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
		},
		url: {
			type: String,
			// required: true,
		},
		articlesLinked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Video', VideoSchema);
