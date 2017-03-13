const express = require('express');

const router = express.Router();

const SpotController = require('../controllers/spots');

//Spots API endpoint
router.post('/spots', SpotController.create);
router.get('/spots/:id', SpotController.getOne);
router.get('/spots', SpotController.getAll);


module.exports = router;
