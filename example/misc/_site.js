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

			.on("click", ".j_getSignUser", function(){

				$results.hide();

				// 调用  获取用户信息
				sdk.h5.call("getUserInfo", { isStrict: true }, function(userData){
					// userData 为APP中传入的 用户数据

					$(".j_results_message")
						.show()
						.text(objectStyle(userData))
					;
				});

			})

			.on("click", ".j_getUserToken", function () {
				$results.hide();

				// 调用  获取用户信息
				sdk.h5.call("getUserToken", function(userToken){
					// userData 为APP中传入的 用户数据

					$(".j_results_message")
						.show()
						.text(objectStyle(userToken))
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
					imgSrc : "https://mobilecampus.oss.aliyuncs.com/discover/MC_136/MTrPNzrLMzvzNzMOM_.png"

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

			.on("click", ".j_show_loading", function() {
				$results.hide();

				sdk.h5.call("progressBar.show");
			})

			.on("click", ".j_hide_loading", function() {
				$results.hide();

				sdk.h5.call("progressBar.hide");
			})

			.on("click", ".j_view_full_img", function() {
				$results.hide();

				sdk.h5.call("viewFullImg", "http://mobilecampus.oss.aliyuncs.com/discovery/lantu/zsvKzMz2ODgGzjbyzA.png");
			})

		;

		var
			actionToolFlag = "tool",
			actionTitleFlag = "toolTittle",
			actionTitleTextFlag = "toolTextTittle"
		;

		$onElem

			.on("click", ".j_navbar_title", function(){
				$results.hide();
				sdk.h5.call("setNavBarTitle", "当前读秒" + (new Date).getSeconds());
			})

			.on("click", ".j_navbar_titleList_add", function(){
				$results.hide();

				sdk.h5.call("clearNavBarTitleList");

				Array.apply(null, Array(5)).forEach(function(item, index){

					sdk.h5.call("addNavBarTitleList", {
						name   : "点我-" + index,
						flag   : actionTitleFlag
					}, function(index){
						$(".j_results_message")
							.show()
							.text("你点击了 [" + "点我做什么-" + index + "]")
						;
					});
				});

			})

			.on("click", ".j_navbar_titleList_del", function(){
				$results.hide();
				sdk.h5.call("delNavBarTitleList", actionTitleFlag);
			})

			.on("click", ".j_navbar_titleList_clear", function(){
				$results.hide();
				sdk.h5.call("clearNavBarTitleList");
				sdk.h5.call("setNavBarTitle", "MC SDK");
			})
		;

		$onElem
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

			.on("click", ".j_navbar_text_add", function(){
				$results.hide();
				sdk.h5.call("addNavBarMainBtn", {
					name   : "文字",
					flag   : actionTitleTextFlag,
					text   : "两字"
				}, function(){
					$(".j_results_message")
						.show()
						.text("你点击了 两字 _ " + (new Date).getTime())
					;
				});
			})

			.on("click", ".j_navbar_text_del", function(){
				$results.hide();
				sdk.h5.call("delNavBarMainBtn", actionTitleTextFlag);
			})


			.on("click", ".j_navbar_clear", function(){
				$results.hide();
				sdk.h5.call("clearNavBarMainBtn");
			})

		;

		$onElem

			.on("click", ".j_navbar_sdkCallTel", function(){
				$results.hide();
				sdk.h5.call("callDial", 13800138000);
			})

			.on("click", ".j_scan", function() {
				$results.hide();
				sdk.h5.call("scan", function(msg) {

					var
						result,
						error
					;

					if (msg.status === 1) {
						result = msg.result;
						$(".j_results_message")
							.show()
							.text("Result: " + result.text + "\n" +
							      "Format: " + result.format + "\n" +
							      "Cancelled: " + result.cancelled)
						;
					} else {
						error = msg.error;
						$(".j_results_message")
							.show()
							.text("Error: " + error)
						;
					}
				});
			})

			.on("click", ".j_closeKeyboard", function(){
				$results.hide();
				sdk.h5.call("closeKeyboard");
			})

			.on("click", ".j_closeSelf", function(){
				$results.hide();
				sdk.h5.call("closeSelf");
			})
		;

		$onElem

			.on("click", ".j_confirm", function() {
				$results.hide();
				sdk.h5.call("popup.confirm", {
					msg: "还是要学习一个",
					title: "提醒一下",
					buttons: ["学习","不学习"]
				}, function(state) {
					var hasStudy = state === "resolve";

					$(".j_results_message")
						.show()
						.text(hasStudy ? "你学习了一个" : "你没有学习")
					;
				});
			})

			.on("click", ".j_alert", function() {
				$results.hide();
				sdk.h5.call("popup.alert", {
					msg: "必须学习一个",
					title: "警告",
					buttonName:"被迫学习"
				}, function() {
					$(".j_results_message")
						.show()
						.text("你被迫学习了一个");
					;
				})
			})

			.on("click", ".j_prompt", function() {
				$results.hide();
				sdk.h5.call("popup.prompt", {
					msg: "续几秒？",
					title: "续么",
					buttons: ["续", "不续"],
					defaultText: "1"
				}, function(onf) {
					var text;

					if (onf.state === "resolve") {
						text = "你续了" + onf.text + "秒";
					} else {
						text = "你没有续";
					}

					$(".j_results_message")
						.show()
						.text(text);
					;
				})
			})

			.on("click", ".j_toastAlert", function() {
				$results.hide();
				sdk.h5.call("popup.toastAlert", {
					message: "膜法师你好",
					duration: "long",
					position: "bottom"
				})
			})
		;

		$onElem

			.on("click", ".j_getOffsetSize", function() {
				var
					body,
					clientWidth,
					offsetWidth,
					scrollWidth
				;

				$results.hide();

				body = document.querySelector("body");
				clientWidth = body.clientWidth;
				offsetWidth = body.offsetWidth;
				scrollWidth = body.scrollWidth;

				$(".j_results_message")
					.show()
					.text("clientWidth: " + clientWidth + "px" + "\r\n" +
					      "offsetWidth: " + offsetWidth + "px" + "\r\n" +
					      "scrollWidth: " + scrollWidth + "px")
				;

			})

			.on("click", ".j_getUserAgent", function() {
				$(".j_results_message")
					.show()
					.text(navigator.userAgent)
				;

			})
		;

	}

	function objectStyle(devInfo){
		return JSON.stringify.call(JSON, devInfo, "", 4);
	}

})(window.MCK, window.jQuery);
