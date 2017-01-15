const { resolve } = require('path');
const config = {
	entry: './src/js',
	devtool: 'eval',
	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: resolve(__dirname, 'dist')
	},
	devServer: {
		inline: true,
		port: 3000,
		contentBase: resolve(__dirname, 'dist')
	},
	module: {
		loaders: [
		{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},
		{
			test: /(\.s?css)$/,
			loaders: [
				'style-loader',
				'css-loader',
				'sass-loader'
			]
		},
		{
			test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?name=/fonts/[hash].[ext]&limit=10000&mimetype=application/font-woff'
		},
		{
			test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?name=/fonts/[hash].[ext]&limit=10000&mimetype=application/font-woff'
		},
		{
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?name=/fonts/[hash].[ext]&limit=10000&mimetype=application/octet-stream'
		},
		{
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file?publicPath=./&name=/fonts/[hash].[ext]'
		},
		{
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?name=/fonts/[hash].[ext]&limit=10000&mimetype=image/svg+xml'
		}
		]
	}
};

module.exports = config;