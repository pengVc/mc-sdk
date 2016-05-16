/**
 * Created by Tan on 2015/7/30.
 */

(function(MCK, $){

	MCK.ready(MCReady);

	function MCReady(sdk){

		var
			$results = $(".j_results").hide(),
			$onElem = $(".s-bd")
		;

		$onElem

			.on("click", ".j_getApi", function(){

				$results.hide();

				// 调用  获取用户信息
				$(".j_results_message")
					.show()
					.html(sdk.h5.getApi().join("<br>"))
				;

			})

			.on("click", ".j_getUser", function(){

				$results.hide();

				// 调用  获取用户信息
				sdk.h5.call("getUserInfo", function(userData){
					// userData 为APP中传入的 用户数据

					$(".j_results_message")
						.show()
						.text(objectStyle(userData))
					;
				});

			})

			.on("click", ".j_tackPhoto", function(){

				$results.hide();

				// 调用设备相机
				sdk.h5.call("takePhoto", function(base64){

					$(".j_results_photo")
						.show()
						.attr("src", base64)
					;
				});

			})

			.on("click", ".j_pickPhoto", function(){

				$results.hide();

				// 调用设备相机
				sdk.h5.call("pickPhoto", function(base64){

					// userData 为APP中传入的 用户数据
					$(".j_results_photo")
						.show()
						.attr("src", base64)
					;
				});

			})

			.on("click", ".j_share", function(){
				$results.hide();

				sdk.h5.call("share", {
					title  : "我要分享",
					content: "分享内存",
					url    : "https://www.app8848.com/prime/",
					imgUrl : "http://mobilecampus.oss.aliyuncs.com/discover/MC_108/zsQ2zcUMz8kHy8fOy_.png"

				}, function(msg){

					$(".j_results_message")
						.show()
						.text(1 === msg.status ? "分享成功" : "分享失败")
					;
				});

			})

			.on("click", ".j_dev", function(){
				$results.hide();

				sdk.h5.call("devInfo", function(devInfo){

					$(".j_results_message")
						.show()
						.text(objectStyle(devInfo))
					;
				});

			})

		;

		var
			actionToolFlag = "tool"
		;

		$onElem

			.on("click", ".j_navbar_title", function(){
				$results.hide();
				sdk.h5.call("setNavBarTitle", "当前读秒" + (new Date).getSeconds());
			})

			.on("click", ".j_navbar_add", function(){
				$results.hide();
				sdk.h5.call("addNavBarMainBtn", {
					name   : "工具",
					flag   : actionToolFlag,
					iconSrc: "http://mobilecampus.oss.aliyuncs.com/discover/MC_136/zsQJzMzIyMnOyczMyw.png"
				}, function(){
					$(".j_results_message")
						.show()
						.text("你点击了 navigation _ " + (new Date).getTime())
					;
				});
			})

			.on("click", ".j_navbar_del", function(){
				$results.hide();
				sdk.h5.call("delNavBarMainBtn", actionToolFlag);
			})

			.on("click", ".j_navbar_clear", function(){
				$results.hide();
				sdk.h5.call("clearNavBarMainBtn");
			})

		;

	}

	function objectStyle(devInfo){
		return JSON.stringify.call(JSON, devInfo, "", 4);
	}

})(window.MCK, window.jQuery);
