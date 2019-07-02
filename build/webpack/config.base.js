/**
 * Created by VC on 2017/9/21.
 */

const
	path = require("path"),
	HtmlWebpackPlugin = require("html-webpack-plugin")
;

const
	kit = require("../kit.js")
;

const baseConfig = {

	mode: kit.isProduction() ? "production" : "development",

	entry: {
		app     : "./src/bootstrap.js",
		appAsync: "./src/bootstrap-async.js"
	},

	output: {
		filename: "[name]-[hash].js",
		path    : path.resolve(process.cwd(), "dist")
	},

	plugins: [

		...(() => {

			const baseHtmlWpPluginConfig = {

				template: "src/app/index.ejs",

				minify: {
					collapseWhitespace  : true,
					conservativeCollapse: true,
					preserveLineBreaks  : false,
					removeComments      : true
				},

				inject: true,

				scriptVConsole: kit.isProduction() ?
					`<script src="https://www.app8848.com/mc-sdk-demo/utils/vconsole.min.js"></script><script> new VConsole();</script>` :
					""

			};

			const syncConfig = kit.assignInsight(
				{},
				baseHtmlWpPluginConfig,
				{
					title             : "LT MC-JS-SDK Example",
					filename          : "index.html",
					excludeChunks     : [
						"appAsync"
					],

					scriptSdk: `<script src="https://gitee.com/lantu/mc-sdk-insight-public/raw/v2.0.1/mc-sdk.2.0.1.js?appkey=9f46f04c"></script>`

				})
			;

			const asyncConfig = kit.assignInsight(
				{},
				baseHtmlWpPluginConfig,
				{
					title             : "LT MC-JS-SDK Async Example",
					filename          : "index-async.html",
					excludeChunks     : [
						"app"
					],

					scriptSdk: ``

				});

			return [
				new HtmlWebpackPlugin(syncConfig),
				new HtmlWebpackPlugin(asyncConfig)
			];

		})()

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
								"@babel/preset-env",
								{
									targets: {
										safari: "10",
										chrome: "53"
									},
									modules : false
								}
							]
						],
						plugins: [
							["@babel/plugin-transform-runtime"]
						]
					}
				}
			},

			kit.assignInsight.identify("module/rules/css", {
				test: /\.css$/,
				use : [
					{
						loader: "style-loader"
					},
					{
						loader : "css-loader",
						options: {
							minimize: false
						}
					}
				]
			}),

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
