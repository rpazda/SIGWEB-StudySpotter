const jwt = require('jwt-simple');

const Users = require('../models/users');
const config = require('../config');

//Creates a JWT
//Takes in a User model
function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({
        sub: user._id,
        iat: timestamp
    }, config.secretString);
}

//Signs up the user for a new account
function SignUp(req, res, next){

    const userCreds = {
        email: req.body.email,
        password: req.body.password
    }

    //Username and password must exist
    if(!userCreds.email || !userCreds.password){
        return res.status(422).send({ error: 'Email and Password required'});
    }

    //See if email is already being used
    Users.findOne({ email: userCreds.email })
    .then(function(user){

        //If user does exist, return Error
        if(user)
            return res.status(422).send({ error: 'Email is in use'});

        //Else if email is true, create and save user error
        const newUser = new Users(userCreds);

        //Save the user
        newUser.save() //Nested Promise
        .then(function(doc){
            //Respond saying all OK
            res.json({
                success: true,
                token: tokenForUser(doc),
                email: doc.email
            });
        })
        .catch(function(err){
            return next(err);
        });
    })
    .catch(function(err){
        return next(err);
    });
}

module.exports = {
    signup: SignUp
}
