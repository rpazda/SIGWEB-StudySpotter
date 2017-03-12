const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    commentFor: {type: mongoose.Schema.Types.ObjectId, required: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId},
    createdByName: {type: String, required: true},
    comment: {type: String, required: true},
    createdOn: {type: Date, required: true}
});

//Set the createdOn and first lastUpdatedOn fields
commentsSchema.pre('save', function(next){
    this.createdOn = new Date();
    next();
});


const commentsModelClass = mongoose.model('comments', commentsSchema);

module.exports = commentsModelClass;
