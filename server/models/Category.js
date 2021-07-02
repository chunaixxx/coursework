const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	title: {
		type: String,
		required: true,
	},

	colorHex: {
		type: String,
		required: true,
	},

	user_id: {
		type: Object,
		required: true,
	},
});

module.exports = mongoose.model('category', CategorySchema);
