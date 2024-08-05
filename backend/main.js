const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp');
const cors = require('cors');

const authRoute = require('./routes/authRoute');
const commentRoutes = require('./routes/commentRoutes');
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
// const tagRoute = require('./routes/tagRoute');

const globalErrorHandler = require('./controllers/globalErrorHandler');

const app = express();


app.use(helmet());

// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: 'GET,POST,PATCH,DELETE'
// }))

app.use(cors())

app.use(morgan('dev'));


// const limiter = rateLimit({
//     max: 100,
//     windowMs: 60 * 60 * 1000, // in millisecond
//     message: 'Too many request from this IP, please try again in few hours'
// })

// app.use('/api', limiter);

// body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));

app.use(mongoSanitize());
app.use(xss());

app.use(hpp()); // we can whitelist some fields if we want to allow multiple fields with same name

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/posts', postRoute);
// app.use('/api/v1/tags', tagRoute);

app.use(globalErrorHandler)

module.exports = app;