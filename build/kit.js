/**
 * Created by VC on 2017/9/21.
 */

Kit.getCliParams = getCliParamsFactory();
Kit.isProduction = isProduction;
Kit.assignInsight = assignInsight;
Kit.isObject = isObject;
Kit.isArray = isArray;

function getCliParamsFactory(){

	const
		minimist = require("minimist")
	;

	let
		cliAgr
	;

	return (isFore) => {
		if(!cliAgr && !isFore){
			cliAgr = cliAgr || minimist(process.argv.slice(2), {
				default: {}
			});
		}
		return cliAgr;
	};

}

/**
 * 是否为 产生环境 构建
 * @return { Boolean }
 */
function isProduction(){

	let aliOnf = Kit.getCliParams();

	return !!(aliOnf["p"] || aliOnf["production"]);

}

assignInsight.identify = identifyObject;

/**
 * Smart Deep Mode For Object.assign
 * @param target
 * @param source
 * @returns {*}
 */
function assignInsight(target, source){

	for(let prop in source){

		let
			isExtendAssign,
			isPushAssign
		;

		if(!source.hasOwnProperty(prop)){ continue }

		isExtendAssign = isObject(source[prop]);
		isPushAssign = isArray(source[prop]);

		if(isExtendAssign){

			target[prop] = isObject(target[prop]) ?
				target[prop] :
				{}
			;

			target[prop] = assignInsight(target[prop], source[prop]);

		}else if(isPushAssign){

			if(!isArray(target[prop])){
				target[prop] = source[prop];
				continue;
			}

			target[prop] = _arrayPushAssign(target[prop], source[prop])

		}else{

			target[prop] = "" === source[prop] ?
				target[prop] :
				source[prop]
			;

		}

	}

	return target;

}

const nativeConstructorList = _getNativeConstructorList();

/**
 * 是否为自定义 实例对象
 * @param obj
 * @return {boolean}
 * @private
 */
function _isCustomInstance(obj){
	return !!(obj && -1 === nativeConstructorList.indexOf(obj && obj.constructor && obj.constructor.name));
}

/**
 * 标识对象, 配合 assignInsight 一同使用
 * @param { String } id
 * @param { Object } obj
 * @return { Object }
 */
function identifyObject(id, obj){
	return Object.assign(Object.create(obj), {
		constructor: id
	});
}

/**
 * 获取 原生JS 构造对象名列表
 * @return { Array }
 * @private
 */
function _getNativeConstructorList(){
	return [{}, [], "5", 5, /5/, new Date(), new Set(), new Map(), () =>{}].map((item) => item.constructor.name);
}

/**
 *
 * @param { Array } targetList
 * @param { Array } sourceList
 * @return { Array }
 * @private
 */
function _arrayPushAssign(targetList, sourceList){

	let
		hashCustomSource
	;

	hashCustomSource = sourceList

		.filter((item) =>{
			return _isCustomInstance(item);
		})

		.reduce((cur, next) =>{
			cur[next.constructor.name] = true;
			return cur;
		}, {})
	;

	let
		len = targetList.length;

	while(len--){

		let itemTarget = targetList[len];

		if(_isCustomInstance(itemTarget) && hashCustomSource.hasOwnProperty(itemTarget.constructor.name)){
			targetList.splice(len, 1);
		}

	}

	targetList.push.apply(targetList, sourceList);

	return targetList;

}

const toString = Object.prototype.toString;

function isObject(target){
	return "[object Object]" === toString.call(target);

}

function isArray(target){
	return "[object Array]" === toString.call(target);
}

function Kit(){ }

module.exports = Kit;
