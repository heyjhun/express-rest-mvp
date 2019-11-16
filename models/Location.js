const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
	building: {
		type: String,
		required: [true, 'Building name is required.']
	}, 
	street_address: {
		type: String,
		required: [true, 'Street address is required.']
	},
	city: {
		type: String,
		required: [true, 'City is required.']
	},
	isActive: {
		type: Boolean,
		default: true
	}
})

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;