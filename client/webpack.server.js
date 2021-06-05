const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const nodeExternals = require('webpack-node-externals');

const config = {
	target: 'node',
	mode: 'production',
	entry: './server.js',
	externals: [nodeExternals()],
};

module.exports = merge(commonConfig, config);
