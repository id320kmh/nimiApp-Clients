var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var util = require('util');
var fs = require('fs');


router.post("/saveClient", function (req, res) {

    var client = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        gender: req.body.gender,
        age: req.body.age
    }

    var file = 'public/data/clientsList.json';

    var clientsList = jsonfile.readFileSync(file);
    clientsList.push(client);

    jsonfile.writeFile(file, clientsList, function (err) {
        console.error(err);
    });

    res.end();
});



router.post("/applyClient", function (req, res) {
    var client = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        gender: req.body.gender,
        age: req.body.age
    }

    var numApply = parseInt(req.body.num);

    var file = 'public/data/clientsList.json';

    var clientsList = jsonfile.readFileSync(file);
    clientsList[numApply] = client;

    jsonfile.writeFile(file, clientsList, function (err) {
        console.error(err);
    });

    res.end();

});


router.post("/delClient", function (req, res) {
    var delClientNum = parseInt(req.body.num);

    var file = 'public/data/clientsList.json';

    var clientsList = jsonfile.readFileSync(file);
    clientsList.splice(delClientNum,1);

    jsonfile.writeFile(file, clientsList, function (err) {
        console.error(err);
    });

    res.end();

});





module.exports = router;
