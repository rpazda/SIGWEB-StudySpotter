const ObjectId = require('mongoose').Types.ObjectId;
const Spots = require('../models/spots');

//  GET a spot (given a spot id)
function getSpot(req, res, next){

    console.log("Get 1 Spot");

    if(!req.params.id)
        return next();

    Spots.find(new ObjectId(req.params.id))
    .then(function(docs){
        res.send(docs);
    })
    .catch(function(err){
        res.status(422).send(err.message)
    });
}

function getAllSpots(req, res, next){

    console.log("Get all spots");

    Spots.find({})
    .then(function(docs){
        res.send(docs);
    })
    .catch(function(err){
        res.status(422).send(err.message)
    });
}

//  CREATE a spot
function createSpot(req, res, next){

    const newSpot = new Spots(req.body);

    newSpot.save()
    .then(function(doc){
        res.send({success: true, id: doc.id});
    })
    .catch(function(err){
        return res.status(422).send(err.message);
    })
}

//  UPDATE a spot (given the id and the updated data)
//...maybe
//  DELETE a spot

module.exports = {
    create: createSpot,
    getOne: getSpot,
    getAll: getAllSpots
}
