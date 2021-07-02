const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
	author: {
		type: String,
		required: true,
	},

	desc: {
		type: String,
		required: true,
	},

	grade: {
		type: String,
		required: true,
	},

	user_id: {
		type: Object,
		required: true,
	},

	date: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('review', ReviewSchema);
