const express = require('express');

const Location = require('../models/Location');

//save this Router instance as a constant named router
const router = express.Router();

//retrieves an index list of collections
router.get('/', (req, res, next) => {
	Location.find({})
	.then(locations => {
		if(locations.length > 0){
			return res.status(200).json({
				message: "Locations retrieved successfully.",
				data: locations
			})
		}else{
			return res.status(404).json({
				message: "There are no locations currently registered."
			})
		}
	})
	.catch(next)
})

//creates a new location document in the locations collection
router.post('/', (req, res, next) => {
	//check for duplicates
	Location.find({building: req.body.building, street_address: req.body.street_address, city: req.body.city})
	.then(location => {
		if(location.length > 0){
			return res.status(403).json({
				message: "Location is already registered."
			})
		}else{
			Location.create(req.body)
			.then(location => {
				return res.status(201).json({
					message: "New location successfully registered.",
					data: location
				})
			})
		}
	})
	/*Location.create(req.body)
	.then(location => {
		return res.status(201).json({
			message: "New location successfully registered.",
			data: location
		})
	})*/
	.catch(next)
})

//shows a particular location's details
router.get('/:locationId', (req, res, next) => {
	Location.findById(req.params.locationId)
	.then(location => {
		if(location !== null){
			return res.status(200).json({
				message: "Location retrieved successfully.",
				data: location
			})	
		}else{
			return res.status(404).json({
				message: `Location with id ${req.params.locationId} can not be found.`
			})
		}
	})
	.catch(next)
})

//updates a specific location
router.put('/:locationId', (req, res, next) => {
	Location.findByIdAndUpdate(req.params.locationId, req.body, {new:true})
	.then(location => {
		return res.status(200).json({
			message: "Location updated successfully.",
			data: location
		})
	})
	.catch(next)
})

//set a specific location to inactive
router.delete('/:locationId', (req, res, next) => {
	Location.findByIdAndUpdate(req.params.locationId, {isActive: false}, {new: true})
	.then(location => {
		return res.status(200).json({
			message: "Location is no longer active.",
			data: location
		})
	})
	.catch(next)
})

module.exports = router;