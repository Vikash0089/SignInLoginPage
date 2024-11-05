const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err) => {
        if (err) {
            return res.status(500).send('Error during registration');
        }
        res.redirect('/login.html');
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send('Incorrect email or password');
        }

        const user = results[0];
        if (await bcrypt.compare(password, user.password)) {
            res.redirect('/home.html');
        } else {
            res.status(401).send('Incorrect email or password');
        }
    });
});

module.exports = router;
