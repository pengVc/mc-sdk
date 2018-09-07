# 移动校园 JS-SDK 使用说明 #

+ [Wiki 文档](https://gitee.com/lantutech/mc-sdk/wikis)
+ [实战 Demo](https://gitee.com/lantutech/mc-sdk/blob/master/src/app/app.js#L92)  


### 快速集成 ###


__安装:__

请在 `<head>` 标签中添加 sdk `<script>`

```html
  
<script src="https://gitee.com/lantu/mc-sdk-insight-public/raw/v2.0.0/mc-sdk.2.0.0.js?appkey=9f46f04c"></script>

```   

![示例](src/img/setup_snap.png)

_注: appkey 需要你联系相关项目经理, 提供你网页应用所在的url源(`location.origin`), 进行申请._

<br>
<br>

__使用:__

```javascript
((MCK) => {

	MCK.ready(MCReady);

	function MCReady(sdk){

		// 验证通过回调, 此处可以放心调用API
		// 这里 sdk 即是 MCK
		// MCK === sdk, 为true

		// 调用通信 API
		sdk.h5.call("getUserInfo", function(userData){
			// userData 为APP中传入的 用户数据
			console.log(JSON.stringify(userData));
		});

	}

})(window.MCK);
```

更多 API, 请查看 [Wiki 文档](https://gitee.com/lantutech/mc-sdk/wikis/通信API文档?sort_id=736755)
