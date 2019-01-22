var router = require("express").Router();
var dataController = require("../../controllers/dataController");

// TEST ALL THE ROUTES


// /api/data/allData

router.route("/allData")
    .get(dataController.findAll)
    .post(dataController.create)
    .delete(dataController.remove);
console.log("working");


module.exports = router;