var db = require("../models");




// Defining methods for the dataController
module.exports = {

    testMe: function (req, res) {
        db.Data
            .find(req.query)
            .sort({
                date: -1
            })
            .select({
                "person_id": 1
            })
            .then(dbModel => {
                willIWork(dbModel);
                console.log(result);
                // return result;
                res.json(result);
            })

            // .then(dbModel => {
            //     console.log(dbModel);
            //     res.json(dbModel)
            // })
            .catch(err => res.status(422).json(err));



    },



    findAll: function (req, res) {
        db.Data
            .find(req.query)
            .sort({
                date: -1
            })
            .then(dbModel => {
                console.log(dbModel);
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        // console.log("create hit")
        db.Data
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Data.deleteMany({})
        .catch(err => res.status(422).json(err));
    },

};
