const mongoose = require('mongoose');

//use object destructuring to selectively pick an object property from the exported object of the required file
const { BatchSchema } = require('./Batch');

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
	batches: [BatchSchema]
})

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;