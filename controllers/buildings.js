const ObjectId = require('mongoose').Types.ObjectId;
const Buildings = require('../models/buildings');

function getAllBuildings(req, res){
    Buildings.find({})
    .then(function(docs){
        res.send(docs);
    })
    .catch(function(err){
        console.log(err);
        res.status(422).send({error: err.message});
    });
}

function getOneBuilding(req, res){
    Buildings.findOne(new ObjectId(req.params.id))
    .then(function(doc){
        res.send(doc);
    })
    .catch(function(err){
        console.log(err);
        res.status(422).send({error: err.message});
    })
}

function createBuilding(req, res){
    const newBuilding = new Buildings(req.body);
    newBuilding.save()
    .then(function(building){
        res.json({success:true, id:building.id});
    })
    .catch(function(err){
        console.log(err);
        res.status(422).send({error: err.message});
    })

}

module.exports = {
    getAll: getAllBuildings,
    getOne: getOneBuilding,
    create: createBuilding
}
