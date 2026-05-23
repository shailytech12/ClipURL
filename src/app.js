const express = require('express');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

app.use(express.json());

app.use('/api/url', urlRoutes);

app.get('/', (req, res) => {
    res.send('Scalable URL Shortener API Running');
});

module.exports = app;