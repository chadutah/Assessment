var dataRoutes = require("./dataRoutes");
var reasonRoutes = require("./reasonRoutes");
var router = require("express").Router();

// Dataroutes
router.use("/data", dataRoutes);
// router.use("/reason", reasonRoutes);

module.exports = router;