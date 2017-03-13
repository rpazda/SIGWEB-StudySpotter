const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    commentFor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'spots'
    },
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

commentsSchema.post('save', function(doc, next){
    console.log(`Comment by ${doc.createdByName} Saved`);
    next();
});


const commentsModelClass = mongoose.model('comments', commentsSchema);

module.exports = commentsModelClass;
