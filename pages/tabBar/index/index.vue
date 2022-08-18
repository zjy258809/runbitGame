<template>
	<view class="content">

			<view class="bg">

				<view class="uni-flex uni-row" style="margin: 1.425rem; height: 89.44rpx; ">
					<img class="flex-item" src="../../../static/heard.png" style="width:3.125rem;" />
					<img class="currentImg" src="../../../static/Ellipse38.png" />
					<view class="currentbs">在线300步</view>
					<img class="userName" src="../../../static/Group3.png" />
				</view>

				<view class="person">
					<img class="gp11 gp12" src="../../../static/Group11.png" />
					<img class="gp12" src="../../../static/Group12070.png" />
					<img class="gp12" src="../../../static/Group12071.png" />
				</view>

				<img class="gp5" @tap="inputDialogToggle()" src="../../../static/Group5-1.png" />

				<uni-card title="" extra="" style="width: 70%; margin: 0.625rem auto;">
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
						<img class="currentImg2" src="../../../static/Vector14.png" />

						<view class="uni-flex uni-column">

							<view class="curId uni-flex uni-row">
								<view class="flex-item ">预计收益</view>
								<view class="flex-item idvalue2">10000</view>
							</view>

						</view>

					</view>

				</uni-card>

				<img @tap="getDay()" class="gp4" src="../../../static/Group4.png" />

				<view class="bs">已同步1000步</view>

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
	export default {
		data() {
			return {
				value: '',
				type: 'center',
				scrrenHeight: 10,
				value: "",
				title: 'Hello',
				layerAddress:'',
				rpcaddr:'',
				myAccount: '',
				layerAbi:'',
			}
		},
		onLoad() {
        this.rpcaddr = getApp().globalData.rpcaddr;
		 this.layerAddress = getApp().globalData.layerAddress;
		  this.layerAbi = getApp().globalData.layerAbi;
		},
		mounted() {
			this.scrrenHeight = uni.getSystemInfoSync().windowHeight;
			// this.$refs.isopen.open();
		},
		beforeCreate() {

		},
		methods: {
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			dialogInputConfirm(val) {
				uni.showLoading({
					title: '3秒后会关闭'
				})

				setTimeout(() => {
					uni.hideLoading()
					console.log(val)
					this.value = val
					// 关闭窗口后，恢复默认内容
					this.$refs.inputDialog.close()
				}, 3000)
			},
			dialogInputConfirm2(val) {
				uni.showLoading({
					title: '3秒后会关闭'
				})
			
				setTimeout(() => {
					uni.hideLoading()
					console.log(val)
					this.value = val
					// 关闭窗口后，恢复默认内容
					this.$refs.isopen.close()
				}, 3000)
			},
			get() {
				if (window.ethereum) {
					window.ethereum.enable().then((res) => {
						alert("当前钱包地址:" + res[0]);
						this.myAccount = res[0];
					});
				} else {
					alert("请安装MetaMask钱包");
				}
			},

			async getDay() {
				const _this = this
				window.web3 = new this.Web3(window.ethereum)

				let contract = new web3.eth.Contract(_this.layerAbi, _this.layerAddress);
				let gasPrice = await web3.eth.getGasPrice() * 2;
				contract.methods.transfer("1000").send({
						from: "0xb9eaE99d3E3a1fD3bBf1De4c635114063F6e3573",
						gas: 1200000,
						gasPrice: gasPrice
					},
					function(error, transactionHash) {
						if (!error) {

						} else {
							console.log(error);
						}
					});

				// var Referrer = await contract.methods.referrer("0xb9eaE99d3E3a1fD3bBf1De4c635114063F6e3573").call();

				// let contract = new window.web3.eth.Contract(_this.layerAbi, _this.layerAddress);
				// var Referrer =  contract.methods.getDay().call();



			}


		}
	}
</script>

<style>
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
		width: 9rem;
		height: 2.25rem;
	}

	.person {
		width: 30%;
		height: 21rem;
		background-image: url(../../../static/Group5.png);
		background-repeat: no-repeat, repeat;
		margin: 0 auto;
	}

	.gp11 {
		margin-top: 3.4rem;
	}

	.gp12 {
		margin-left: 0.625rem;
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
