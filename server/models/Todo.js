const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	desc: {
		type: String,
		required: true,
	},

	user_id: {
		type: Object,
		required: true,
	},

	category_id: {
		type: Object,
		required: true,
	},

	date: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('todo', TodoSchema);
