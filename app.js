const express = require('express');

const app = express();

const port = 3000;

const mongoose = require('mongoose');

//use mongoose's connect method to connect to a local mongodb instance
//by default, local mongodb uses the address 127.0.0.1:27017
mongoose.connect('mongodb+srv://admin:BrdyBOYktXyW51Tf@learnmongo-9fdce.gcp.mongodb.net/expressbooking?retryWrites=true&w=majority', {useNewUrlParser: true});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("We're connected to our cloud database."));

//used in parsing json request bodies
app.use(express.json());

//used in parsing form data
app.use(express.urlencoded({extended:true}))

//require the router instance that was exported from /routes/api.js
const locationRouter = require('./routes/location');

//whenever a request is received on the /locations endpoint, use the routes in locationRouter
app.use('/locations', locationRouter);

//error-handling middleware
//catches an err object with message property from any of the routes in the preceding router
//this will be passed in to our function as an argument via the err parameter 
app.use((err, req, res, next) => {
	//http status code 422 = unprocessable entity
	return res.status(422).json({
		//return the message property of the caught error object
		data: err.message 
	})
})

app.listen(port, () => {
	console.log(`Listening on port: ${port}`)
})