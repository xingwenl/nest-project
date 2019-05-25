
var js_utils = {
	/**
	 * @description 时间格式化
	 * @param @{Number} time
	 * @param @{String} fmt = [yyyyMMddhhmmss] 可选值
	 */
	formatDate: function(time, fmt){
		var now = new Date();
		var date = new Date(time);
		if(date == "Invalid Date"){
			date = now;
		}
		var o = {
			"M+": date.getMonth() + 1, //月份
			"d+": date.getDate(), //日
			"h+": date.getHours(), //小时
			"m+": date.getMinutes(), //分
			"s+": date.getSeconds(), //秒
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度
			"S": date.getMilliseconds() //毫秒
		};
		if(/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		
		return fmt;
	},

	// 判断是否为空对象
	isEmptyObj: function(obj){
		var t
		for(t in obj)
			return false
		return true
	},

	// 判断是否为对象
	isObject: function(obj) {
		return obj !== null && typeof obj === 'object'
	},

	timingCallback: function(params) {
		params.since = params.since || new Date().getTime()
		params.duration = params.duration || 60
		params.delay = params.delay || 1000
		params.onUpdate = params.onUpdate || function() {}
		params.onEnd = params.onEnd || function() {}

		var endTime = params.endTime || params.since + params.duration * 1000
		var interval = setInterval(update, params.delay)

		function update() {
			var nowTime = new Date().getTime()
			var restTime = endTime - nowTime
			params.onUpdate && params.onUpdate(restTime, nowTime)
			if(endTime < nowTime) {
				clearInterval(interval)
				params.onEnd && params.onEnd(nowTime)
			}
		}
		return function() {
			clearInterval(interval)
		}
	},

	getDateDiff: function(publishTime, options) {
		var d_seconds,
			d_minutes,
			d_hours,
			d_days,
			timeNow = parseInt(new Date().getTime() / 1000),
			d,
			date = new Date(publishTime * 1000),
			Y = date.getFullYear(),
			M = date.getMonth() + 1,
			D = date.getDate(),
			H = date.getHours(),
			m = date.getMinutes(),
			s = date.getSeconds();
		//小于10的在前面补0
		if(M < 10) {
			M = '0' + M;
		}
		if(D < 10) {
			D = '0' + D;
		}
		if(H < 10) {
			H = '0' + H;
		}
		if(m < 10) {
			m = '0' + m;
		}
		if(s < 10) {
			s = '0' + s;
		}

		d = timeNow - publishTime;
		d_days = parseInt(d / 86400);
		d_hours = parseInt(d / 3600);
		d_minutes = parseInt(d / 60);
		d_seconds = parseInt(d);

		if (options.day) {
			return D + ' ' + H + ':' + m;
		}

		if(d_days > 0 && d_days < 3) {
			return d_days + '天前';
		} else if(d_days <= 0 && d_hours > 0) {
			return d_hours + '小时前';
		} else if(d_hours <= 0 && d_minutes > 0) {
			return d_minutes + '分钟前';
		} else if(d_seconds < 60) {
			if(d_seconds <= 0) {
				return '刚刚发表';
			} else {
				return d_seconds + '秒前';
			}
		} else if(d_days >= 3 && d_days < 30) {
			return M + '-' + D + ' ' + H + ':' + m;
		} else if(d_days >= 30) {
			return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
		}

	},

	//设置地址携带的数据
	setHrefData: function(obj) {
		var returnValue = "";
		for (let key in obj) {
			let value = obj[key];
			returnValue += key + '=' + value + '&';
		}
		return returnValue.slice(0,returnValue.length - 1)
	},

	//获取连接地址
	getHrefData: function(){
		var href = window.location.href;
		var paramStr = href.substring(href.indexOf("?") + 1);
		var paramArray = paramStr.split("&");
		var returnObj = {};
		paramArray.forEach( function(obj,index) {
			var tmp = paramArray[index].split("=");
			returnObj[tmp[0]] = decodeURI(tmp[1]);
		})
		return returnObj;
	},

	// localStorage 获取封装
	getStore: function(name) {
		var value = localStorage.getItem(name)
		return value;
	},

	// localStorage 写入封装
	setStore: function(name, value) {
		localStorage.setItem(name,JSON.stringify(value))
	},

	isEmpty: function(o,noZero) {
		if (undefined === o || false === o || null === o || '' === o || 0 === o) {
			if (noZero && 0 === o) {
				return false;
			}
			return true;
		}
		return false;
	},
	//删除对象空字段
	clearNullParams: function(obj) {
		if (obj instanceof Array) {
			return obj
		}
		var tmp = {};
		if (this.isObject(obj)) {
			for (let key in obj) {
				if (!this.isEmpty(obj[key],true)) {
					tmp[key] = obj[key]
				}
			}
		}
		return tmp;
	},
	isEmail: function (str) {
		var r=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return r.test(str)
	},


	/**
	 * @description 检查是否为NULL
	 * @param [Object] 检查对象
	 * @param [String] 过滤字段
	 * @returns [Boolean] 有空值则返回true
	 */
	isHasNullParams: function (obj, filter) {
		for (let key in obj) {
			if (key !== filter) {
				if (this.isEmpty(obj[key])) {
					return true
				}
			}
		}
		return false;
	},
	/**
     * [设备检测]
     * @return {Object} [设备检测对象]
     * {Object} [Object.trident   IE内核]
     * {Object} [Object.presto    opera内核]
     * {Object} [Object.isWebKit  苹果、谷歌内核]
     * {Object} [Object.isMobile  是否为移动终端]
     * {Object} [Object.isIOS     ios终端]
     * {Object} [Object.isAndroid android终端或者uc浏览器]
     * {Object} [Object.iPhone    是否为iPhone或者QQHD浏览器]
     * {Object} [Object.iPad      是否iPad]
     * {Object} [Object.webApp    是否web应该程序，没有头部与底部]
     * {Object} [Object.isWeChat  是否为微信]
     */
    deviceDetect: function(){
        var u = navigator.userAgent;
        return {
            trident: u.indexOf("Trident") > -1,
            presto: u.indexOf("Presto") > -1,
            isWebKit: u.indexOf("AppleWebKit") > -1,
            gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1,
            isMobile: !!u.match(/AppleWebKit.*Mobile.*/),
            isIOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            isAndroid: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
            iPhone: u.indexOf("iPhone") > -1 ,
            iPad: u.indexOf("iPad") > -1,
            webApp: u.indexOf("Safari") == -1,
            isWeChat: u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'
        };
		},
		includeJs: function (path) {
			var srcipt = document.createElement("script")
			script.type = 'text/javascript'
			script.src = path
			script.charset = 'utf-8'
			var head = document.getElementsByTagName('body')[0]
			head.appendChild(script)
		}
}
export default js_utils;
