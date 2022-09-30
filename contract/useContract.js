import {
	ethers,
} from 'ethers'

//查询合约授权情况
export async function getApproveState(tokenContract, account, spender) {

	return tokenContract.allowance(account, spender)


}
export async function contractApprove(tokenContract, spender) {

	let tx = tokenContract.approve(spender, '100000000000000000000000000000')
	//设置授权时的loading
	return tx


}
var  provider,quickProvider
if(window.ethereum){
	 provider = new ethers.providers.Web3Provider(window.ethereum);
	  quickProvider = new ethers.providers.JsonRpcProvider("https://hardworking-purple-leaf.matic.quiknode.pro/e1643782b57442cc5a0cf0cc3870474adad502c9")
	
}export async function useContract(address, abi) {

	var readContract, writeContract;
	// if (!isMetaMask()) {
	// 	openUrl("https://metamask.io/", "install metamsk");
	// }
	if (window.ethereum) {
		try {
			const signer = provider.getSigner();
			readContract = new ethers.Contract(address, abi, provider);
			writeContract = readContract.connect(signer);
		} catch (error) {
			console.error(error);
		}
	} else {
		console.warn("Please authorize to access tour account");
	}
	return writeContract;
}

export async function useQuickContract(address, abi) {
	var readContract;
	try {
		readContract = new ethers.Contract(address, abi, quickProvider);
	} catch (error) {
		console.error(error);
	}
	return readContract;
}

export function hideBankCards(value) {
	if (value && value.length > 8) {
		return `${value.substring(0, 4)} ${"*".repeat(value.length - 38).replace(/(.{4})/g, `
					$1 `)}${value.length % 4 ? " " : ""}${value.slice(-4)}`;
	}
	return value;

}
