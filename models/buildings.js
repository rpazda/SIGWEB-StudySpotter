const mongoose = require('mongoose')

//Building Schema
const buildingSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

//Post saving logger
buildingSchema.post('save', function(doc){
    console.log(`Building saved: ${doc.name}`);
    next();
})

//Create model class based on schema
const buildingModelClass = mongoose.model('buildings', buildingSchema);

//Export
module.exports = buildingModelClass;
