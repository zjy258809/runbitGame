<template>
	<view>
		<view class="top">
			<view class="uni-flex uni-row head">
				<img class="logo1" @tap="back" src="../../static/Group115822.png" />
				<view class="logoTx">邀請碼</view>
			</view>

			<uni-card title="" extra=""
				style="width: 90%; text-align: center; border-radius: 0.825rem; background-color:#FFF ; margin: 0 auto; margin-top: 5rem; margin-bottom: 2rem;">


				<view class="">
					<view style="margin: 0.5rem;">我的邀请码</view>
					<view class="logoTx">{{ displayAdddress(myAccount) }}</view>
					<img class="fontImg" src="../../static/Grou152.png" @click="copy" />
				</view>


			</uni-card>


			<view class="uni-flex uni-row">
				<view class="recordList">邀請記錄</view>
				<view class="recordList4">当前级别层数:{{floor1}}  人数:{{total1}}  活跃度:{{activity1}}</view>
				
			</view>
			<view v-if="level>2 && level<6" class="recordList5">下一级别层数:{{floor2}}  人数:{{total2}}  活跃度:{{activity2}}</view>

			<view v-if="curList == 0">
				<view style="" class="text" v-for="(item, index) in data" :key="index">
					<uni-card title="" extra=""
						style="width: 90%; border-radius: 0.825rem; background-color:#FFF ; margin: 0.35rem auto;">


						<view class="uni-flex uni-row">
							<view class="level2">{{ displayAdddress(item.address) }}</view>
							<view class="level5">{{ item.floor}}层</view>
							<view class="level3">{{ item.level }}</view>
							<view class="level4">{{ item.create_time.substring(0, 10) }}</view>
						</view>




					</uni-card>
				</view>
			</view>



		</view>
	</view>
</template>

<script>
	import {
		ethers,
		BigNumber
	} from 'ethers'
	import {
		RBAddress,
		RBAbi,
		RBCTAddress,
		RBETAddress,
		RBCTAbi,
		RBETAbi,
		USDT,
		USDTAbi,
		RunbitAddress,
		RunbitAbi
	} from '../../contract/address.js'
	import {
		useContract,
		getApproveState,
		contractApprove
	} from '../../contract/useContract.js'
	import {
		myRequest
	} from '../../utils/api.js'
	export default {
		data() {
			return {
				finished:0,
				total:0,
				data: [],
				data2: [],
				curList: 0,
				myAccount: '',
				level:'',
				floor1:'',
				total1:'',
				activity1:'',
				floor2:'',
				total2:'',
				activity2:'',
			}
		},
		onLoad() {
			try {
				const provider = new ethers.providers.Web3Provider(window.ethereum);

				provider.send("eth_requestAccounts", []).then(accounts => {
					this.myAccount = accounts[0]
					this.getRecord()
				})
			} catch (e) {

			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			recordList(index) {
				this.curList = index;
			},
			getRecord() {
			
				
				 	this.baseurl = 'https://gapi.runbit.lol/api/v1/'
				// uni.request({
				// 	url: this.baseurl + 'game/getSubActivity',
				// 	data: {
				// 		addr: this.myAccount
				// 	},
				// 	method: "GET",
				// 	success: res => {
				// 		if (res.data.code === 0) {
				// 			this.finished =res.data.data.current;
				// 		}
				// 	}
				// })
				
				uni.request({
					url: this.baseurl + 'game/getSubUser',
					data: {
						addr: this.myAccount
					},
					method: "GET",
					success: res => {
						if (res.data.code === 0) {
							for (var i = 0; i < res.data.data.list.length; i++) {
								if(res.data.data.list[i].level<=0)
								{
									if(res.data.data.list[i].is_valid==0)
									res.data.data.list[i].level ="运动小白";
									else
									res.data.data.list[i].level ="运动达人";
								}else{
									res.data.data.list[i].level =res.data.data.list[i].level+'级社区长'
								}
							}
							this.level = res.data.data.level;
							this.floor1 = res.data.data.floor1;
							this.total1 = res.data.data.total1;
							this.activity1 = res.data.data.activity1;
							this.floor2 = res.data.data.floor2;
							this.total2 = res.data.data.total2;
							this.activity2 = res.data.data.activity2;
							this.data = res.data.data.list
						}
					}
				})
			},
			displayAdddress(address) {
				return address.substring(0, 4) + "..." + address.substring(address.length - 4, address.length - 0)
			},

			copy() {
				/* Get the text field */

				/* Copy the text inside the text field */
				if (window.navigator.clipboard) {
					navigator.clipboard.writeText(this.myAccount);
					uni.showToast({
						title: '已复制',
						icon: 'none'
					})
				}
				if (!!window.imToken) {
					imToken.callAPI('native.setClipboard', this.myAccount)
				}

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
		width: 4.5rem;
	}
	.recordList4 {
		font-size: 26rpx;
		font-weight: bold;
		color: #000000;
		margin-left: 1rem;
		height: 45.83rpx;
		line-height:  45.83rpx;
	}
	.recordList5 {
		font-size: 26rpx;
		font-weight: bold;
		color: #000000;
		margin-left: 6.8rem;
		height: 45.83rpx;
		line-height:  45.83rpx;
	}

	.recordList2 {
		font-size: 1.125rem;
		font-weight: bold;
		color: #C4C4C4;
		margin-left: 1.25rem;
	}

	.fontImg {
		width: 40%;
		display: inline-block;
		margin: 15 auto;
		margin-top: 1rem;
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
	.level3 {
		color: #000;
		width: 150.55rpx;
		height: 50.72rpx;
		font-size: 0.875rem;
		line-height: 50rpx;
		text-align: center;
		
	}
	.level5 {
		color: #000;
		width: 90.55rpx;
		height: 50.72rpx;
		text-align: left;
		font-size: 0.875rem;
		line-height: 50rpx;
		text-align: center;
		
	}

	.level4 {
		font-weight: bold;
		color: #000;
		width: 160.55rpx;
		height: 50.72rpx;
		font-size: 0.875rem;
		line-height: 50rpx;
		position: absolute;
		right: 1.25rem;



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
