const mongoose = require('mongoose');
const moment = require('moment');

const CourseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Course name is required.']
	},
	description: {
		type: String,
		required: [true, 'Course description is required.']
	},
	price: {
		type: Number,
		required: [true, 'Price is required.']
	},
	onOffer: {
		type: Boolean,
		default: true
	},
	created_on: {
		type: Date,
		default: moment()
	}
})

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;