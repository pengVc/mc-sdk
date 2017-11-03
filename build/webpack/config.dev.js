/**
 * Created by VC on 2017/9/21.
 */

const
	path = require("path"),
	webpack = require("webpack")
;

const devConfig = {

	output: {
		filename: "[name]-[hash].dev.js"
	},

	devServer: {
		contentBase     : path.join(process.cwd(), "dist"),
		watchContentBase: false,
		compress        : true,
		https           : !true,
		port            : 8055,
		open            : true,
		hotOnly         : true
	},

	module: {
		rules: [
			{
				test: /\.(html)$/,
				use: {
					loader: "html-loader"
				}
			}
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]

};

module.exports = devConfig;
