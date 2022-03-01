const express = require('express');

const mainRouter = require('./routes/main');

const app = express();

app.use(express.static('public'));

app.use('/', mainRouter);

app.listen(3000);