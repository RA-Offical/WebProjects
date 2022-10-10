const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/js/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/bundle.js",
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "dist"),
		},
	},
	plugins: [
		new HTMLWebpackPlugin({
			filename: "index.html",
			template: "./src/index.html",
		}),
	],
};
