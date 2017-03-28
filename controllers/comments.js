const ObjectId = require('mongoose').Types.ObjectId;
const Comments = require('../models/comments');
const Spots = require('../models/spots');

//Get all comments from an indicated spot
function getCommentsFromSpot(req, res){

    let spotId;

    //Make sure that the id supplied is valid
    if(ObjectId.isValid(req.params.spotId))
        spotId = new ObjectId(req.params.spotId);
    else
        return res.status(400).send({error:"ID for spot is not valid"});

    Spots.findOne(spotId)
    .then(function(spot){
        //Make sure the Spot does exist
        if(!spot)
            return res.status(422).send({error:"No spot found for the spotId sent"});

        //Query all the comments from spotId
        Comments.find({commentFor: spotId})
        .then(function(comments){
            res.send(comments);
        })
        .catch(function(err){
            console.log(err);
            res.status(422).send({error: err.message});
        });

    }).catch(function(err){
        console.log(err);
        res.status(422).send({error: err.message});
    });
}

//Get a single  specified comment from an indicated spot
function getCommentFromSpot(req, res){

    let spotId;

    //Make sure that the id supplied is valid
    if(ObjectId.isValid(req.params.spotId))
        spotId = new ObjectId(req.params.spotId);
    else
        return res.status(400).send({error:"ID for spot is not valid"});

    Spots.findOne(spotId)
    .then(function(spot){
        //Make sure the Spot does exist
        if(!spot)
            return res.status(400).send({error:"No spot found for the spotId sent"});

        let commentId;
        //Make sure the comment id provided is valid
        if(ObjectId.isValid(req.params.commentId))
            commentId = req.params.commentId;
        else
            return res.status(400).send({error:"ID for comment is not valid"});

        //Query for the comment
        Comments.findOne(commentId)
        .then(function(comments){
            res.send(comments);
        })
        .catch(function(err){
            console.log(err);
            res.status(422).send({error: err.message});
        });

    }).catch(function(err){
        console.log(err);
        res.status(422).send({error: err.message});
    });
}

//Create a comment for the indicated spot
function postComment(req, res){

    let spotId;

    //Make sure that the id supplied is valid
    if(ObjectId.isValid(req.params.spotId))
        spotId = new ObjectId(req.params.spotId);
    else
        return res.status(400).send({error:"ID for spot is not valid"});

    //Find the spot given the ID
    Spots.findOne(spotId)
    .then(function(spot){

        //Make sure the Spot does exist
        if(!spot)
            return res.status(400).send({error:"No spot found for the spotId sent"});

        //Once we make sure the spot exists, create the comment
        let newComment = new Comments(req.body);

        //Set the commentFor field
        newComment.commentFor = spotId;

        //Save the new comment
        newComment.save()
        .then(function(comment){
            res.json({success: true, comment: comment});
        })
        .catch(function(err){
            console.log(err);
            res.status(422).send({error: err.message});
        });

    }).catch(function(err){
        console.log(err);
        res.status(422).send({error: err.message});
    });
}


module.exports = {
    getFromSpot: getCommentsFromSpot,
    getComment: getCommentFromSpot,
    create: postComment
}
