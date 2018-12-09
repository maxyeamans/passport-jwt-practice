const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
    res.json({
        message: 'Sign up successful',
        user: req.user
    });
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            // If there's an error with logging in or user isn't found, return an error,
            // then move on to the next middleware function
            if( err || !user ) {
                const error = new Error('Something happened');
                return next(error);
            }
            // Log in the user
            // The second argument makes it so that this route needs to be authenticated every time.
            req.login( user, { session: false }, async (error) => {
                if (error) {
                    return next(error);
                }
                // The body object is what's going to be stored in the JWT
                const body = {
                    _id: user._id,
                    email: user.email
                };
                // Sign the JWT and populate it with the info from above.
                // The second argument of the sign function should be replaced with an environment variable.
                const token = jwt.sign({ user: body }, 'secret');
                // Send the JWT to the user
                return res.json({ token });
            });
        }
        catch (error) {
            return next(error);
        }
    }) (req, res, next);
});

module.exports = router;