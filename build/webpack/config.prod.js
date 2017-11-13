/**
 * Created by VC on 2017/9/21.
 */


const
	webpack = require("webpack"),
	CleanWebpackPlugin = require("clean-webpack-plugin"),
	ExtractTextPlugin = require("extract-text-webpack-plugin")
;

const
	kit = require("../kit.js")
;

const prodConfig = {

	output: {
		filename: "[chunkhash].prod.js"
	},

	plugins: [

		new CleanWebpackPlugin([
			"dist"
		], {
			root: process.cwd()
		}),

		new webpack.optimize.UglifyJsPlugin({
			comments: false,
			mangle  : true,
			compress: {
				sequences    : true,  // join consecutive statemets with the “comma operator”
				properties   : true,  // optimize property access: a["foo"] → a.foo
				dead_code    : true,  // discard unreachable code
				drop_debugger: true,  // discard “debugger” statements
				unsafe       : false, // some unsafe optimizations (see below)
				conditionals : true,  // optimize if-s and conditional expressions
				comparisons  : true,  // optimize comparisons
				evaluate     : true,  // evaluate constant expressions
				booleans     : true,  // optimize boolean expressions
				loops        : true,  // optimize loops
				unused       : true,  // drop unused variables/functions
				hoist_funs   : true,  // hoist function declarations
				hoist_vars   : false, // hoist variable declarations
				if_return    : true,  // optimize if-s followed by return/continue
				join_vars    : true,  // join declarations
				cascade      : true,  // try to cascade `right` into `left` in sequences
				side_effects : true,  // drop side-effect-free statements
				drop_console : true,  // drop console
				warnings     : false  // warn about potentially dangerous optimizations/code
			}
		}),

		new ExtractTextPlugin({
			filename : "[contenthash].css"
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

			kit.assignInsight.identify("rules.css", {
				test   : /\.css$/,
				use    : ExtractTextPlugin.extract({
					fallback: "style-loader",
					use     : [
						{
							loader : "css-loader",
							options: {
								sourceMap: true,
								minimize : true
							}
						}
					]
				})

			})

		]
	}

};

module.exports = prodConfig;
