var db = require("../models");

// Defining methods for the dataController
module.exports = {
    findAll: function (req, res) {
        db.Data
            .find(req.query)
            .sort({
                date: -1
            })
            .then(dbModel => {
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Data
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Data.remove({})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findAllWhereType: function(req, res) {
        if (req.params.communicationType === "email" || req.params.communicationType === "text" || req.params.communicationType === "call") {
            db.Data.find({"communication_type": req.params.communicationType }).countDocuments()
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        } else {
            db.Data.find({"reason": req.params.communicationType }).countDocuments()
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));  
        };
    },
    findAllCount: function(req, res) {
        db.Data.find({}).countDocuments()
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};
