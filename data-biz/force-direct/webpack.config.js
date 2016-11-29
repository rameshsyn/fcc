var config = {
	entry: './src/js/main.js',
	output: {
		filename: "bundle.js",
		path: __dirname
	},
	devServer: {
		inline: true,
		port: 3000
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel",
				query: {
					presets: [
						"es2015"
					]
				}
			},
			{
				test: /(\.s?css)$/,
				loaders: [
					"style",
					"css",
					"sass"
				]
			},
			{
				test: /\.png$/,
				loader: 'file-loader'
			}

		]
	}
}

module.exports = config;