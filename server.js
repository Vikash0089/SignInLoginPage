const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const db = require('./db');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
