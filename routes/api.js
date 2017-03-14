const router = require('express').Router();

const SpotController = require('../controllers/spots');
const BuildingController = require('../controllers/buildings');

//Spots API endpoint
router.post('/spots', SpotController.create);
router.get('/spots/:id', SpotController.getOne);
router.get('/spots', SpotController.getAll);

//Buildings API endpoint
router.get('/buildings/:id', BuildingController.getOne);
router.get('/buildings', BuildingController.getAll);
router.post('/buildings', BuildingController.create);

module.exports = router;
