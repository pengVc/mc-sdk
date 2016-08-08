# 移动校园 SDK 使用说明

该文档正在不断完善, 请以最新版本为参考.


### Scheme

* 安装
* [使用](#2-使用)
	* [命名空间](#2-1-命名空间)
	* [验证回调](#2-2-验证回调)
	* [调用API](#2-3-调用api)
* [API列表](#3-api-list)
* [示例](#4-example)


### 1. 安装

请在 `<head>` 标签中添加 sdk `<script>`

![示例](src/img/setup_snap.png)

sdk_1.0.7: [mc_kit_sdk_1.0.7.min.js](http://www.app8848.com/mc_sdk/mc_kit_sdk_1.0.7.min.js?appkey=LIMC0001 "MC-SDK_1.0.7")

sdk_1.0.6: [mc_kit_sdk_1.0.6.min.js](http://www.app8848.com/mc_sdk/mc_kit_sdk_1.0.6.min.js?appkey=LIMC0001 "MC-SDK_1.0.6")

sdk_1.0.5: [mc_kit_sdk_1.0.5.min.js](http://www.app8848.com/mc_sdk/mc_kit_sdk_1.0.5.min.js?appkey=LIMC0001 "MC-SDK_1.0.5")

sdk_最新版: [http://www.app8848.com/mc_sdk/mc_kit_sdk.min.js?appkey=<yourAppKey>](http://www.app8848.com/mc_sdk/mc_kit_sdk.min.js?appkey=<yourAppKey> "MC-SDK 最新版")

### 2. 使用

!

#### 2.1 命名空间

移动校园sdk, 仅在全局扩展 `MCK` 的命名空间.


#### 2.2 验证回调

当集成H5界面开始加载, sdk 便自动验证当前H5是否为可信任.
若信任验证成功, 则可以正常使用 API.

由于验证是异步, 因此sdk提供验证成功回调:

![示例](src/img/sdk_ready.png)

Tips:

* `MCK.ready` 方法可调用多次.
* 若已验证成功, 调用 `MCK.ready`, 会立即执行传入的回调函数.


#### 2.3 调用API

#### 2.3.1 SDK 相关 API:

| 方法 | 描述   |
| ------------- | ------------- |
| MCK.ready(fn) | 验证成功之后回调 |
| MCK.conflict() | 若MCK命名冲突, 则可以使用该方法恢复. |
| MCK.auth() | sdk 会在合适的情景自动调用. 一般情况下, 开发者无需手动调用. |

<br>

#### 2.3.2 H5 相关 API

__返回可调用的所有方法的数组:__

	MCK.h5.getApi();

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| 无 | - | - |

Callback Data: `Array`

	[
		"GETUSERINFO",
		"TAKEPHOTO",
		"PICKPHOTO",
		"TAKEORPICKPHOTO",
		"PICKPICTURES",
		"LOGOUT",
		"EXITAPP",
		"SHARE",
		 //..
	]

<br>

__调用API:__

	MCK.h5.call(apiName, data, callback);

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| apiName | string | API名称, 调用移动校园提供的 API, 看 [API LIST](#3-api-list) |
| data | * | 接口参数 |
| callback | function | 回调函数 |

<br>

### 3. API LIST

__3.1 获取用户基本信息__

	MCK.h5.call("getUserInfo");

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| 无 | - | - |

Callback Data: `Object`

	{
	  userId："用户id",
	  userName: "用户名(学号)",
	  realName: "真实姓名",
	  sex: "性别" ,
	  role: "角色",
	  profile: "头像地址",
	  campusFlag: "唯一校园标识"
	}

性别(sex):

* 1 为男
* 2 为女
* 3 为未知

角色(role):

* 1: "学生"
* 2: "教职工"
* 3: "研究生"
* 4: "软件供应商"
* 9: "游客"


<br>

__3.2 调用相机或通过相册选择照片__

	MCK.h5.call("takeOrPickPhoto", config, callback);

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| config.allowEdit | Boolean | 是否允许编辑 |
| config.width | Number | 图片宽度 |
| config.height | Number | 图片高度 |
| config.quality | Number | 图片压缩比例(0-100) |

Callback Data: `String`

	图片base64编码

<br>

__3.3 调用三方分享__

	MCK.h5.call("share", config, callback);

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| config.title | String | 分享的标题  |
| config.content | String | 分享的内容 |
| config.imgSrc | String | 分享的图片 |
| config.url | String | 分享后可访问链接 |

Callback Data: `Object`

	{
		// statusCode 可选值为: 1 || 0
		// 1为分享成功, 0 为分享失败
		status: statusCode
    }

<br>

__3.4 注销登录__

	MCK.h5.call("logout");

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| 无 | - | - |

Callback Data:

	无

<br>

__3.5 退出应用__

	MCK.h5.call("exitApp");

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| 无 | - | - |

Callback Data:

	无

<br>

__3.6.1 设置 NavigationBar 名称__

	MCK.h5.call("setNavBarTitle", title);

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| title | String | navBar 名称 |

<br>

__3.6.2 添加 NavigationBar Title Item__

	MCK.h5.call("addNavBarTitleList", config, listener);

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| config.name | String | ( 按钮名称 ) |
| config.flag | String | 按钮标识( 可用做删除 ) |
| listener | Function | 按钮被点击的回调 |

<br>

__3.6.3 删除 NavigationBar Title Item__

	MCK.h5.call("delNavBarTitleList", flag);

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| flag | String | ( 按钮标识 ) |

<br>

__3.6.4 清空 NavigationBar Title LIST__

	MCK.h5.call("clearNavBarTitleList");

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| 无 | - | - |

<br>

__3.7.1 添加 NavigationBar 右侧按钮__

	sdk.h5.call("addNavBarMainBtn", config, listener);

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| config.name | String | ( 按钮名称 ) |
| config.flag | String | 按钮标识( 可用做删除 ) |
| config.iconSrc | String | 按钮的图标( 可接受 url, 或 base64 ) |
| listener | Function | 按钮被点击的回调 |

<br>

__3.7.2 删除 NavigationBar 右侧按钮__

	sdk.h5.call("delNavBarMainBtn", flag);

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| flag | String | ( 按钮标识 ) |

<br>

__3.7.3 清空 NavigationBar 右侧按钮__

	sdk.h5.call("clearNavBarMainBtn");

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| 无 | - | - |

<br>

__3.8 调用拨号__

	sdk.h5.call("callDial", telNumber);

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| telNumber | Number | 拨号号码 |

<br>

__3.9 调用扫描二维码__

	MCK.h5.call("scan", callback);

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| 无 | - | - |

Callback Data: `Object`

	{
		// status 可选值为: 1 || 0
		// 1为扫描成功, 0 为扫描失败
		// result 扫描成功后返回结果
		// result.text 扫描结果
		// result.format 扫描结果格式(如：二维码为QR_CODE)
		// result.cancelled 是否取消 可选值为 1 || 0
		// 1为已取消, 0为未取消
		status: status,
		result: result,
		error: error
    }

<br>

__3.10.1 显示 "加载中"状态 模态图标__

	sdk.h5.call("progressBar.show");

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| 无 | - | - |

<br>

__3.10.2 隐藏 "加载中"状态 模态图标__

	sdk.h5.call("progressBar.hide");

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| 无 | - | - |

<br>

__3.11 全屏浏览大图__

	MCK.h5.call("viewFullImg", imgSrc);

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| imgSrc | String | 图片地址 |

<br>

__3.12.1 显示confirm框__

	MCK.h5.call("popup.confirm", config, listener);

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| config.msg | String | 描述内容 |
| config.title | String | 对话框标题( 默认为"确认" ) |
| listener | Function | 按钮被点击的回调 |

Callback Data: `String`

	//"resolve" 点击确认按钮后触发
	//"reject"  点击取消按钮后触发

<br>

__3.12.2 显示alert框__

	MCK.h5.call("popup.alter", config, listener);

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| config.msg | String | 描述内容 |
| config.title | String | 对话框标题( 默认为"提示" ) |
| listener | Function | 按钮被点击的回调 |

<br>

__3.12.3 显示toastAlert框__

	MCK.h5.call("popup.toastAlert", config);

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| config.message | String | 显示文字 |
| config.duration | String |  "short","long" 弹框显示时间( 默认为"long" ) |

<br>

__3.13 关闭键盘__

	MCK.h5.call("closeKeyboard");

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| 无 | - | - |

<br>

__3.14 关闭集成界面__

	MCK.h5.call("closeSelf");

Parameters:

| 参数 | 类型 | 描述   |
| ------------- | ------------- | ------------- |
| 无 | - | - |

<br>

### 4. Example

```javascript
(function(MCK){

	MCK.ready(MCReady);

	function MCReady(sdk){

		// 这里 sdk 即是 MCK
		// MCK === sdk

		sdk.h5.call("getUserInfo", function(userData){
			// userData 为APP中传入的 用户数据
			console.log(JSON.stringify(userData));
		});
	}

})(window.MCK);
```
