var db = require("../models");

module.exports = {
    findAllWhereReason: function(req, res) {
        db.Data.find({"reason": req.params.reason }).countDocuments()
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}