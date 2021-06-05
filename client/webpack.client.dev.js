const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: './src/client.js',
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'build'),
	},
	devServer: {
		contentBase: './build',
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: true,
			publicPath: '/',
			template: path.resolve(__dirname, 'public', 'index.html'),
			favicon: './public/favicon.ico',
		}),
	],
};

module.exports = merge(commonConfig, config);
