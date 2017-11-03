/**
 * Created by VC on 2017/9/21.
 */

const
	path = require("path"),
	webpack = require("webpack"),
	HtmlWebpackPlugin = require("html-webpack-plugin")
;

const baseConfig = {

	entry: {
		common: [
			"zepto",
			"bootstrap/dist/css/bootstrap.min.css"
		],
		app: "./index.js"
	},

	output: {
		filename: "[name]-[hash].js",
		path    : path.resolve(process.cwd(), "dist")
	},

	plugins: [

		new webpack.optimize.CommonsChunkPlugin({
			name: "common"
		}),

		new HtmlWebpackPlugin({
			template: "src/app/index.html",
			filename: "index.html",
			minify  : {
				collapseWhitespace  : true,
				conservativeCollapse: true,
				preserveLineBreaks  : false,
				removeComments      : true
			},
			inject  : true
		})

	],

	module: {

		rules: [

			{
				test   : /\.js$/,
				exclude: /node_modules/,
				use    : {
					loader : "babel-loader",
					options: {
						presets: [
							[
								"env",
								{
									browsers: ["last 2 versions"],
									modules : false
								}
							]
						],
						plugins: [
							["transform-runtime"]
						]
					}
				}
			},

			{
				test: /\.css$/,
				use : [
					{
						loader: "style-loader"
					},
					{
						loader : "css-loader",
						options: {
						}
					}
				]
			},

			{
				test: /\.(ttf|woff|woff2|eot|svg)$/,
				use: [
					{
						loader: "file-loader",
						options: {}
					}
				]
			},

			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {}
					}
				]
			},

			{
				test: require.resolve("zepto"),
				use : [
					{
						loader : "exports-loader",
						options: "window.Zepto"
					},
					{
						loader: "script-loader"
					}
				]
			}

		]

	},

	devtool  : "source-map"

};

module.exports = baseConfig;
