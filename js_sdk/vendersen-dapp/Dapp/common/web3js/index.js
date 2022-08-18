//引入web3 模块
let Web3 = require('web3');
export default {
	//RPC连接
	rpc: {
		//rpc连接对象 相当于web3js文档中的web3
		client: null,
		//实例化的智能合约对象
		Contract: null
	},
	// 初始化一个RPC节点连接
	NewClient(nodeUrl) {
		return new Promise((resolve, reject) => {
			//如果存在
			if (window.ethereum) {
				this.rpc.client = new Web3(window.ethereum)
			} else if (window.web3) {
				this.rpc.client = window.web3
			} else {
				this.rpc.client = new Web3(new Web3.providers.HttpProvider(nodeUrl))
			}

			if (this.rpc.client) {
				//初始化成功
				resolve(this.rpc.client)
			} else {
				//反之
				reject(this.rpc.client)
			}
		})
	},
	// 更换RPC节点
	ChangeClient(nodeUrl) {
		return new Promise((resolve, reject) => {
			let result = this.rpc.client.setProvider(nodeUrl)
			if (result) {
				//更换成功
				resolve(result)
			} else {
				//反之
				reject(result)
			}
		})
	},
	//申请Dapp授权
	DappAuth() {
		return new Promise((resolve, reject) => {
			try {
				ethereum.enable()
				resolve(true)
			} catch (e) {
				reject(false)
				//TODO handle the exception
			}
		})
	},
	//获取当前GasPrice单价
	GetGasPrice() {
		return this.rpc.client.eth.getGasPrice()
	},
	//获取最新区块号
	GetBlockNumber() {
		return this.rpc.client.eth.getBlockNumber()
	},
	//获取默认账户(默认是没有的需要手动set值)
	GetDefaultAccount() {
		return new Promise((resolve, reject) => {
			let account = this.rpc.client.eth.defaultAccount
			if (account) {
				resolve(account)
			} else {
				reject("没有获取到默认账户")
			}
		})
	},
	//设置默认账户
	SetDefaultAccount(defaultAccount) {
		return new Promise((resolve, reject) => {
			console.log(defaultAccount)
			this.rpc.client.eth.defaultAccount = defaultAccount
			resolve(true)
		})
	},
	//获取当前账户
	GetNowAccount() {
		return new Promise((resolve, reject) => {
			this.rpc.client.eth.getAccounts().then((res) => {
				resolve(res[0])
			}).catch((err) => {
				reject(err)
			})
		})
	},
	//获取所有地址
	GetAccounts() {
		return this.rpc.client.eth.getAccounts()
	},
	//实例化一个智能合约对象
	GetContract(abi, address) {
		return new Promise((resolve, reject) => {
			try {
				this.rpc.Contract = new this.rpc.client.eth.Contract(abi, address);
				resolve(true)
			} catch (e) {
				reject(false)
				//TODO handle the exception
			}
		})
	},
	//操作智能合约中任意不需要改变区块链状态的方法
	ReadContractFunc(methodName, ...params) {
		let methods = this.rpc.Contract.methods
		return methods[methodName](...params).call()
	},
	//操作智能合约中任意改变区块链状态的方法 只返回了Hash值 其他需要自己改吧。。。
	SetContractFunc(methodName, options = {}, ...params) {
			let methods = this.rpc.Contract.methods
			return methods[methodName](...params).send(options)
		// return new Promise((resolve, reject) => {
		// 	let methods = this.rpc.Contract.methods
			// methods[methodName](...params).send(options).on('transactionHash', (hash) => {
			// 	resolve(hash)
			// })
		// })
	}



}
