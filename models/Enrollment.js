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

//export the schema and model as properties of an object
//the schema will be used for embedding this in the User schema
//the model will be used for mongoose model queries
module.exports = {
	EnrollmentSchema : EnrollmentSchema,
	Enrollment : Enrollment	
};