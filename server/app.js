require('dotenv').config();
var cors = require('cors');
var path = require('path');

var logger = require('morgan');
var express = require('express');
var mongoose = require('mongoose');

// routes

let authRoutes = require('./routes/auth'),
  specialityRoutes = require('./routes/speciality'),
  topicRoutes = require('./routes/topic'),
  articleRoutes = require('./routes/article');
  videoRoutes = require('./routes/video')
var indexRouter = require('./routes/index');

// ================================================
//            SERVER CONFIGURATION
// ================================================
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/speciality', specialityRoutes);
app.use('/api/topic', topicRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/video', videoRoutes);
app.use('/', indexRouter);

// mongooseConnect
mongoose
  .connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.log('ERROR iN DB CONNECTION', err);
  });

module.exports = app;
