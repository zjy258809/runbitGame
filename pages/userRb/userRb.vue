<template>
	<view>
		<view class="top">
			<view class="uni-flex uni-row head">
				<img class="logo1" @tap="back" src="../../static/Group115822.png" />
				<view class="logoTx">RB</view>
				<img @tap="setting" class="logo2" src="../../static/Group12016.png" />
			</view>
			<img class="gp5" @tap="inputDialogToggle()" src="../../static/Group12009.png" />
			<view class="gp5-txt">{{ getFix2(balanceOfRB) }} RB</view>

			<view class="uni-flex uni-row">
				<view class="uni-flex uni-column accept" @click="buy">
					<img class="fontImg" src="../../static/Group12010.png" />
					<view class="fontz">購買</view>
				</view>
				<view class="uni-flex uni-column accept" @click="transfer">
					<img class="fontImg" src="../../static/Group11585.png" />
					<view class="fontz">轉移</view>
				</view>
				<view class="uni-flex uni-column accept" @click="transaction">
					<img class="fontImg" src="../../static/Group11584.png" />
					<view class="fontz">交易</view>
				</view>
			</view>

			<view class="uni-flex uni-row" style="margin-top: 5.125rem; margin-bottom: 1rem;">
				<view @tap="recordList(0)" :class="curList == 0 ? 'recordList' : 'recordList2'">轉入</view>
				<view @tap="recordList(1)" :class="curList == 1 ? 'recordList' : 'recordList2'">轉出</view>
			</view>

			<view v-if="curList == 0">
				<view style="" class="text" v-for="(item, index) in data" :key="index">
					<uni-card title="" extra=""
						style="width: 90%; border-radius: 0.825rem; background-color:#FFF ; margin: 0.35rem auto;">


						<view class="curId uni-flex uni-row">
							<view class="level2">{{ displayAdddress(item.address )}}</view>
							<view class="level3">{{ getFix2(item.value) }} RB</view>
							<view class="level4">{{ item.create_time.substring(0,10) }}</view>
						</view>




					</uni-card>
				</view>
			</view>
			<view v-if="curList == 1">
				<view style="" v-show="data2.length > 0" class="text" v-for="(item, index) in data2" :key="index">
					<uni-card title="" extra=""
						style="width: 90%; border-radius: 0.825rem; background-color:#FFF ; margin: 0.35rem auto;">


						<view class="curId uni-flex uni-row">
							<view class="level2">{{ displayAdddress(item.address) }}</view>
							<view class="level3">{{ getFix2(item.value) }} RB</view>
							<view class="level4">{{ item.create_time.substring(0,10) }}</view>
						</view>




					</uni-card>
				</view>

				<img class="nocard" v-show="data2.length == 0" src="../../static/Group12015.png" />
			</view>


		</view>
	</view>
</template>

<script>
import {
	ethers,
} from 'ethers'
import {
	RBAddress,
	RBAbi,
	RBCTAddress,
	RBETAddress,
	RBCTAbi,
	RBETAbi,
	USDT, USDTAbi, RunbitAddress, RunbitAbi
} from '../../contract/address.js'
import {
	useContract,
} from '../../contract/useContract.js'
import {
	big2num,displayAdddress
} from '../../contract/ultis.js'

import { myRequest } from '../../utils/api.js'

export default {
	data() {
		return {
			data: [],
			data2: [],
			curList: 0,
			balanceOfRB: 0
		}
	},
	onLoad() {
		try {

			const provider = new ethers.providers.Web3Provider(window.ethereum);

			provider.send("eth_requestAccounts", []).then(accounts => {
				this.myAccount = accounts[0]
				this.getTransactions(1)
				useContract(RBAddress, RBAbi).then(RBContract => {
					//获取rb余额
					RBContract.balanceOf(this.myAccount).then(balanceOfRB => {
						this.balanceOfRB = big2num(balanceOfRB)
					})

				});

				//获取交易记录
			})
		} catch (e) {
			console.error(e);
		}
	},
	
	methods: {
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		getFix2(num) {
			var value = Math.floor(num * 100) / 100
			return value
		},
		recordList(index) {
			this.curList = index;
			this.getTransactions(index+1)
		},
		setting() {
			uni.navigateTo({
				url: '../userSetting/userSetting'
			});
		},
		getTransactions(type) {
			myRequest({
				url: 'game/getRBTransfer',
				method: 'GET',
				data: {
					addr: this.myAccount,
					trans_type: type
				}
			}).then(data => {
				if (type == 1)
					this.data = data.list
				else this.data2 = data.list
			})
		},
		  displayAdddress(address) {
	return address.substring(0, 4) + "..." + address.substring(address.length - 5, address.length - 1)
}
	}
}
</script>

<style>
.recordList {
	font-size: 1.125rem;
	font-weight: bold;
	color: #000000;
	margin-left: 1.25rem;
}

.recordList2 {
	font-size: 1.125rem;
	font-weight: bold;
	color: #C4C4C4;
	margin-left: 1.25rem;
}

.fontImg {
	width: 45%;
	display: inline-block;
	margin: 0 auto;
}

.fontz {
	margin-top: 0.625rem;
	color: #000000;
}

.accept {
	width: 33%;
	text-align: center;
}

.head {
	width: 100%;
	height: 5.25rem;
	position: absolute;
}

.nocard {
	display: inline-block;
	margin: 0 auto;
	margin-top: 6rem;
	width: 35%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.gp5 {
	display: inline-block;
	margin: 0 auto;
	margin-top: 6rem;
	width: 15%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.gp5-txt {
	margin-bottom: 2.0625rem;
	margin-top: 0.5rem;
	font-size: 1.5rem;
	text-align: center;
	color: #000000;
	font-weight: bold;
}

.top {
	position: absolute;
	width: 100%;
	height: 27.375rem;
	left: 0px;
	top: 0px;

	background: linear-gradient(180deg, #F3F3F3 0%, rgba(255, 177, 20, 0.0) 100%);
	border-radius: 0px 0px 36px 36px;
}

.logo1 {
	width: 1.5625rem;
	height: 1.5625rem;
	margin: auto 0;
	position: absolute;
	left: 1.625rem;
	top: 30%;
}

.logo2 {
	width: 1.5625rem;
	height: 1.5625rem;
	margin: auto 0;
	position: absolute;
	right: 1.625rem;
	top: 30%;
}

.level2 {
	font-weight: bold;
	color: #000;
	width: 160.55rpx;
	height: 50.72rpx;
	text-align: left;
	font-size: 0.875rem;
	line-height: 50rpx;
}

.level4 {
	font-weight: bold;
	color: #000;
	width: 180.55rpx;
	height: 50.72rpx;
	font-size: 0.875rem;
	line-height: 50rpx;
}

.level3 {
	font-weight: bold;
	color: #FF5C00;
	width: 160.55rpx;
	height: 50.72rpx;
	font-size: 0.875rem;
	line-height: 50rpx;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	text-align: center;
}

.logoTx {
	font-size: 1rem;
	color: #000000;
	font-weight: bold;
	font-size: 1.0625rem;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;


}
</style>
