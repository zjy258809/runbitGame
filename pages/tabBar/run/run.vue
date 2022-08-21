<template>
	<view class="content">
		<view class="bg">

			<view class="uni-flex uni-row" style="margin: 1.425rem; height: 89.44rpx; ">
				<img class="flex-itemLogo" src="../../../static/heard.png" style="width:3.125rem;" />
				<img class="currentImg" src="../../../static/Ellipse38.png" />
				<view class="currentbs">3000步</view>
				<img class="userName" src="../../../static/Group3.png" />
			</view>

			<view style="margin-top: 123.88rpx; height:69.44rpx ; width: 90%; margin-left: 5%; ">
				<u-subsection activeColor="#FFEB34" font-size="15" :list="list" mode="subsection" :current="curNow"
					@change="sectionChange"></u-subsection>
				<view>
					<view v-if="curNow === 0">
						<view class="uni-flex uni-row"
							style="display: flex; margin:1rem 0px; height: 85.55rpx; width: 100%; ">
							<view style="width: 50%; margin: auto 0; ">
								<uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select>
							</view>
							<view @click="actionSheetTap" class="fillter">Fillter(0)</view>
							<image @click="actionSheetTap" class="filltericon" src="../../../static/Frame3.png"></image>

						</view>
						<oct-goods :lists="goodsArr" price-type="$" @onGoods="onGoods" />
					</view>
					<view v-if="curNow === 1">
						<view class="uni-flex uni-row"
							style="display: flex; margin:1rem 0px; height: 85.55rpx; width: 100%; ">
							<view style="width: 50%; margin: auto 0; ">
								<uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select>
							</view>
							<view @click="actionSheetTap" class="fillter">Fillter(0)</view>
							<image @click="actionSheetTap" class="filltericon" src="../../../static/Frame3.png"></image>

						</view>
						<oct-goods :lists="goodsArr" price-type="$" @onGoods="onGoods2" />

					</view>
				</view>
			</view>
		</view>
		<!-- 购买装备弹框 -->
		<view>
			<uni-popup ref="inputDialog" type="dialog">


				<uni-popup-dialog ref="inputClose" :mask-click="true" cancelText="兑换" confirmText="购买" title="购买"
					value="对话框预置提示内容!" placeholder="请输入内容" @confirm="dialogInputConfirm">
					<view>

						<image class="dialogimg" src="../../../static/Group12104.png"></image>
						<uni-card title="" extra=""
							style="width: 90%; border:1px solid black; border-radius: 0.825rem; background-color:#F4F5F6 ; margin: 1rem auto;">


							<view class="curId uni-flex uni-row">
								<view class="flex-item ">级别</view>
								<view class="flex-item idvalue2">稀有度</view>
							</view>


							<view class="curId uni-flex uni-row">
								<view class="flex-item">
									<image class="smicon " src="../../../static/Group11589.png"></image>
								</view>
								<view class="flex-item flex-itemValue idvalue2">4000</view>
							</view>

							<view class="curId uni-flex uni-row" style="margin-top: 0.8rem;">
								<view class="flex-item ">卡片槽</view>
								<view class="flex-item idvalue2">可升级</view>
							</view>

							<view class="curId uni-flex uni-row">
								<view class="flex-item flex-itemValue">90/100</view>
								<view class="flex-item flex-itemValue idvalue2">是</view>
							</view>

						</uni-card>

						<view class="uni-flex uni-row" style="width: 98%; margin: 0 auto;">
							<view class="flex-item id3">mint</view>
							<view class="idvalue3">X/Y</view>
						</view>
						<view class="uni-flex uni-row" style="width: 98%; margin: 10px auto;">
							<view class="flex-item id3">购买价格(RB)</view>
							<view class="idvalue3">7000</view>
						</view>
						<view class="uni-flex uni-row" style="width: 98%; margin: 10px auto;">
							<view class="flex-item id3">兑换价格(RB)</view>
							<view class="idvalue3">80</view>
						</view>

					</view>
				</uni-popup-dialog>

			</uni-popup>

		</view>

		<!-- 账户支出中 -->
		<view>
			<uni-popup ref="inputDialog2" type="dialog">


				<uni-popup-dialog ref="inputClose" mode="base" :mask-click="true" cancelText="" confirmText=""
					title="支出账户中" value="对话框预置提示内容!" placeholder="请输入内容" @confirm="dialogInputConfirm2">
					<view>

						<image class="dialogimg" src="../../../static/Frame4.png"></image>
						<uni-card title="" extra=""
							style="width: 90%; border:1px solid black; border-radius: 0.825rem; background-color:#F4F5F6 ; margin: 1rem auto;">


							<view class="curId uni-flex uni-row">
								<view class=" ">Don't worry! Just transferEnough SOL FromWallet To The spendingAccount
									And You AreGOOd TO GO!</view>
							</view>

						</uni-card>


						<view class="uni-flex uni-row" style="width: 98%; margin: 10px auto;">
							<view class="flex-item id3">cost</view>
							<view class="idvalue3">324185 OPC</view>
						</view>

					</view>
				</uni-popup-dialog>

			</uni-popup>

		</view>

		<!-- 购买卡片弹框 -->
		<view>
			<uni-popup ref="inputDialog3" type="dialog">


				<uni-popup-dialog ref="inputClose" :mask-click="true" cancelText="取消" confirmText="购买" title="购买"
					value="对话框预置提示内容!" placeholder="请输入内容" @confirm="dialogInputConfirm">
					<view>

						<img class="cards" src="../../../static/Group120021.png" />

						<view class="uni-flex uni-row" style="width: 98%; margin: 10px auto;">
							<view class="flex-item id3">mint</view>
							<view class="idvalue3">X/Y</view>
						</view>
						<view class="uni-flex uni-row" style="width: 98%; margin: 10px auto;">
							<view class="flex-item id3">购买价格(RB)</view>
							<view class="idvalue3">7000</view>
						</view>
						<view class="uni-flex uni-row" style="width: 98%; margin: 10px auto;">
							<view class="flex-item id3">兑换价格(RB)</view>
							<view class="idvalue3">80</view>
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
		BigNumber
	} from 'ethers'
	import {
		refStoreAddress,
		refAbi,
		RunbitCollectionAddress,
		RunbitCollectionAbi,
		RBAddress,
		RBAbi,
		RBCTAddress,
		RBETAddress,
		RBCTAbi,
		RBETAbi
	} from '../../../contract/address.js'
	import {
		useContract,
		getApproveState,
		contractApprove
	} from '../../../contract/useContract.js'
	import {big2num} from '../../../contract/ultis.js'
	export default {
		data() {
			return {
				buttonRect: {},
				value: "请选择",
				goodsArr: [{
					goods_id: "",
					cover: "https://t7.baidu.com/it/u=852388090,130270862&fm=193&f=GIF",
					name: "茅台王子酒 金王子 53度 500毫升",
					price: {
						price_min: 275
					}
				}, {
					goods_id: "",
					cover: "https://t7.baidu.com/it/u=1092574912,855301095&fm=193&f=GIF",
					name: "飞天53%vol 500ml贵州茅台酒（带杯）",
					price: {
						price_min: 1499
					}
				}],
				range: [{
						value: 0,
						text: "美观性"
					},
					{
						value: 1,
						text: "舒适性"
					},
					{
						value: 2,
						text: "功能性"
					},
				],
				curNow: 0,
				list: ['运动装备', '属性卡'],
				current: 0,
				colorIndex: 0,
				items: ['选项卡1', '选项卡2'],
				styleType: 'button',
				activeColor: '#FFEB34',
				contract: null
			}
		},
		mounted() {
			try {

				const provider = new ethers.providers.Web3Provider(window.ethereum);
				provider.send("eth_requestAccounts", []).then(accounts => {
					this.myAccount = accounts[0]

					//加载属性卡和装备库
					useContract(RunbitCollectionAddress, RunbitCollectionAbi).then(collectContract => {
						this.collectContract = collectContract
						this.getCards(collectContract)
						this.getEquips(collectContract)
					});
					//查询商店合约授权情况，授权后才能购买和兑换
					useContract(RBAddress, RBAbi).then(RBContract => {
						//获取rb余额
						RBContract.balanceOf(this.myAccount).then(balanceOfRB => {
							this.balanceOfRB = big2num(this.balanceOfRB)
						})
						//获取RB对商品合约的授权情况
						RBContract.allowance(this.myAccount, RunbitCollectionAddress).then(data => {
							if (data.eq(BigNumber.from(0))) {
								this.approveRB = false
							} else {
								this.approveRB = true
							}
						})
					});
					//获取属性卡碎片
					useContract(RBCTAddress, RBCTAbi).then(RBCTContract => {
						this.RBCTContract = RBCTContract
						RBCTContract.balanceOf(this.myAccount).then(balanceofRBCT => {
							this.balanceofRBCT = big2num(balanceofRBCT)
							console.log("balanceofRBCT", this.balanceofRBCT)
						})
						//获取RBCT属性卡碎片对商品合约的授权情况
						RBCTContract.allowance(this.myAccount, RunbitCollectionAddress).then(data => {
							if (data.eq(BigNumber.from(0))) {
								this.approveRBCT = false
							} else {
								this.approveRBCT = true
							}
							console.log("approveRBCT",this.approveRBCT)
						})
					});
					//获取装备碎片
					useContract(RBETAddress, RBETAbi).then(RBETContract => {
						this.RBETContract = RBETContract
						RBETContract.balanceOf(this.myAccount).then(balanceofRBET => {
							this.balanceofRBET = big2num(balanceofRBET)
							console.log("balanceofRBET", this.balanceofRBET)
						})
						//获取RBET装备碎片对商品合约的授权情况
						RBETContract.allowance(this.myAccount, RunbitCollectionAddress).then(data => {
							if (data.eq(BigNumber.from(0))) {
								this.approveRBET = false
							} else {
								this.approveRBET = true
							}
							console.log("approveRBET",this.approveRBET)
						})
					});


				});



			} catch (e) {
				console.error(e);
			}

		},
		methods: {
			actionSheetTap() {
				const that = this
				uni.showActionSheet({
					title: '装备筛选',
					itemList: ['鞋子', '裤子', '上衣'],
					popover: {
						// 104: navbar + topwindow 高度，暂时 fix createSelectorQuery 在 pc 上获取 top 不准确的 bug
						top: that.buttonRect.top + 104 + that.buttonRect.height,
						left: that.buttonRect.left + that.buttonRect.width / 2
					},
					success: (e) => {
						console.log(e.tapIndex);
						uni.showToast({
							title: "点击了第" + e.tapIndex + "个选项",
							icon: "none"
						})
					}
				})
			},
			onGoods() {
				this.$refs.inputDialog.open()
			},
			// 卡片购买
			onGoods2() {
				this.$refs.inputDialog3.open()
			},
			sectionChange(index) {
				this.curNow = index;

			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			dialogInputConfirm(val) {

				this.$refs.inputDialog.close()
				setTimeout(() => {
					uni.hideLoading()
					console.log(val)
					this.value = val
					// 关闭窗口后，恢复默认内容
					this.$refs.inputDialog2.open()
				}, 3000)
			},
			dialogInputConfirm2(val) {
				this.$refs.inputDialog2.close()

			},
			change() {

			},
			async getCards(contract) {
				//获取属性卡数量numOfCard和属性卡合集cardCollect
				//cardLoading=true获取数据中
				var numOfCard, cardCollect = [],
					cardLoading = true;

				contract.getCardCollectCount().then(num => {
					var card
					for (let i = 0; num && i < num; i++) {
						contract.getCardCollection(i).then(cardResult => {
						card.card=cardResult
						card.collection_id = i
						// todo通过接口获取card的图片
						// cardImg = getImage(0,i)
						// card.img = cardImg
							cardCollect[i] = card
							cardLoading = false
						})
					}

					console.log("card", cardCollect)
				});
			},
			//获取装备集合
			async getEquips(contract) {
				//获取装备数量numOfEquip和装备合集equipCollect
				var numOfEquip, equipCollect = [],
					equipLoading = true;
				contract.getEquipCollectCount().then(num => {
					for (let i = 0; num && i < num; i++) {
						var equip ={}
						contract.getEquipCollection(i).then(equipResult => {
						equip.equip=equipResult
						equip.collection_id = i
						// todo通过接口获取equip的图片
						// equipImg = getImage(0,i)
						// equip.img = equipImg
							equipCollect[i] = equip
							equipLoading = false;
						})
					}
					console.log("equip", equipCollect)
				});
			},
			//购买卡片
			async buyCard(contract, collection_id) {
				try {
					//todo
					//判断余额是否不足,弹窗。
					// if{this.balanceOfRB<this.cardCollect[cardId].price1}
					//判断是否授权RB 
					if (!this.approveRB) {
						//未授权，弹窗提示授权？
						//to-do
						return
						//todo用户点击确认授权后，调用授权代码，如下						
						await contractApprove(RunbitCollectionAddress)
						this.approveRB = true
						console.log("approveState2", this.approveRB)


					}
					//已授权RB
					let tx = await contract.buyCard(collection_id)
					//交易hash
					console.log("buycard", tx.hash)
					tx.wait().then(res => {
						//todo购买成功的一些操作，如关闭loading
					})

				} catch (e) {
					//todo出错的一些操作

					console.error(e)
				}
			},
			//购买装备
			async buyEquip(contract, collection_id) {
				try {
					//判断是否授权RB和装备碎片的消费
					if (!this.approveRB) {
						//todo未授权，弹窗提示授权？
						return
						//todo用户点击确认授权后，调用授权代码，如下						
						await contractApprove(this.RBContract,RunbitCollectionAddress)
						this.approveRB = true
						console.log("approveRB", this.approveRB)


					}					
					//已授权
					let tx = await contract.buyEquip(collection_id)
					//交易hash
					console.log(tx.hash)
					tx.wait().then(res => {
						//todo购买成功的一些操作，如关闭loading
					})

				} catch (e) {
					//出错的一些操作

					console.error(e)
				}
			},
			//兑换属性卡
			async redeemCard(contract, cardId) {
				try {
					//先判断是否授权花费碎片
					if (!this.approveRB) {
						//未授权，弹窗提示授权？
						return
						//用户点击确认授权后，调用授权代码，如下						
						await contractApprove(RunbitCollectionAddress)
						this.approveRB = true
						console.log("approveRB", this.approveRB)


					}
					//再判断是否授权属性卡碎片的消费
					if (!this.approveRBCT) {
						//todo未授权，弹窗提示授权？
						return
						//todo用户点击确认授权后，调用授权代码，如下						
						await contractApprove(this.RBCTContract,RunbitCollectionAddress)
						this.approveRBCT = true
						console.log("approveRBCT", this.approveRBCT)
					}
					//已授权
					let tx = await contract.redeemCard(cardId)
					//交易hash
					console.log(tx.hash)
					tx.wait().then(res => {
						//兑换成功的一些操作，如关闭loading
					})

				} catch (e) {
					//出错的一些操作

					console.error(e)
				}
			},
			//兑换装备
			async redeemEquip(contract, equipId) {
				try {
					//判断是否授权
					if (!this.approveRB) {
						//未授权，弹窗提示授权？
						return
						//用户点击确认授权后，调用授权代码，如下						
						await contractApprove(RunbitCollectionAddress)
						this.approveRB = true
						console.log("approveRB", this.approveRB)


					}
					//再判断是否授权属性卡碎片的消费
					if (!this.approveRBET) {
						//todo未授权，弹窗提示授权？
						return
						//todo用户点击确认授权后，调用授权代码，如下						
						await contractApprove(this.RBETContract,RunbitCollectionAddress)
						this.approveRBET = true
						console.log("approveRBET", this.approveRBET)
					}
					//已授权
					let tx = await contract.redeemEquip(equipId)
					//交易hash
					console.log(tx.hash)
					tx.wait().then(res => {
						//兑换成功的一些操作，如关闭loading
					})

				} catch (e) {
					//出错的一些操作

					console.error(e)
				}
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
		height: 8.875rem;
		left: 0px;
		top: 0px;
		background: linear-gradient(180deg, #FFF7B0 0%, rgba(255, 247, 176, 0) 100%);
		border-radius: 0px 0px 36px 36px;
	}

	.currentbs {
		display: flex;

		flex-direction: row;
		font-weight: bold;
		align-items: center;
		width: 7.25rem;
	}

	.currentImg {
		width: 0.625rem;
		height: 0.625rem;
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

	.fillter {
		margin: auto 0;
		margin-left: 126.94rpx;
	}

	.filltericon {

		width: 50.83rpx;
		height: 45.83rpx;
		margin: auto 0;
		padding-top: 18.94rpx;

	}

	.dialogimg {
		display: block;
		margin: 0 auto;
		width: 350.33rpx;
		height: 308.88rpx;
		padding: 6.94rpx;

	}

	.curId {
		width: 13.25rem;
		margin: 0.225rem;
	}

	.idvalue2 {
		margin-left: 7rem;
	}

	.idvalue3 {
		width: 75%;
		text-align: right;
		float: right;
	}

	.smicon {
		width: 43.88rpx;
		height: 23.88rpx;
	}

	.flex-item {
		width: 95.55rpx;
		height: 34.72rpx;
		text-align: center;
	}

	.flex-itemLogo {
		width: 3.125rem;
		text-align: center;
	}

	.flex-itemValue {
		color: #000;
	}

	.id3 {

		color: #969696;
		width: 7.55rem;
		font-size: 0.90rem;
		text-align: left;
	}

	/* 图片居中 */
	.cards {
		width: 60%;
		margin: 0 auto;
		display: inline-block;
		margin: 1.25rem auto;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
