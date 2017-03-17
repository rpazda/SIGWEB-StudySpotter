const router = require('express').Router();

const SpotController = require('../controllers/spots');
const BuildingController = require('../controllers/buildings');
const CommentsController = require('../controllers/comments');

//Spots API endpoint
//Create a Spot
router.post('/spots', SpotController.create);
//Get a spot
router.get('/spots/:id', SpotController.getOne);
//Get all spots
router.get('/spots', SpotController.getAll);

//Comments API
// think of this as a sub-functionality of the Spots API
//Get all comments from a spot
router.get('/spots/:spotId/comments', CommentsController.getFromSpot);
//Get a specific comment from a spot
router.get('/spots/:spotId/comments/:commentId', CommentsController.getComment);
//Create a comment for spot
router.post('/spots/:spotId/comments', CommentsController.create);

//Buildings API endpoint
//Get a building
router.get('/buildings/:id', BuildingController.getOne);
//Get all buildings
router.get('/buildings', BuildingController.getAll);
//Create a building (Only Admin will be able)
router.post('/buildings', BuildingController.create);

module.exports = router;
