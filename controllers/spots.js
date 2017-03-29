const ObjectId = require('mongoose').Types.ObjectId;
const Spots = require('../models/spots');

//  GET a spot (given a spot id)
function getSpot(req, res, next){

    if(!req.params.id)
        return next();

    Spots.findOne(new ObjectId(req.params.id))
    .then(function(docs){
        res.send(docs);
    })
    .catch(function(err){
        res.status(422).send({error:err.message})
    });
}

function getAllSpots(req, res, next){

    Spots.find({})
    .then(function(docs){
        res.send(docs);
    })
    .catch(function(err){
        res.status(422).send({error:err.message})
    });
}

//  CREATE a spot
function createSpot(req, res, next){

    const newSpot = new Spots(req.body);

    newSpot.save()
    .then(function(spot){
        res.json({success: true, id: spot.id});
    })
    .catch(function(err){
        return res.status(422).send({error:err.message});
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
