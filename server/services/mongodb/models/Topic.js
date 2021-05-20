const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
			required: true,
		},
		specialityId: { type: mongoose.Schema.Types.ObjectId, required: true },
		locked: {
			type: Boolean,
			default: false,
		},
		articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
		videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Topic', TopicSchema);
