const router = require('express').Router();

const SpotController = require('../controllers/spots');
const BuildingController = require('../controllers/buildings');

//Spots API endpoint
router.post('/spots', SpotController.create);
router.get('/spots/:id', function(req, res, next){
    if(req.params.id)
        SpotController.getOne(req, res, next);
    else
        SpotController.getAll(req, res, next);
});

//Buildings API endpoint
router.get('/buildings', BuildingController.getAll);
router.post('/buildings', BuildingController.create);

module.exports = router;
