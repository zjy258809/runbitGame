<template>
	<view class="content">
		<view class="top">
			<view class="uni-flex uni-row head">
				<img class="logo1" @tap="back" src="../../static/Group115822.png" />
				<view class="logoTx">賬戶</view>
				<img @tap="setting" class="logo2" src="../../static/Group12016.png" />
			</view>

			<view style="margin-top: 180rpx; height:69.44rpx ; width: 90%; margin-left: 5%; ">
				<u-subsection activeColor="#FFEB34" font-size="15" :list="list" mode="subsection" :current="curNow"
					@change="sectionChange"></u-subsection>
				<view>
					<!-- 账户 -->
					<view v-if="curNow === 0">
						<uni-card title="" extra=""
							style="width: 90%; border:2px solid black; border-radius: 0.825rem; background-color:#FFF ; margin: 2rem auto;">


							<view @tap="openRb" class="curId uni-flex uni-row">
								<image class="smicon " src="../../static/Group120121.png"></image>
								<view class="level ">RB</view>
								<view class="rare">{{ balanceOfRB }}</view>
							</view>
							<view
								style="width: 100%;height: 0.0625rem;background-color: #000000; margin-top: 0.5rem; margin-bottom: 1rem;">
							</view>

							<view class="curId uni-flex uni-row">
								<image class="smicon " src="../../static/Group120122.png"></image>
								<view class="level">属性卡碎片</view>
								<view class="rare">{{ balanceofRBCT }}</view>
							</view>
							<view
								style="width: 100%;height: 0.0625rem;background-color: #000000; margin-top: 0.5rem; margin-bottom: 1rem;">
							</view>

							<view class="curId uni-flex uni-row">
								<image class="smicon " src="../../static/Group120671.png"></image>
								<view class="level ">装备碎片</view>
								<view class="rare">{{ balanceofRBET }}</view>
							</view>


						</uni-card>

						<view class="uni-flex uni-row" style="margin-bottom: 1rem;">
							<!-- <view @tap="recordList(0)" :class="curList == 0 ? 'recordList' : 'recordList2'">未完成</view> -->
							<view @tap="recordList(1)" :class="curList == 1 ? 'recordList' : 'recordList2'">歷史記錄</view>
						</view>
						<view v-if="curList == 0">
							<view style="" class="text" v-for="(item, index) in pending" :key="index">
								<uni-card title="" extra=""
									style="width: 90%; border-radius: 0.825rem; background-color:#FFF ; margin: 0.35rem auto;">


									<view class="curId uni-flex uni-row">
										<view class="level2">{{ item.lable }}</view>
										<view class="level3">{{ item.num }}</view>
										<view class="level4">{{ item.time }}</view>
									</view>




								</uni-card>
							</view>
							<img class="nocard" v-show="pending.length == 0" src="../../static/Group12015.png" />
						</view>
						<view v-if="curList == 1">
							<view style="" v-if="history.length > 0" class="text" v-for="(item, index) in history"
								:key="index">
								<uni-card title="" extra=""
									style="width: 90%; border-radius: 0.825rem; background-color:#FFF ; margin: 0.35rem auto;">


									<view class="curId uni-flex uni-row">
										<view class="level2">{{ displayAdddress(item.tx_hash) }}</view>
										<view class="level3">{{ item.tx_method }}</view>
										<view class="level4">{{ displayTime(item.create_time) }}</view>
									</view>




								</uni-card>
							</view>
							<img class="nocard" v-if="history.length == 0" src="../../static/Group12015.png" />
						</view>



					</view>
					<!-- 收益 -->
					<view v-if="curNow === 1">
						<uni-card title="" extra=""
							style="width: 90%; border:2px solid black; border-radius: 0.825rem; background-color:#FFF ; margin: 2rem auto;">


							<view class="curId uni-flex uni-row">
								<view class="level ">未領取收益</view>
								<view class="rare" style="color: #FF5C00;">{{ big2num(unclaimReward) }} RB</view>
							</view>
							<view
								style="width: 100%;height: 0.0625rem;background-color: #000000; margin-top: 0.5rem; margin-bottom: 1rem;">
							</view>

							<view class="curId uni-flex uni-row">
								<view class="level ">已領取收益</view>
								<view class="rare">{{ claimedReward }} RB</view>
							</view>




						</uni-card>
						<img class="gp5" @tap="claim" src="../../static/Group11571.png" />

						<view class="uni-flex uni-row">
							<view @tap="recordList(0)" class="recordList">收益記錄 </view>
							<view style=" width: 70%; text-align: right;" @click="getHarvest(-1)">
								<image style="height: 55.72rpx; width: 180.44rpx;" src="../../static/Group16.png">
								</image>
							</view>
						</view>
						<view style="" class="text" v-for="(item, index) in harvest" :key="index">
							<uni-card title="" extra=""
								style="width: 90%; border-radius: 0.825rem; background-color:#FFF ; margin: 0.35rem auto;">


								<view class="curId uni-flex uni-row">
									<view class="level4">{{ block2date(index) }}</view>
									<view class="level3">+{{ getFix2(item.amount) }}RB </view>
									<view v-if="item.status == 0" style="width: 3.125rem; color: #FF5C00;">未收穫</view>
									<view v-if="item.status == 1" style="width: 3.125rem; color: #969696;">已收穫</view>
									<!-- <img class="leLogo"
										:src="item.status == 0 ? '../../static/Group15-1.png' : '../../static/Group15.png'"
										@click="getHarvest(index)" /> -->
								</view>




							</uni-card>
						</view>

					</view>
					<!-- 抽奖 -->
					<view v-if="curNow === 2">
						<uni-card title="" extra=""
							style="width: 90%; border:2px solid black; border-radius: 0.825rem; background-color:#FFF ; margin: 2rem auto;">


							<view @tap="openRb" class="curId uni-flex uni-row">
								<image class="smicon " src="../../static/Group120121.png"></image>
								<view class="level ">RB</view>
								<view class="rare">{{ lottery.rb }}</view>
							</view>
							<view
								style="width: 100%;height: 0.0625rem;background-color: #000000; margin-top: 0.5rem; margin-bottom: 1rem;">
							</view>

							<view class="curId uni-flex uni-row">
								<image class="smicon " src="../../static/Group120122.png"></image>
								<view class="level ">属性卡碎片</view>
								<view class="rare">{{ lottery.rbct }}</view>
							</view>
							<view
								style="width: 100%;height: 0.0625rem;background-color: #000000; margin-top: 0.5rem; margin-bottom: 1rem;">
							</view>

							<view class="curId uni-flex uni-row">
								<image class="smicon " src="../../static/Group120671.png"></image>
								<view class="level ">裝備碎片</view>
								<view class="rare">{{ lottery.rbet }}</view>
							</view>


						</uni-card>

						<view @tap="recordList(0)" class="recordList">獲獎記錄</view>
						<view style="" v-if="lotteryRec.length>0" class="text" v-for="(item, index) in lotteryRec"
							:key="index">
							<uni-card title="" extra=""
								style="width: 90%; border-radius: 0.825rem; background-color:#FFF ; margin: 0.35rem auto;">


								<view class="curId uni-flex uni-row">
									<view class="level4">{{ block2date(index) }}</view>

									<img class="leLogo2"
										:src="item.status == 0 ? '../../static/Group15-1.png' : '../../static/Group15.png'"
										@click="winClick(item.status, index)" />
								</view>

								<view class="uni-flex uni-row">
									<view class="level4 uni-flex uni-row">
										<image class="smicon " src="../../static/Group120121.png"></image>
										<view style="margin-left: 0.325rem;">{{ item.rb }}</view>
									</view>
									<view class="level3-2 uni-flex uni-row">
										<image class="smicon " src="../../static/Group120122.png"></image>
										<view style="margin-left: 0.325rem;">{{ item.rbct }}</view>
									</view>

									<view class="level4 uni-flex uni-row">
										<image class="smicon " src="../../static/Group120671.png"></image>
										<view style="margin-left: 0.325rem;">{{ item.rbet }}</view>
									</view>
								</view>




							</uni-card>
						</view>

					</view>
				</view>
			</view>

		</view>

		<view>
			<!-- 获奖弹框 -->
			<uni-popup ref="inputDialog2" type="dialog">


				<uni-popup-dialog ref="inputClose" mode="base" :mask-click="true" cancelText="取消" confirmText="領取"
					title="通知" value="对话框预置提示内容!" placeholder="請輸入內容" @confirm="getLottery(lotindex)">
					<view>


						<view v-if="lotindex" style="width: 100%; margin: 10px auto;">
							<view class="id4">恭喜中獎！本次獲得</view>
							<view class="uni-flex uni-row">
								<view class="win1 ">
									<image class="smicon win1Logo" src="../../static/Group120121.png"></image>
									<view style="margin-left: 0.325rem;">{{ lotteryRec[lotindex].rb }}</view>
								</view>
								<view class="win1 ">
									<image class="smicon win1Logo" src="../../static/Group120122.png"></image>
									<view style="margin-left: 0.325rem;">{{ lotteryRec[lotindex].rbct }}</view>
								</view>
								<view class="win1 ">
									<image class="smicon win1Logo" src="../../static/Group120671.png"></image>
									<view style="margin-left: 0.325rem;">{{ lotteryRec[lotindex].rbet }}</view>
								</view>
							</view>
							<view class="id4">將直接方法至您的帳戶!</view>
						</view>

					</view>
				</uni-popup-dialog>

			</uni-popup>

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
		RunbitAddress,
		RunbitAbi
	} from '../../contract/address.js'
	import {
		useContract,
		hideBankCards
	} from '../../contract/useContract.js'
	import {
		big2num,
		displayDate,
		getDay

	} from '../../contract/ultis.js'
	import {
		myRequest
	} from '../../utils/api.js'

	export default {
		data() {
			return {
				curList: 1,
				curNow: 0,
				pending: [],
				history: [],
				harvest: {},

				lotteryRec: [],

				list: ['錢包', '收益', '抽獎'],
				balanceOfRB: 0,
				balanceofRBCT: 0,
				balanceofRBET: 0,
				balanceofUSDT: 0,
				unclaimReward: 0,
				claimedReward: 0,
				startDate: '2022-08-25',
				endDate: '2022-08-25',
				lottery: {
					rb: 10,
					rbct: 20,
					rbet: 30
				},
				lotindex: ''

			}
		},

		onLoad() {
			var that = this;
			try {

				const provider = new ethers.providers.Web3Provider(window.ethereum);
				provider.getBlock().then(block => {
					//按天算，默认查询近7天数据,不含当天
					console.log(block);
					this.endDate = getDay(block.timestamp * 1000, -1)
					this.startDate = getDay(block.timestamp * 1000, -8)

					var start = this.date2block(this.startDate)
					var end = this.date2block(this.endDate)
					console.log("block------", start, "end--", end)

					provider.send("eth_requestAccounts", []).then(accounts => {
						this.myAccount = "0x39BbEf9fcFA566727874BFc3597B41D04A72FfF9"
						this.getHistory();
						this.getLotteryRecords();

						useContract(RunbitAddress, RunbitAbi).then(runContract => {
							this.runContract = runContract
							for (let day = end; day >= start; day--) {
								this.runContract.getUserState(this.myAccount, day).then(res => {

									//未收获
									this.runContract.getUnharvestReward(this.myAccount,
										day).then(rew => {
										console.log("---" + day + "----" + big2num(
											rew))
										if (!rew.eq(0)) {
											var data = {}
											data.amount = big2num(rew)
											data.status = res.status
											this.harvest[day] = data
										}
									})

									// //有步数查询是否中奖，抽奖状态
									// if (!res.lastSteps.eq(0)) {
									// 	this.runContract.isLucky(this.myAccount, day).then(
									// 		lott => {
									// 			if (!lott[0].eq(0) || !lott[1].eq(0) ||
									// 				!lott[2].eq(0)) {
									// 				//中奖
									// 				var data = {}
									// 				data.rb = big2num(lott[0])
									// 				data.rbct = lott[1]
									// 				data.rbet = lott[2]
									// 				data.status = res.lottery

									// 				console.log("state------", lott)
									// 				this.lotteryRec[day] = data

									// 			}
									// 		})
									// }
								})

							}
						})
					});
				});
				useContract(RBAddress, RBAbi).then(RBContract => {
					//获取rb余额
					RBContract.balanceOf(this.myAccount).then(balanceOfRB => {
						this.balanceOfRB = big2num(balanceOfRB)
					})

				});
				//获取属性卡碎片
				useContract(RBCTAddress, RBCTAbi).then(RBCTContract => {
					this.RBCTContract = RBCTContract
					RBCTContract.balanceOf(this.myAccount).then(balanceofRBCT => {
						this.balanceofRBCT = parseInt(balanceofRBCT)
					})
				});
				//获取装备碎片
				useContract(RBETAddress, RBETAbi).then(RBETContract => {
					this.RBETContract = RBETContract
					RBETContract.balanceOf(this.myAccount).then(balanceofRBET => {
						this.balanceofRBET = parseInt(balanceofRBET)
					})
				})
				setTimeout(() => {

				}, 5000);
			} catch (e) {
				console.error(e);
			}
		},
		methods: {
			big2num,
			async getLottery(index) {
				uni.showLoading({
					title: '正在收获...',
					mask: true
				})
				try {
					this.runContract.lottery(index).then(res => {
						uni.hideLoading()
						uni.showToast({
							title: '获取成功',
							mask: true,
							icon: 'success'
						})
					})

				} catch (e) {} finally {
					uni.hideLoading()
				}
			},
			displayAdddress(address) {
				return address.substring(0, 4) + "..." + address.substring(address.length - 5, address.length - 1)
			},
			getFix2(num) {
				var value = parseFloat(num)
				return value.toFixed(2)
			},
			async getLotterySum() {
				await myRequest({
					url: 'game/getLotteryTotal',
					data: {
						addr: this.myAccount,
						// start: start,
						// end: end
					}
				}).then(data => {
					this.lottery.rb = data.rb ? data.rb : 0
					this.lottery.rbct = data.rbct ? data.rbct : 0
					this.lottery.rbet = data.rbet ? data.rbet : 0

				})
			},
			async getHarvest(index) {
				//一键收获
				if (index == -1) {
					//提示框，是否继续
					uni.showLoading({
						title: '一键收获...',
						mask: true
					})
					var start = this.date2block(this.startDate)
					var end = this.date2block(this.endDate) + 1
				} else {
					var start = index
					var end = index + 1

				}
				uni.showLoading({
					title: '正在收获...',
					mask: true
				})
				try {
					this.runContract.harvest(start, end).then(res => {
						uni.hideLoading()
						uni.showToast({
							title: '获取成功',
							mask: true,
							icon: 'success'
						})
					})

				} catch (e) {
					let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""
					uni.showToast({
						title: "收获失败" + ":" + reason,
						icon: "none"
					})
				} finally {
					uni.hideLoading()
				}

			},
			block2date(block) {
				let date = new Date((block * 86400 - 28800) * 1000)
				let month = date.getMonth() + 1
				return date.getFullYear() + '-' + month + '-' + date.getDate()
			},
			date2block(date) {
				return Math.trunc((new Date(date).getTime() / 1000 + 28800) / 86400)
			},

			//切换tab
			sectionChange(index) {
				this.curNow = index;
				//加载收益
				if (index === 1) {
					this.getUnclaimReward()
					this.getClaimedReward()
				}
				if (index == 2) {

					this.getLotterySum()
				}

			},
			recordList(index) {
				this.curList = index;
			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			openRb() {
				uni.navigateTo({
					url: '../userRb/userRb'
				});
			},
			setting() {
				uni.navigateTo({
					url: '../userSetting/userSetting'
				});
			},
			winClick(status, index) {
				if (!status) this.$refs.inputDialog2.open()
				this.lotindex = index
			},
			/**钱包相关 */

			/**收益 */
			//未领取收益
			getUnclaimReward() {
				this.runContract.getUnclaimReward(this.myAccount).then(reward => {
					this.unclaimReward = reward
				})

			},
			//已领取记录
			async getClaimedReward() {
				await myRequest({
					url: 'game/getEarningsTotal',
					data: {
						addr: this.myAccount
					}
				}).then(res => {
					this.claimedReward = res
				})
			},
			displayTime(time)
			{
				let appointDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(time)[0];
				return appointDate;
			},
			//领取收益
			async claim() {
				if (this.unclaimReward == 0) {
					uni.showToast({
						title: "无可领取收益",
						icon: "none"
					})
					return
				}
				let tx = await this.runContract.claim(this.unclaimReward, this.myAccount)
				try {
					tx.wait().then(res => {
						uni.showToast({
							title: "领取成功",
							icon: "success"
						})
					})
				} catch (e) {
					uni.showToast({
						title: "领取失败，请稍后再试",
						icon: "none"
					})
				}

			},
			//已领取记录
			async getHistory() {
				await myRequest({
					url: 'game/getHistory',
					data: {
						addr: this.myAccount
					}
				}).then(res => {
					console.log(res);
					this.history = res.list
				})
			},
			
			//获取领奖记录
			async getLotteryRecords() {
				await myRequest({
					url: 'game/getLotteryRecords',
					data: {
						addr: this.myAccount
					}
				}).then(res => {
					console.log(res);
					this.lotteryRec = res.list
				})
			},
			//收益记录






		}
	}
</script>

<style>
	.id4 {
		margin-top: 0.625rem;
		width: 100%;
		text-align: center;
		color: #000000;
		font-size: 0.9375rem;
		font-weight: bold;
	}

	.win1Logo {
		margin-top: 0.9375rem;
	}

	.win1 {
		margin: 0.625rem;
		text-align: center;
		background-color: #F4F5F6;
		height: 4.5rem;
		width: 4.5rem;
		border-radius: 1rem;
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

	.leLogo {
		width: 3.125rem;
	}

	.leLogo2 {
		width: 3.125rem;
		position: absolute;
		right: 1.25rem;
	}

	.head {
		width: 100%;
		height: 5.25rem;
		position: absolute;
	}

	.gp5 {
		display: inline-block;
		margin: 1.8rem auto;
		width: 40%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;

	}

	.logoTx {
		font-size: 1rem;
		color: #000000;
		font-weight: bold;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;


	}

	.top {
		position: absolute;
		width: 100%;
		height: 27.375rem;
		left: 0px;
		top: 0px;

		background: linear-gradient(180deg, #FFF7B0 0%, rgba(255, 247, 176, 0) 100%);
		border-radius: 0px 0px 36px 36px;
	}

	.level {
		color: #000;
		width: 180.55rpx;
		height: 50.72rpx;
		text-align: left;
		padding-left: 0.625rem;
		font-size: 1rem;
		line-height: 50rpx;
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
		width: 160.55rpx;
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

	.level3-2 {
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
	}

	.rare {
		color: #000;
		height: 50.72rpx;
		text-align: center;
		position: absolute;
		right: 2rem;
		font-size: 1rem;
		line-height: 50rpx;
		font-weight: bold;

	}

	.smicon {
		width: 50.88rpx;
		height: 50.88rpx;
	}

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
</style>
