/**
 * Created by VC on 2017/9/21.
 */


const
	CleanWebpackPlugin = require("clean-webpack-plugin"),
	MiniCssExtractPlugin = require("mini-css-extract-plugin")
;

const
	kit = require("../kit.js")
;

const prodConfig = {

	output: {
		filename: "[name]-[chunkhash].prod.js"
	},

	optimization: {

		minimize: true,

		splitChunks: {

			cacheGroups: {

				vendors: {
					name    : "vendors",
					test    : /zepto/,
					chunks  : "all"
				},

				styles: {
					name  : "styles",
					test  : /\.css$/,
					chunks: "all"
				}

			}

		}


	},

	plugins: [

		new CleanWebpackPlugin([
			"dist"
		], {
			root: process.cwd()
		}),

		new MiniCssExtractPlugin({
			filename : "[name]-[contenthash].css"
		})

	],

	module: {
		rules: [

			{
				test: /\.(html)$/,
				use : {
					loader : "html-loader",
					options: {
						minimize          : true,
						removeComments    : true,
						collapseWhitespace: false
					}
				}
			},

			kit.assignInsight.identify("module/rules/css", {
				test   : /\.css$/,
				use    : [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader : "css-loader",
						options: {
							sourceMap: false,
							minimize : true
						}
					}
				]
			})

		]
	},

	devtool  : "none"

};

module.exports = prodConfig;
