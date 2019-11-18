const express = require('express');

const Batch = require('../models/Batch');

const router = express.Router();

//require moment for date and time parsing
const moment = require("moment");

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

router.post('/batches', (req, res, next) => {
	//parse user-submitted dates via Moment JS
	let start_date = moment(req.body.start_date).format('MMMM Do YYYY');
	let end_date = moment(req.body.end_date).format('MMMM Do YYYY');
	res.send(start_date);
	//check for possible conflicts in location / schedule when registering a new batch
	Batch.find({})
	.then(batches => {
		if(batches.length > 0){
			let conflicts = batches.filter(batch => batch.location_id === req.body.location_id && ())
		}
	})
})

module.exports = router;