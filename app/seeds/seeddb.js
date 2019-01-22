var mongoose = require("mongoose");
var db = require('../models');
var Schema = mongoose.Schema;
mongoose.promise = Promise


// connect and create database photoOps
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/chad");

const cseed = [
    { 
      // person_id
      person_id: 1,
      // date user sent communication
      communication_date: new Date(Date.now()),
      communication_type:"Email",
      //reason for communication,
      reason: "payments",
      // inbound or outbound 
      direction: "String"
    }
];

db.Data
    .remove({})
    .then(() => db.Data.collection.insertMany(cseed))
    .then(data => {
        console.log(data.insertedIds.length + "records inserted");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
		
