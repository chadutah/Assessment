var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.promise = Promise


// connect and create database photoOps
mongoose.connect("mongodb://localhost/chad");

var eachUser = new Schema(
    { 
      // person_id
      person_id: Number,
      // date user sent communication
      communication_date: { type: Date, default: Date.now },
      //text email call 
      communication_type: String,
      //reason for communication,
      reason: String,
      // status = alive 1, dead 0
      // inbound or outbound 
      direction: String,
    });

		


    var Data = mongoose.model("Data", eachUser);

    module.exports = Data;