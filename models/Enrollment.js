const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
	batch_id: {
		type: String,
		required: [true, 'Batch id is a required reference.']
	}, 
	status: {
		type: String,
		default: "enrolled"
	},
	enrollment_date: {
		type: Date,
		required: [true, 'Enrollment date is required.']
	}
})

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);

module.exports = Enrollment;