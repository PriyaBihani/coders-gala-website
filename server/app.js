require('dotenv').config();
const cors = require('cors');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const morganMiddleware = require('./services/log/morganConfig');
const customLogger = require('./services/log/logger');

// routes

const authRoutes = require('./routes/auth'),
	specialityRoutes = require('./routes/speciality'),
	topicRoutes = require('./routes/topic'),
	articleRoutes = require('./routes/article');
videoRoutes = require('./routes/video');
const indexRouter = require('./routes/index');

// ================================================
//            SERVER CONFIGURATION
// ================================================
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use('/', indexRouter);
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
		customLogger.info('DB Connected');
	})
	.catch((err) => {
		console.log('ERROR iN DB CONNECTION', err);
	});

module.exports = app;
