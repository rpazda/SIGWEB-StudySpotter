const mongoose = require('mongoose');

//Schema for comments
const commentsSchema = new mongoose.Schema({
    //Mapped to Spots
    commentFor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'spots'
    },
    //Mapped to Users
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    createdByName: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        trim: true,
        required: true
    },
    createdOn: {
        type: Date,
        required: true
    }
});

//Set the createdOn and first lastUpdatedOn fields
commentsSchema.pre('save', function(next){
    this.createdOn = new Date();
    next();
});

//Post save logger
commentsSchema.post('save', function(doc, next){
    console.log(`Comment by ${doc.createdByName} Saved`);
    next();
});


//Create model class and export
const commentsModelClass = mongoose.model('comments', commentsSchema);
module.exports = commentsModelClass;
