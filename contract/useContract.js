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
	var state
	try {
		tokenContract.then(contract => {
			contract.allowance(account, spender)
		})
	} catch (e) {
		console.error(e)
		//失败
	}
}
export async function contractApprove(tokenContract,spender) {
	try {
		tokenContract.then(contract => {
			let tx = contract.approve(spender, '100000000000000000000000000000')
			//设置授权时的loading
			console.log(tx.hash)
		})

		await tx.wait()

	} catch (e) {

	}

}
export async function useContract(address, abi) {
	var readContract, writeContract, accounts, balance, chainid, provider;
	if (!isMetaMask()) {
		openUrl("https://metamask.io/", "install metamsk");
	}
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
