var path= require("path");
var router = require("express").Router();
var dataRoutes = require("./dataRoutes");


// Dataroutes
router.use("/data", dataRoutes);




module.exports = router;