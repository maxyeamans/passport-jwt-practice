const express = require('express');

const router = express.Router();

// The route below will only be accessible with a valid JWT
router.get('/profile', (req, res, next) => {
    res.json({
        message: "You have successfully accessed a secure route.",
        user: req.user,
        token: req.query.secret_token
    });
});

module.exports = router;