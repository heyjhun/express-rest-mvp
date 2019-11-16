const express = require('express');

const Course = require('../models/Course');

const router = express.Router();

//get an index list of all courses
router.get('/', (req, res, next) => {
	Course.find({})
	.then((courses) => {
		if(courses.length > 0){
			return res.status(200).json({
				message: "Courses retrieved successfully",
				data: courses
			})
		}else{
			return res.status(404).json({
				message: "There are no courses currently registered."
			})
		}
	})
	.catch(next)
})

//create a new course document
router.post('/', (req, res, next) => {
	Course.create(req.body)
	.then(course => {
		return res.status(201).json({
			message: "New course successfully registered.",
			data: course
		})
	})
	.catch(next)
})

//shows a particular course's details
router.get('/:courseId', (req, res, next) => {
	Course.findById(req.params.courseId)
	.then(course => {
		if(course !== null){
			return res.status(200).json({
				message: "Course retrieved successfully.",
				data: course
			})	
		}else{
			return res.status(404).json({
				message: `Course with id ${req.params.courseId} can not be found.`
			})
		}
	})
	.catch(next)
})

//updates a specific course
router.put('/:courseId', (req, res, next) => {
	Course.findByIdAndUpdate(req.params.courseId, req.body, {new: true})
	.then(course => {
		return res.status(200).json({
			message: `Course ${course.name} updated successfully.`,
			data: course
		})
	})
	.catch(next)
})

//stop offering a specific course
router.delete('/:courseId', (req, res, next) => {
	Course.findByIdAndUpdate(req.params.courseId, {onOffer: false}, {new: true})
	.then(course => {
		return res.status(200).json({
			message: `Course ${course.name} is no longer being offered.`,
			data: course
		})
	})
	.catch(next)
})

module.exports = router;