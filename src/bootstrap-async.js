/**
 * Created by VC on 2017/10/31.
 */

import "bootstrap/dist/css/bootstrap.min.css"
import "./app/app.css"
import MCReady from "./app/app.js";
import { appKey } from "./app/const.js";

(() => {

	const jsElem = document.createElement("script");

	jsElem.src = "https://gitee.com/lantu/mc-sdk-insight-public/raw/v2.0.1/mc-sdk.2.0.1.js";

	document.body.appendChild(jsElem);

	jsElem.onload = function(){

		const MCK = window.MCK;

		MCK.auth(appKey);
		MCK.ready(MCReady);

	};

})();
