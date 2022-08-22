<template>
	<view class="content">

		<view class="bg">

			<view class="uni-flex uni-row" style="margin: 1.425rem; height: 89.44rpx; ">
				<img class="flex-item" src="../../../static/heard.png" style="width:3rem;" />
				<img class="currentImg" src="../../../static/Ellipse38.png" />
				<view class="currentbs">3000步</view>
				<view class="userName">
					<img class="input_edi" src="../../../static/input_edi.png"></img>
					<img class="input_logo" src="../../../static/inputlogo.png" ></img>
					<view class="input_txt">1100****1210</view>
				</view>
				
			</view>

			<view class="person">
				<img class="user_person" src="../../../static/Group5.png"></img>
				<img  @tap="inputDialogToggle()" class="userlogo" src="../../../static/group-5-2.png"></img>
				<view class="user_person_item uni-flex uni-column">
				<img class="gp11 " src="../../../static/chooseImg.png" />
				<img class="gp12" src="../../../static/chooseImg.png" />
				<img class="gp12" src="../../../static/chooseImg.png" />
				</view>
			</view>


			<uni-card title="" extra="" style="width: 70%; margin: 1rem auto;">
				<view class="uni-flex uni-row">
					<img class="currentImg2" src="../../../static/Vector14.png" />

					<view class="uni-flex uni-column">

						<view class="curId uni-flex uni-row">
							<view class="flex-item ">功能性</view>
							<view class="flex-item idvalue">103</view>
						</view>

						<view class="curId uni-flex uni-row">
							<view class="flex-item ">美观性</view>
							<view class="flex-item idvalue">351</view>
						</view>
						<view class="curId uni-flex uni-row">
							<view class="flex-item ">舒适性</view>
							<view class="idvalue">101</view>
						</view>
					</view>

				</view>

			</uni-card>

			<uni-card title="" extra="" style="width: 70%; margin: 0.225rem auto;">
				<view class="uni-flex uni-row">
					<img class="currentImg2" src="../../../static/Frame 11972.png" />

					<view class="uni-flex uni-column">

						<view class="curId uni-flex uni-row">
							<view class="flex-item ">预计收益</view>
							<view class="flex-item idvalue2">10000</view>
						</view>

					</view>

				</view>

			</uni-card>

			<img @tap="getDay()" class="gp4" src="../../../static/Group4.png" />

			<view class="bs">已同步{{steps}}步</view>

		</view>

		<!-- 赛道弹框 -->
		<view>
			<uni-popup ref="inputDialog" type="dialog">


				<uni-popup-dialog ref="inputClose" title="赛道选择" value="对话框预置提示内容!" placeholder="请输入内容"
					@confirm="dialogInputConfirm">
					<view>

						<image class="dialogimg" src="../../../static/Group11595.png"></image>
						<image class="dialogimg" src="../../../static/Group12072.png"></image>
						<image class="dialogimg" src="../../../static/Group12073.png"></image>
					</view>
				</uni-popup-dialog>

			</uni-popup>
		</view>

		<!-- 装备选择 -->
		<view>
			<uni-popup ref="inputDialog4" type="dialog">
		
		
				<uni-popup-dialog ref="inputClose" :mask-click="true" cancelText="取消" confirmText="添加" title="裝備選擇"
					value="對話框預置提示內容!" placeholder="請輸入內容" @confirm="dialogInputConfirm">
					<view>
						
						<oct-goods2 :lists="goodsArr" price-type="$" @onGoods="onGoods" />
		
					</view>
				</uni-popup-dialog>
		
			</uni-popup>
		
		</view>

		<!-- 激活码弹框 -->
		<view>
			<!-- 输入框示例 -->
			<uni-popup ref="isopen" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" :before-close="true" title="通知" placeholder="请输入激活码"
					@confirm="dialogInputConfirm2"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
