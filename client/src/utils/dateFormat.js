/* 
DateFormat('yyyy-MM-dd EEE hh:mm:ss',date)
yyyy-年
MM-月
dd-日
hh-时
mm-分
ss-秒
E-几
EE-周几
EEE-星期几 
*/
const DateFormat = function(fmt, d = new Date()) {
	var o = {
		"M+": d.getMonth() + 1, //月份         
		"d+": d.getDate(), //日         
		// "h+": d.getHours() % 12 == 0 ? 12 : d.getHours() % 12, //小时         
		"h+": d.getHours(), //小时         
		"m+": d.getMinutes(), //分         
		"s+": d.getSeconds(), //秒         
		"q+": Math.floor((d.getMonth() + 3) / 3), //季度         
		"S": d.getMilliseconds() //毫秒         
	};
	var week = {
		"0": "日",
		"1": "一",
		"2": "二",
		"3": "三",
		"4": "四",
		"5": "五",
		"6": "六"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") :
			"") + week[d.getDay() + ""]);
	}
	for (let k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
				.length)));
		}
	}
	return fmt;
}

export {
	DateFormat
};
