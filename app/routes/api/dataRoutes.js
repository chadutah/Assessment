var router = require("express").Router();
var dataController = require("../../controllers/dataController");

// TEST ALL THE ROUTES


// /api/data/allData

router.route("/allData")
    .get(dataController.findAll)
    .post(dataController.create)
    .delete(dataController.remove);
router.route("/:communicationType")
    .get(dataController.findAllWhereType);
router.route("/:reason")
    .get(dataController.findAllWhereType);

router.route("/count")
    .get(dataController.findAllCount);

console.log("working");


module.exports = router;