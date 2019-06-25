/**
 * Created by VC on 2017/9/21.
 */

const
	webpack = require("webpack")
;

const
	kit = require("../kit")
;

const
	baseConfig = require("./config.base"),
	devConfig = require("./config.dev"),
	prodConfig = require("./config.prod")
;

Flow.build = build;
Flow.dev = dev;


/**
 * 产品级别构建
 */
function build(){

	const webpackConfig = refineConfig();

	webpack(webpackConfig, (err, stats) => {

		if(err || stats.hasErrors()){
			// 在这里处理错误
		}

		// 处理完成
		console.log(stats.toString({
			chunks: false,  // 使构建过程更静默无输出
			colors: true    // 在控制台展示颜色
		}));
	});

}

function refineConfig(){

	const isProduction = kit.isProduction();
	const webpackConfig = kit.assignInsight(baseConfig, isProduction ? prodConfig : devConfig);

	console.log(`构建类型: ${isProduction ? "产品级" : "开发级"}`);

	return webpackConfig;

}

/**
 * 开发(调试)级别构建
 */
function dev(){

	const
		WebpackDevServer = require("webpack-dev-server"),
		opn = require("opn")
	;

	const webpackConfig = refineConfig();
	const devServerConfig = Object.assign({
		host        : "localhost",
		port        : 8080,
		stats       : {
			colors: true
		}
	}, webpackConfig.devServer);

	WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerConfig);

	const
		compiler = webpack(webpackConfig),
		server = new WebpackDevServer(compiler, devServerConfig)
	;

	server.listen(devServerConfig.port, devServerConfig.host, () =>{

		let protocol = devServerConfig.https ? "https" : "http";

		console.log(`开发服务已启动: ${protocol}://${devServerConfig.host}:${devServerConfig.port}`);

		if(devServerConfig.open){

			opn(`${protocol}://${devServerConfig.host}:${devServerConfig.port}`).catch(() =>{
				console.log(`无法打开浏览器. 如果在 headless 环境运行, 请加上 open 标识 `);
			});

		}

	});

}

function Flow(){

}

module.exports = Flow;
