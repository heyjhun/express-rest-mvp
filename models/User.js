const mongoose = require('mongoose');

const EnrollmentSchema = require('./Enrollment');

const UserSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: [true, 'First name is required.']
	},
	last_name: {
		type: String,
		required: [true, 'Last name is required.']
	},
	email: {
		type: String,
		required: [true, 'Email is required.']
	},
	password: {
		type: String,
		required: [true, 'Password is required']
	},
	enrollments: [EnrollmentSchema],
	isAdmin: {
		type: Boolean,
		default: false
	}
})

const User = mongoose.model('User', UserSchema);

module.exports = User;