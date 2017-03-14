const ObjectId = require('mongoose').Types.ObjectId;
const Buildings = require('../models/buildings');

function getAllBuildings(req, res, next){
    Buildings.find({}, function(err, docs){

        if(err)
            return res.status(500).send(err.message);

        //Return all buildings
        return res.send(docs);
    });
}

function getOneBuilding(req, res, next){
    Buildings.findOne(new ObjectId(req.params.id))
    .then(function(doc){
        res.send(doc);
    })
    .catch(function(err){
        res.status(500).send(err.message);
    })
}

function createBuilding(req, res, next){
    const newBuilding = new Buildings(req.body);
    newBuilding.save()
    .then(function(doc){
        res.send(doc.name);
    })
    .catch(function(err){
        res.status(500).send(err.message);
    })

}

module.exports = {
    getAll: getAllBuildings,
    getOne: getOneBuilding,
    create: createBuilding
}
