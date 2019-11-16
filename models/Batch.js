const mongoose = require('mongoose');

const BatchSchema = new mongoose.Schema({
	start_date: {
		type: Date,
		required: [true, 'Start date is required.']
	},
	end_date: {
		type: Date,
		required: [true, 'End date is required.']
	},
	seats: {
		type: Number,
		required: [true, 'Seats field is required.']
	},
	isAvail: {
		type: Boolean,
		default: true
	},
	location_id: {
		type: String
		required: [true, 'Location id is needed as a reference.']
	}
})

const Batch = mongoose.model('Batch', BatchSchema);

module.exports = Batch;