import {
	ethers,
	BigNumber
} from 'ethers'
import {
	refStoreAddress,
	refAbi,
	RunbitCollectionAddress,
	RunbitCollectionAbi,
	RBAddress,
	RBAbi, RunbitAddress,
	RunbitAbi
} from '../../../contract/address.js'
import {
	useContract,
	getApproveState,
	contractApprove
} from '../../../contract/useContract.js'
import { setTrack, getTrackId, getBindEquips, getBindCards } from '../../../contract/useRunbit.js'
export default {
	data() {
		return {
			value: '',
			type: 'center',
			scrrenHeight: 10,
			value: "",
			title: 'Hello',
			layerAddress: '',
			rpcaddr: '',
			myAccount: '',
			layerAbi: '',
			collectContract: null,
			approveState: true,
			steps: 0
		}
	},
	onLoad() {
		//      this.rpcaddr = getApp().globalData.rpcaddr;
		// this.layerAddress = getApp().globalData.layerAddress;
		//  this.layerAbi = getApp().globalData.layerAbi;
	},
	mounted() {
		this.scrrenHeight = uni.getSystemInfoSync().windowHeight;
		// this.$refs.isopen.open();
		try {

			const provider = new ethers.providers.Web3Provider(window.ethereum);
			provider.send("eth_requestAccounts", []).then(accounts => {
				this.myAccount = accounts[0]
				//判断是否需要填激活码		 
				useContract(refStoreAddress, refAbi).then(refContract => {
					refContract.referrer(this.myAccount).then(refer => {
						if (refer === '0x0000000000000000000000000000000000000000')
							this.$refs.isopen.open();
					})
				})
				useContract(RunbitAddress, RunbitAbi).then(runContract => {
					this.runContract = runContract
					//获取赛道
					getTrackId(this.runContract).then(id => {
						this.trackId = id.toNumber()
						console.log("trackid ", this.trackId)
					})
					//获取装备,0代表没装备
					// this.equips = getBindEquips(this.runContract, this.myAccount)
					console.log("equips ", this.equips)

					//更新步数
					// this.updateStep()
				})
			});
			//测试
			setTimeout(() => {
				//点击装备获取卡槽情况
				// var equipType =0 //上衣
				// getBindCards(this.runContract, this.equips[equipType].id).then(cards => {
				// 	this.cards = cards
				// })
			}, 3000)


		} catch (e) {
			console.error(e);
		}

	},
	beforeCreate() {

	},
	methods: {

		async approve() {

		},
		inputDialogToggle() {
			this.$refs.inputDialog.open()
		},
		async dialogInputConfirm() {
			uni.showLoading({
				title: '更新赛道中...'

			})
			this.$refs.inputDialog.close()
			console.log("---------track------", this.setTrackId)
			try {
				let tx = await setTrack(this.runContract, this.setTrackId)
				await tx.wait()
			} catch (e) {
				console.error(e)
				//todo 错误提示
			} finally {
				uni.hideLoading()
			}




		},
		async dialogInputConfirm2(val) {
			console.log(val)
			try {
				let tx = await this.contract.addReferrerWithCheck(val)
				console.log(tx.hash)
				uni.showLoading({
					title: '请稍等...'
				})
				tx.wait().then(res => {
					uni.hideLoading()
				})
			} catch (e) {
				console.error(e)
			}

				// setTimeout(() => {
				// 	uni.hideLoading()
				// 	console.log(val)
				// 	this.value = val
				// 	// 关闭窗口后，恢复默认内容
				// 	this.$refs.isopen.close()
				// }, 3000)
			},
			// get() {
			// 	if (window.ethereum) {
			// 		window.ethereum.enable().then((res) => {
			// 			alert("当前钱包地址:" + res[0]);
			// 			this.myAccount = res[0];
			// 		});
			// 	} else {
			// 		alert("请安装MetaMask钱包");
			// 	}
			// },
			isMetaMask() {
				const {
					ethereum
				} = window;
				return Boolean(ethereum && ethereum.isMetaMask);
			},
			async getChainId() {
				const {
					ethereum
				} = window;
				try {
					const chainId = await ethereum.request({
						method: "eth_chainId"
					});
				} catch (err) {
					console.error(err);
				}
			},
			async getMetamskConnect() {
				if (!this.isMetaMask()) {
					openUrl("https://metamask.io/", "install metamsk");
				}
				if (window.ethereum) {
					try {
						const provider = new ethers.providers.Web3Provider(window.ethereum);
						this.myAccount = await provider.send("eth_requestAccounts", []);
						const signer = provider.getSigner();
						var balance = await signer.getBalance();
						let readercontract = new ethers.Contract(refStoreAddress, refAbi, provider);
						this.contract = readercontract.connect(signer)
						// console.log("accc",this.myAccount[0])
					} catch (error) {
						console.error(error);
					}
				} else {
					alert("请安装MetaMask钱包");
					console.warn("Please authorize to access tour account");
				}
			},

//

	}
}
</script>

<style>
	.userlogo{
		position: absolute;
		right: 0rpx;
		top: 300.88rpx;
		width: 180.83rpx;
	}
	.input_edi{
		position: absolute;
		width: 300.44rpx;
	}
	.input_logo{
		margin-left: 0.2rem;
		position: absolute;
		width: 70.44rpx;
	}
	.input_txt{
		color: #000000;
		position: absolute;
		margin-left: 2.5rem;
		text-align: center;
		height: 70.72rpx;
		line-height: 70.72rpx;
	}
	.user_person{
		position: absolute;
		height: 80%;
	}
	.user_person_item{
		position: absolute;
		height: 100%;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;

}

.bg {
	position: absolute;
	width: 100%;
	height: 26.875rem;
	left: 0px;
	top: 0px;
	background: linear-gradient(180deg, #FFF7B0 0%, rgba(255, 247, 176, 0) 100%);
	border-radius: 0px 0px 36px 36px;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;

}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}

/* 修改 */
.currentbs {
	display: flex;

	flex-direction: row;
	font-weight: bold;
	align-items: center;
	width: 6.25rem;
}

.currentImg {
	width: 0.625rem;
	height: 0.625rem;
	display: block;
	margin: auto 0;
	margin-left: 0.825rem;
}

.currentImg2 {
	width: 1.5rem;
	height: 1.5rem;
	display: block;
	margin: auto 0;
	margin-left: 0.825rem;
}

.userName {
	display: block;
	margin: auto 0;
	margin-left: 1.1rem;
		width: 10rem;
	height: 2.25rem;
}

.person {
	width: 30%;
	height: 21rem;
	margin: 0 auto;
}

.gp11 {
		margin-top: 5.2rem;
		margin-left: 0.625rem;
		width: 200.88rpx;
}

.gp12 {
		width: 200.88rpx;
		margin-left: 0.825rem;
}

/* //修改 */
.gp5 {
	width: 50%;
	margin: 0 auto;
	display: inline-block;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

}

.curId {
	width: 13.25rem;
	margin: 0.225rem;
}

.idvalue {
	margin-left: 9rem;
}

.idvalue2 {
	margin-left: 7rem;
}

.gp4 {
	display: inline-block;
	margin: 1.25rem auto;
	width: 30%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

}

.bs {
	width: 100%;
	display: inline-block;
	text-decoration: underline;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 0.85rem;
	margin: 0 auto;
	margin-top: -0.5rem;
	height: 69.44rpx;
	margin-bottom: 3rem;
	text-align: center;

}

.dialogimg {
	display: block;
	margin: 0 auto;
	width: 408.33rpx;
	height: 248.88rpx;
	padding: 6.94rpx;

}
</style>
>>>>>>> Stashed changes
