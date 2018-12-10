const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../model/model');

// Passport middleware to handle user registration
passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        // Create the user account
        const user = await UserModel.create({ email, password });
        // Send the user's info on to the next middleware function
        // The first argument is where an error would go. Since there isn't one, we're putting null.
        return done(null, user);
    }
    catch(error) {
        done(error);
    }
}));

// Passport middleware to handle user login
passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        // Use the email to find the associated user document
        const user = await UserModel.findOne({ email });
        if( !user ) {
            // Return an error message if the user isn't found
            return done(null, false, { message: 'User not found.' });
        }
        // 
        const validate = await user.isValidPassword(password);
        if( !validate ){
            // Return an error message if the password doesn't match the stored hash
            // TODO: You probably shouldn't tell the user specifically that the password was what they got wrong.
            return done(null, false, { message: 'Incorrect password.' });
        }
        // All good, send the user information to the next middleware function
        return done(null, user, { message: 'Congrats, successful login!'});
    }
    catch(error) {
        return done(error);
    }
}));

// The following code is used to verify the token sent by the user
const JWTstrategy = require('passport-jwt').Strategy;
// Code to extract the JWT send by the user
const ExtractJWT = require('passport-jwt').ExtractJwt;

// The code below is specifically what will verify that the token sent by the user is valid
passport.use(new JWTstrategy({
    // Secret that's used to sign the JWT
    // You really should be storing this as an environment variable
    secretOrKey: 'secret',
    // The user is expected to send their JWT as a query parament with the name 'secret_token'
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    try {
        // Send the user details on to the next middleware
        return done(null, token.user );
    }
    catch (error) {
        done(error)
    }
}));