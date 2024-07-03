const express = require('express');
const router = express.Router();

// TODO: Implement authentication routes

router.post('login', (req, res) => {

    // placeholder for login logic
    res.json({ message: 'Login endpoint' });
});

module.exports = router;
