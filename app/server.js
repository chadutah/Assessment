var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var routes = require("./routes");



// listen on port 3001
var PORT = process.env.PORT || 3000;

// Define middleware here
// commented out from JJ		
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '800kb'}));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

// Sessions
app.use(
	session({
		secret: 'chad-utah', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		resave: false, //required
        saveUninitialized: false //required
	})
)

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/chad");




// Start the API server
app.listen(PORT, function() {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});