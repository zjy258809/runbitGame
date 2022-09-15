<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
		   rbPrice:0,
			userAccount: '',
			userStep: 0,
			stepStaus: 1,
			stepLogo: "../../../static/Ellipse38.png",
			text: 'text11',
			layerAbi: [{
				"inputs": [{
					"internalType": "address",
					"name": "_token",
					"type": "address"
				}, {
					"internalType": "address",
					"name": "_recipient",
					"type": "address"
				}, {
					"internalType": "address",
					"name": "_NFTAddress",
					"type": "address"
				}],
				"stateMutability": "nonpayable",
				"type": "constructor"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				}, {
					"indexed": true,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}],
				"name": "BuyRB",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				}, {
					"indexed": false,
					"internalType": "address",
					"name": "to",
					"type": "address"
				}, {
					"indexed": true,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}],
				"name": "Devidend",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				}, {
					"indexed": false,
					"internalType": "string",
					"name": "date",
					"type": "string"
				}, {
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}],
				"name": "InCome",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				}, {
					"indexed": false,
					"internalType": "address",
					"name": "to",
					"type": "address"
				}, {
					"indexed": true,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}],
				"name": "PromotionAward",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				}, {
					"indexed": false,
					"internalType": "address",
					"name": "from",
					"type": "address"
				}],
				"name": "ReferrerAdded",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				}, {
					"indexed": true,
					"internalType": "bytes32",
					"name": "previousAdminRole",
					"type": "bytes32"
				}, {
					"indexed": true,
					"internalType": "bytes32",
					"name": "newAdminRole",
					"type": "bytes32"
				}],
				"name": "RoleAdminChanged",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				}, {
					"indexed": true,
					"internalType": "address",
					"name": "account",
					"type": "address"
				}, {
					"indexed": true,
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}],
				"name": "RoleGranted",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				}, {
					"indexed": true,
					"internalType": "address",
					"name": "account",
					"type": "address"
				}, {
					"indexed": true,
					"internalType": "address",
					"name": "sender",
					"type": "address"
				}],
				"name": "RoleRevoked",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				}, {
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				}, {
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}],
				"name": "TransferToken",
				"type": "event"
			}, {
				"inputs": [],
				"name": "DEFAULT_ADMIN_ROLE",
				"outputs": [{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				}],
				"name": "Details",
				"outputs": [{
					"internalType": "uint256",
					"name": "numTimes",
					"type": "uint256"
				}, {
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}, {
					"internalType": "bool",
					"name": "isUsed",
					"type": "bool"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "string",
					"name": "",
					"type": "string"
				}],
				"name": "Incomes",
				"outputs": [{
					"internalType": "uint256",
					"name": "numTimes",
					"type": "uint256"
				}, {
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}, {
					"internalType": "bool",
					"name": "isUsed",
					"type": "bool"
				}, {
					"internalType": "bool",
					"name": "isDealed",
					"type": "bool"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "NFTAddress",
				"outputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				}],
				"name": "UserRBTotal",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "from",
					"type": "address"
				}, {
					"internalType": "address",
					"name": "to",
					"type": "address"
				}],
				"name": "addReferrer",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				}, {
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"name": "bonusDetail",
				"outputs": [{
					"internalType": "uint256",
					"name": "time",
					"type": "uint256"
				}, {
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "uint256",
					"name": "Rbnum",
					"type": "uint256"
				}],
				"name": "buyRB",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				}, {
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"name": "buyRBStatus",
				"outputs": [{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"name": "cards",
				"outputs": [{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}, {
					"internalType": "string",
					"name": "uri",
					"type": "string"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "string",
					"name": "",
					"type": "string"
				}, {
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"name": "class1",
				"outputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "string",
					"name": "date",
					"type": "string"
				}],
				"name": "class1Length",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "string",
					"name": "",
					"type": "string"
				}, {
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"name": "class2",
				"outputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "string",
					"name": "date",
					"type": "string"
				}],
				"name": "class2Length",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "string",
					"name": "",
					"type": "string"
				}, {
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"name": "class3",
				"outputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "string",
					"name": "date",
					"type": "string"
				}],
				"name": "class3Length",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "string",
					"name": "",
					"type": "string"
				}, {
					"internalType": "address",
					"name": "",
					"type": "address"
				}],
				"name": "classList",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "clearClass",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "string",
					"name": "",
					"type": "string"
				}],
				"name": "dayLimit",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "int256",
					"name": "timestamp",
					"type": "int256"
				}, {
					"internalType": "int8",
					"name": "timezone",
					"type": "int8"
				}],
				"name": "daysToDate",
				"outputs": [{
					"internalType": "uint256",
					"name": "year",
					"type": "uint256"
				}, {
					"internalType": "uint256",
					"name": "month",
					"type": "uint256"
				}, {
					"internalType": "uint256",
					"name": "day",
					"type": "uint256"
				}],
				"stateMutability": "pure",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "int256",
					"name": "timestamp",
					"type": "int256"
				}, {
					"internalType": "int8",
					"name": "timezone",
					"type": "int8"
				}],
				"name": "daysToDateString",
				"outputs": [{
					"internalType": "string",
					"name": "dateTime",
					"type": "string"
				}],
				"stateMutability": "pure",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "string",
					"name": "",
					"type": "string"
				}],
				"name": "dealStatus",
				"outputs": [{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				}],
				"name": "dealTimeList",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "dividend",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "string",
					"name": "",
					"type": "string"
				}],
				"name": "dividendByDayList",
				"outputs": [{
					"internalType": "uint256",
					"name": "class1",
					"type": "uint256"
				}, {
					"internalType": "uint256",
					"name": "class2",
					"type": "uint256"
				}, {
					"internalType": "uint256",
					"name": "class3",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "userAddress",
					"type": "address"
				}],
				"name": "dividendOf",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "getBonus",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "_addr",
					"type": "address"
				}],
				"name": "getBonusDetailList",
				"outputs": [{
					"components": [{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					}, {
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}],
					"internalType": "struct Layer.Bonus[]",
					"name": "",
					"type": "tuple[]"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "string",
					"name": "date",
					"type": "string"
				}],
				"name": "getClass1List",
				"outputs": [{
					"internalType": "address[]",
					"name": "",
					"type": "address[]"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "string",
					"name": "date",
					"type": "string"
				}],
				"name": "getClass2List",
				"outputs": [{
					"internalType": "address[]",
					"name": "",
					"type": "address[]"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "string",
					"name": "date",
					"type": "string"
				}],
				"name": "getClass3List",
				"outputs": [{
					"internalType": "address[]",
					"name": "",
					"type": "address[]"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "getDay",
				"outputs": [{
					"internalType": "uint256",
					"name": "daysNum",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [],
				"name": "getRequestAmount",
				"outputs": [{
					"internalType": "uint256",
					"name": "amountByDay",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				}],
				"name": "getRoleAdmin",
				"outputs": [{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				}, {
					"internalType": "address",
					"name": "account",
					"type": "address"
				}],
				"name": "grantRole",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				}, {
					"internalType": "address",
					"name": "account",
					"type": "address"
				}],
				"name": "hasRole",
				"outputs": [{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "to",
					"type": "address"
				}],
				"name": "initUser",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [],
				"name": "recipient",
				"outputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				}],
				"name": "referrer",
				"outputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				}, {
					"internalType": "address",
					"name": "account",
					"type": "address"
				}],
				"name": "renounceRole",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "bytes32",
					"name": "role",
					"type": "bytes32"
				}, {
					"internalType": "address",
					"name": "account",
					"type": "address"
				}],
				"name": "revokeRole",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [],
				"name": "startDate",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "string",
					"name": "_a",
					"type": "string"
				}, {
					"internalType": "string",
					"name": "_b",
					"type": "string"
				}],
				"name": "strConcat",
				"outputs": [{
					"internalType": "string",
					"name": "",
					"type": "string"
				}],
				"stateMutability": "pure",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "bytes4",
					"name": "interfaceId",
					"type": "bytes4"
				}],
				"name": "supportsInterface",
				"outputs": [{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "uint16",
					"name": "year",
					"type": "uint16"
				}, {
					"internalType": "uint8",
					"name": "month",
					"type": "uint8"
				}, {
					"internalType": "uint8",
					"name": "day",
					"type": "uint8"
				}],
				"name": "toTimestamp0",
				"outputs": [{
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				}],
				"stateMutability": "pure",
				"type": "function"
			}, {
				"inputs": [],
				"name": "tokenAddress",
				"outputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				}],
				"stateMutability": "view",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}],
				"name": "transfer",
				"outputs": [{
					"internalType": "bool",
					"name": "result",
					"type": "bool"
				}],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "uint256",
					"name": "_uint",
					"type": "uint256"
				}],
				"name": "uintToString",
				"outputs": [{
					"internalType": "string",
					"name": "str",
					"type": "string"
				}],
				"stateMutability": "pure",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address[]",
					"name": "userAddress",
					"type": "address[]"
				}, {
					"internalType": "uint256",
					"name": "userClass",
					"type": "uint256"
				}],
				"name": "updateClass",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "string",
					"name": "_uri",
					"type": "string"
				}],
				"name": "updateMbaseUrl",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [{
					"internalType": "address",
					"name": "",
					"type": "address"
				}],
				"name": "userDealedBonus",
				"outputs": [{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}],
				"stateMutability": "view",
				"type": "function"
			}],
			tokenAddress: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", //token地址
			layerAddress: "0x8BeAc4FF371111251276D32817B2938C94fD7b73", //生产合约地址
			rpcaddr: "https://hardworking-purple-leaf.matic.quiknode.pro/e1643782b57442cc5a0cf0cc3870474adad502c9/",
		},
	}
</script>

<style lang="scss">
	@import './common/uni.css';
	@import './uni_modules/uview-ui/theme.scss';
	/*每个页面公共css */
</style>
