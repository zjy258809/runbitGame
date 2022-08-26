import {
	BigNumber
} from 'ethers'
//装备和属性卡购买价格,以及RB余额需要换算后显示
//使用token的精度进行换算bignum/(10^精度),RB token精度为18
export function big2num(bignumber) {
	//不是bignumber，返回原值
	if (!bignumber._isBigNumber) return bignumber
	return bignumber.div(BigNumber.from(10).pow(18)).toNumber()

}
export function displayAdddress(address) {
	return address.substring(0, 6) + "..." + address.substring(address.length - 8, address.length - 1)
}
export function displayDate(date) {
	var month = new Date(date).getMonth() + 1
	var date2 = new Date(date)
	return date2.getFullYear + "-" + month + "-" + date2.getDate()
}
//按小时测试
export function getDay(day) {
	var today = new Date();
	var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 *  day;
	today.setTime(targetday_milliseconds); //注意，这行是关键代码
	var tYear = today.getFullYear();
	var tMonth = today.getMonth();
	var tDate = today.getDate();
	tMonth = doHandleMonth(tMonth + 1);
	tDate = doHandleMonth(tDate);
	var time = today.toTimeString()
	// return tYear + "" + tMonth + "" + tDate +time.substring;
	return today.toLocaleString()
}
export function doHandleMonth(month) {
	var m = month;
	if (month.toString().length == 1) {
		m = "0" + month;
	}
	return m;
}