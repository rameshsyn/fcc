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
/*						"react",
*/						"es2015"
					]
				}
			},
			{
				test: /\.(css|scss)$/,
				loaders: [
					"style",
					"css",
					"sass"
				]
			}

		]
	}
}

module.exports = config;