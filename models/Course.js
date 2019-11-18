const mongoose = require('mongoose');

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
	}
})

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;