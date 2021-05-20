const mongoose = require('mongoose');

const SpecialitySchema = mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			unique: true,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Speciality', SpecialitySchema);
