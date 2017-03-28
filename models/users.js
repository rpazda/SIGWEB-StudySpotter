const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

//Define the model
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "User"]
    }
});

//On save Hook: Encrypt password.
userSchema.pre('save', function(next){

    const user = this;

    //Generate salt
    bcrypt.genSalt(10, function(err, salt){
        if(err)
            return next(err);

        //Hash (encrypt) password using salt
        bcrypt.hash(user.password, salt, null, function(error, hash){
            if(err)
                return next(err);

            //Overwrite password to newly encrypted password
            user.password = hash;
            next();
        });
    });
});

//Create model class
const ModelClass = mongoose.model('users', userSchema);

//Export the model
module.exports = ModelClass;
