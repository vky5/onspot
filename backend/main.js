const express = require('express');
const morgan = require('morgan')

const authRoute = require('./routes/authRoute');


const globalErrorHandler = require('./controllers/globalErrorHandler');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1/auth', authRoute);


app.use(globalErrorHandler)

module.exports = app;