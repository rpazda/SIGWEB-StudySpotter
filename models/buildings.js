const mongoose = require('mongoose')

//Building Schema
const buildingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        lat: {type: Number},
        lon: {type: Number}
    }
});

//Post saving logger
buildingSchema.post('save', function(doc, next){
    console.log(`Building saved: ${doc.name}`);
    next();
})

//Create model class based on schema
const buildingModelClass = mongoose.model('buildings', buildingSchema);

//Export
module.exports = buildingModelClass;
