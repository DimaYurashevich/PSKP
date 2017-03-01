const express = require('express');
const Sequelize = require('sequelize');

const config = require('./config');

const dbcontext = require('./context/db')(Sequelize, config);
const app = express();

app.use(express.static('public'));

dbcontext.sequelize.sync()
    .then(() => {
        app.listen(3000, () => console.log('Running'));
    })
    .catch((err) => console.log(err));