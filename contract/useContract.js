import {
	ethers,
	BigNumber
} from 'ethers'
import {
	RBAddress,
	RBAbi
} from '../contract/address.js'

function isMetaMask() {
	const {
		ethereum
	} = window;
	return Boolean(ethereum && ethereum.isMetaMask);
}
//查询合约授权情况
export async function getApproveState(tokenContract,account, spender) {

return tokenContract.allowance(account, spender)


}
export async function contractApprove(tokenContract,spender) {

			 let tx = tokenContract.approve(spender, '100000000000000000000000000000')
			//设置授权时的loading
			return tx


}
export async function useContract(address, abi) {
	
	var readContract, writeContract, accounts, balance, chainid, provider;
	// if (!isMetaMask()) {
	// 	openUrl("https://metamask.io/", "install metamsk");
	// }
	if (window.ethereum) {
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			let accounts = await provider.send("eth_requestAccounts", []);
			var balance = await signer.getBalance();
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
export  function  hideBankCards(value) {
				if (value && value.length > 8) {
					return `${value.substring(0, 4)} ${"*".repeat(value.length - 38).replace(/(.{4})/g, `
					$1 `)}${value.length % 4 ? " " : ""}${value.slice(-4)}`;
				}
				return value;

			}
