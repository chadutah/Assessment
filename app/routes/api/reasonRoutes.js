var router = require("express").Router();
var reasonController = require("../../controllers/reasonController");

router.route("/:reason")
    .get(reasonController.findAllWhereReason);