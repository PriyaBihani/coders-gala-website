const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
	mode: 'production',
	stats: {
		colors: false,
		hash: true,
		timings: true,
		assets: true,
		chunks: true,
		chunkModules: true,
		modules: true,
		children: true,
	},
	entry: './src/client.js',
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'build'),
	},
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: true,
			publicPath: '/',
			template: path.resolve(__dirname, 'public', 'index.html'),
			favicon: './public/favicon.ico',
		}),
		new BundleAnalyzerPlugin(),
		new CompressionPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
	],
};

module.exports = merge(commonConfig, config);
