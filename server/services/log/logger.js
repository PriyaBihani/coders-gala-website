const path = require('path');
const winston = require('winston');
const dotenv = require('dotenv');
dotenv.config();
require('winston-mongodb');

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

const level = () => {
	const env = process.env.NODE_ENV || 'development';
	const isDevelopment = env === 'development';
	return isDevelopment ? 'debug' : 'warn';
};

const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	winston.format.colorize({ all: true }),
	winston.format.printf(
		(info) => `${info.timestamp} ${info.level}: ${info.message}`
	)
);

const mongoDBTransportOptions = {
	db: process.env.MONGO_URI,
	options: {
		useUnifiedTopology: true,
	},
	level: 'info',
};

const transports = [
	new winston.transports.Console(),
	new winston.transports.File({
		filename: path.join(__dirname, './logFiles/error.log'),
		level: 'warn',
	}),
	new winston.transports.File({
		filename: path.join(__dirname, './logFiles/all.log'),
	}),
	new winston.transports.MongoDB(mongoDBTransportOptions),
];

const Logger = winston.createLogger({
	level: level(),
	levels,
	format,
	transports,
});

module.exports = Logger;
