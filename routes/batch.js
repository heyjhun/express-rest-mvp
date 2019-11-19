const express = require('express');

const Batch = require('../models/Batch');

const Course = require('../models/Course');

const Location = require('../models/Location');

const router = express.Router();

//require moment for date and time parsing
const moment = require("moment");


// get an index list of all courses
router.get('/', (req, res, next) => {
	Batch.find({})
	.then(batches => {
		if(batches.length > 0){
			return res.status(200).json({
				message: `Batches successfully retrieved.`,
				data: batches
			})
		}else{
			return res.status(404).json({
				message: `No batches currently registered.`
			})
		}
	})
	.catch(next)
})

// create new batch
router.post('/', (req, res, next) => {
	Course.findById(req.body.course_id)
	.then(course => {
		// check if desired course is stil being offered
		if(course.onOffer === false){
			//if no longer being offered, return an error message
			return  res.status(403).json({
				message: `Course with ID ${req.body.course_id} is no longer available`
			})
		}else{
			// check if desired location is still available for the course
			Location.findById(req.body.location_id)
			.then(location => {
				if(location.isActive === false){
					return res.status(403).json({
						message: `Location with ID ${req.body.location_id} is no longer available for use`
					})
				}else{
					let start_date = moment(req.body.start_date, "MM-DD-YYYY", true);
					let end_date = moment(req.body.end_date, "MM-DD-YYYY", true);
					// we know that if the specified string format is not met, values above

					if(!start_date.isValid() || !end_date.isValid()) {
						return res.status(403).json({
							message: "Start and end dates have to be strings with the format MM-DD-YYYY"
						})
					}else{
						//now that boths are valid date format, compate the dates
						//check that start date and end date are not yet past the current date
						if(start_date.isBefore(moment(),'day') || end_date.isBefore(moment(), 'day')) {
							return res.status(403).json({
								message: "Start and End Date have to be after the current date"
							})
						//check also if end date is before the end date
						}else if(end_date.isBefore(start_date)){
							return res.status(403).json({
								message: "End date should be after start date"
							})

						}else{
							//get batches from the same location
							Batch.find({location_id: req.body.location_id})
							.then(batches => {
								if(batches.length === 0) {
									Batch.create(req.body)
									.then(batch => {
										return res.status(201).json({
											message: "Batch successfully created",
											data: batch
										})
									})
								}else{
									//if there are batches registred to the specified location
									//check if start_date OR end_date of submitted batch falls within the start_date AND end_date of registered batches
									let conflicts = batches.filter(batch => {
										return (start_date.isBetween(batch.start_date, batch.end_date, null, [])) || (end_date.isBetween(batch.start_date, batch.end_date, null, []));
									})
									// if conflicting scheds were found in the desired location
									if(conflicts.length > 0) {
										return res.status(403).json({
											message: "May kasabay kang schedule sa gusto mong location. Change location or change start and end date"
										})
									}else{
										Batch.create(req.body)
										.then(batch => {
											return res.status(201).json({
												message: "Batch successfully created",
												data: batch
											})
										})

									}

								}
							})
							.catch(next);
						}	
					}
					
				}
			})
			.catch(next);
		}
	})
	.catch(next);

	// //parse user-submitted dates via Moment JS
	// let start_date = moment(req.body.start_date);
	// let end_date = moment(req.body.end_date);

	// // If the the submitted dates are already past current datem return error status
	// if(start_date.isBefore(moment()) || end_date.isBefore(moment())) {
	// 	return res.status(403).json({
	// 		message: "Lipas na BES!"
	// 	})
	// }else if(end_date.isBefore(start_date)){
	// 	return res.status(403).json({
	// 		message: "Baliktad petsa mo BES!"
	// 	})
	// }
})

// show specific batch detail
router.get('/:batchId', (req, res, next) => {
	Batch.findById(req.params.batchId)
	.then(batch => {
		if(batch !== null){
			return res.status(200).json({
				message: "Batch retrieved successfully."
				
			})
		}else{
			return res.status(404).json({
				message: `Batch with ID ${req.params.batchId} cannot be found`
			})
		}
	})
	.catch(next)
})

//update a specific batch

router.put('/:batchId', (req, res, next) => {
	Batch.findByIdAndUpdate(req.params.batchId, req.body, {new: true})
	.then(batch => {
		return res.status(200).json({
			message: `Course updated successfully`,
			data: batch
		})
	})
})



module.exports = router;