const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
recordRoutes.route("/occupants").get(function (req, res) {
 let db_connect = dbo.getDb("quadratech");
 db_connect
   .collection("occupants")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
recordRoutes.route("/occupants/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("occupants")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
recordRoutes.route("/occupants/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   date: req.body.date,
   name: req.body.name,
   birthday: req.body.birthday,
   allergies: req.body.allergies,
   mentalHealth: req.body.mentalHealth,
   physicalHealth: req.body.physicalHealth,
   counselor: req.body.counselor,
 };
 db_connect.collection("occupants").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/occupants/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    date: req.body.date,
    name: req.body.name,
    birthday: req.body.birthday,
    allergies: req.body.allergies,
    mentalHealth: req.body.mentalHealth,
    physicalHealth: req.body.physicalHealth,
    counselor: req.body.counselor,
   },
 };
 db_connect
   .collection("occupants")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 occupant updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("occupants/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("occupants").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 occupant deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;