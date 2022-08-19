import {
	ethers,
	BigNumber
} from 'ethers'
import {
	refStoreAddress,
	refAbi
} from '@/contract/address.js'

function isMetaMask() {
	const {
		ethereum
	} = window;
	return Boolean(ethereum && ethereum.isMetaMask);
}
export async function useContract() {
	var readContract,writeContract,accounts,balance,chainid,provider;
	if (!isMetaMask()) {
		openUrl("https://metamask.io/", "install metamsk");
	}
	if (window.ethereum) {
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			let accounts = await provider.send("eth_requestAccounts", []);
			var balance = await signer.getBalance();
			readContract = new ethers.Contract(refStoreAddress, refAbi, provider);
			writeContract = readContract.connect(signer);
		} catch (error) {
			console.error(error);
		}
	} else {
		console.warn("Please authorize to access tour account");
	}
	return writeContract;
}

