const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Spots schema, helper functions, and hooks
const spotsSchema = new mongoose.Schema({
    strict: true
    name: {type: String, required: true, trim: true},
    building: {type: String, trim: true},
    location: {
        lat: {type: Number, required: true},
        lon: {type: Number, required: true}
    },
    isIndoor: {type: Boolean, required: true},
    soundLevel: {type: String, required: true, enum: ["Quiet", "Moderate", "Chatty", "Noisy"]},
    outletsCount: {type: String, required: true, enum: ["None", "1-3", "4-7", "8-10", ">10"]},
    seatAvailability: {type: String, required: true, enum: ["Sparce", "Sometimes", "Usually", "Always"]},
    seatCount: {type: String, required: true, enum: ["1-2", "3-4", "5-6", "7-8", ">8"]},
    coffeeNearby: {type: Boolean, required: true},
    description: {type: String, required: true, trim: true}
});

//Middleware error checking
spotsSchema.pre(function(next){
    // 'this' is the spot being saved.
    // Passing an error to next() will cancel the insert
    const spot = this;
    if(spot.name === "Sammy's Home"){
        next(new Error("Place cannot be named \"Sammy's Home\""));
    } else {
        next();
    }
});

//Middleware for logging saves
spotsSchema.pre(function(next){
    const spot = this;
    console.log("Saving a spot of name: " + spot.name);
    next();
})

//Create model class
const SpotsModelClass = mongoose.model('spots', spotsSchema);

//Export the model
module.exports = SpotsModelClass;
