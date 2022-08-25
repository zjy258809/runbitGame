	import {
		BigNumber
	} from 'ethers'
	//装备和属性卡购买价格,以及RB余额需要换算后显示
	//使用token的精度进行换算bignum/(10^精度),RB token精度为18
export  function big2num(bignumber){
	//不是bignumber，返回原值
	if(!bignumber._isBigNumber) return bignumber
	return bignumber.div(BigNumber.from(10).pow(18)).toNumber()
	
}
export function displayAdddress(address) {
	return address.substring(0, 6) + "..." + address.substring(address.length - 8, address.length - 1)
}