const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Spots schema, helper functions, and hooks
const spotsSchema = new mongoose.Schema({

    name: {type: String, required: true, trim: true},
    building: {type: String, trim: true},
    location: {
        lat: {type: Number, required: true},
        lon: {type: Number, required: true}
    },
    postedBy: {type: mongoose.Schema.Types.ObjectId }, //To get the actual user
    postedByName: {type: String, required: true},   //If user is not defined
    isIndoor: {type: Boolean, required: true},
    soundLevel: {type: String, required: true, enum: ["Quiet", "Moderate", "Chatty", "Noisy"]},
    outletsCount: {type: String, required: true, enum: ["None", "1-3", "4-7", "8-10", ">10"]},
    seatAvailability: {type: String, required: true, enum: ["Sparce", "Sometimes", "Usually", "Always"]},
    seatCount: {type: String, required: true, enum: ["1-2", "3-4", "5-6", "7-8", ">8"]},
    coffeeNearby: {type: Boolean, required: true},
    description: {type: String, required: true, trim: true},

});

//Middleware error checking
spotsSchema.pre('save', function(next){
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
spotsSchema.post('save', function(error, doc, next){

    var errorMessage = `${error.name} error on inserting document to Spots collection:\n\n`;

    for(errorIndex in error.errors){
        if(error.errors.hasOwnProperty(errorIndex)){
            errorMessage += `${error.errors[errorIndex].message}\n`;
        }
    }

    next(new Error(errorMessage));
});

spotsSchema.post('save', function(doc, next){
    console.log("Record Saved");
    next();
});


//Create model class
const SpotsModelClass = mongoose.model('spots', spotsSchema);

//Export the model
module.exports = SpotsModelClass;
