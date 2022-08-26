<template>
	<view class="content">
		<view class="bg">

			<view class="uni-flex uni-row" style="margin: 1.425rem; height: 89.44rpx; ">
				<img class="flex-itemLogo" src="../../../static/heard.png" style="width:3.125rem;" />
				<img class="currentImg" src="../../../static/Ellipse38.png" />
				<view class="currentbs">{{getSteps}}步</view>
				<view class="userName">
					<img class="input_edi" src="../../../static/input_edi.png"></img>
					<img class="input_logo" src="../../../static/inputlogo.png"></img>
					<view class="input_txt">{{userAccount}}</view>
				</view>
			</view>

			<view style="margin-top: 123.88rpx; height:69.44rpx ; width: 100%;">
				<u-subsection style="width: 90%; margin-left: 5%;" activeColor="#FFEB34" font-size="15" :list="list"
					mode="subsection" :current="curNow" @change="sectionChange"></u-subsection>
				<view>
					<view v-if="curNow === 0" style="background:#FFFDEC">
						<view class="uni-flex uni-row"
							style="display: flex; margin:1rem 0px; height: 85.55rpx; margin-left: 5%; width: 90%; ">
							<view style="width: 50%; margin: auto 0;  ">
								<uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select>
							</view>
							<!-- <view @click="actionSheetTap" class="fillter">Fillter(0)</view> -->
							<!-- <image @click="actionSheetTap" class="filltericon" src="../../../static/Frame3.png"></image> -->

						</view>
						<oct-goods :lists="equipCollect" price-type="$" @onGoods="onGoods" />
					</view>
					<view v-if="curNow === 1" style="background:#FFFDEC">
						<view class="uni-flex uni-row"
							style="display: flex; margin:1rem 0px; height: 85.55rpx;margin-left: 5%; width: 90%; ">
							<view style="width: 50%; margin: auto 0; ">
								<uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select>
							</view>

						</view>
						<cardItem :lists="cardCollect" price-type="$" @onGoods="onGoods2" />

					</view>
				</view>
			</view>
		</view>
		<!-- 购买装备弹框 -->
		<view>
			<uni-popup ref="inputDialogs" v-if="isOpen" type="dialog">


				<uni-popup-dialog ref="inputClose" :mask-click="false" cancelText="兑换" confirmText="购买" title="购买"
					value="对话框预置提示内容!" placeholder="请输入内容" @close="redeemCardBtn" @confirm="dialogInputConfirm">
					<view>

						<image class="dialogimg" :src="currentEquips.cover"></image>
						<uni-card title="" extra=""
							style="width: 90%; border:1px solid black; border-radius: 0.825rem; background-color:#F4F5F6 ; margin: 1rem auto;">


							<view class="curId uni-flex uni-row">
								<view class="flex-item ">级别</view>
								<view class="flex-item idvalue2">稀有度</view>
							</view>


							<view class="curId uni-flex uni-row">
								<view class="flex-item">
									<image class="smicon " src="../../../static/Group115861.png"></image>
									<image v-if="currentEquips.equip.level>=2" class="smicon "
										src="../../../static/Group115861.png"></image>
									<image v-if="currentEquips.equip.level>=3" class="smicon "
										src="../../../static/Group115861.png"></image>
									<image v-if="currentEquips.equip.level>=4" class="smicon "
										src="../../../static/Group115861.png"></image>
									<image v-if="currentEquips.equip.level>=5" class="smicon "
										src="../../../static/Group115861.png"></image>
								</view>
								<view class="flex-item flex-itemValue idvalue2">{{currentEquips.equip.quality}}</view>
							</view>

							<view class="curId uni-flex uni-row" style="margin-top: 0.8rem;">
								<view class="flex-item ">卡片槽</view>
								<view class="flex-item idvalue2">可升级</view>
							</view>

							<view class="curId uni-flex uni-row">
								<view class="flex-item flex-itemValue">{{currentEquips.equip.capacity}}/3</view>
								<view v-if="currentEquips.equip.upgradeable==0"
									class="flex-item flex-itemValue idvalue2">否</view>
								<view v-if="currentEquips.equip.upgradeable==1"
									class="flex-item flex-itemValue idvalue2">是</view>
							</view>

						</uni-card>

						<view class="uni-flex uni-row" style="width: 98%; margin: 0 auto;">
							<view class="flex-item id3">mint</view>
							<view class="idvalue3">{{currentEquips.equip.sales}}/{{currentEquips.equip.stock}}</view>
						</view>
						<view class="uni-flex uni-row" style="width: 98%; margin: 10px auto;">
							<view class="flex-item id3">购买价格(RB)</view>
							<view class="idvalue3">{{currentEquips.equip.price1/1000000000000000000}}</view>
						</view>
						<view class="uni-flex uni-row" style="width: 98%; margin: 10px auto;">
							<view class="flex-item id3">兑换价格(RB)</view>
							<view class="idvalue3">{{currentEquips.equip.price0}}</view>
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

						<image class="dialogimg" :src="currentcover"></image>
						<uni-card title="" extra=""
							style="width: 90%; border:1px solid black; border-radius: 0.825rem; background-color:#F4F5F6 ; margin: 1rem auto;">


							<view class="curId uni-flex uni-row">
								<view class=" ">Don't worry! Just transferEnough SOL FromWallet To The spendingAccount
									And You AreGOOd TO GO!</view>
							</view>

						</uni-card>
						<view class="uni-flex uni-row" style="width: 98%; margin: 10px auto;">
							<view class="flex-item id3">cost</view>
							<view v-if="currentPayType==0" class="idvalue3">{{currentprice0/1000000000000000000}} RB</view>
							<!-- 兑换 -->
							<view v-if="currentPayType==1" class="idvalue3">{{currentprice1}} RB</view>
							<!-- 购买 -->
						</view>

					</view>
				</uni-popup-dialog>

			</uni-popup>

		</view>

		<!-- 购买卡片弹框 -->
		<view>
			<uni-popup ref="inputDialog3" type="dialog">


				<uni-popup-dialog ref="inputClose" cancelText="兑换" confirmText="购买" title="购买" value="对话框预置提示内容!"
					placeholder="请输入内容" @close="redmCardBtn" @confirm="buyCardBtn">
					<view>

						<img class="cards" :src="currentCard.cover" />

						<view class="uni-flex uni-row" style="width: 98%; margin: 10px auto;">
							<view class="flex-item id3">mint</view>
							<view class="idvalue3">{{currentCard.card.sales}}/{{currentCard.card.stock}}</view>
						</view>
						<view class="uni-flex uni-row" style="width: 98%; margin: 10px auto;">
							<view class="flex-item id3">购买价格(RB)</view>
							<view class="idvalue3">{{currentCard.card.price1/100000000000000000}}</view>
						</view>
						<view class="uni-flex uni-row" style="width: 98%; margin: 10px auto;">
							<view class="flex-item id3">兑换价格(RB)</view>
							<view class="idvalue3">{{currentCard.card.price0}}</view>
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
		contractApprove,
		hideBankCards
	} from '../../../contract/useContract.js'
	import {
		big2num
	} from '../../../contract/ultis.js'
	export default {
		data() {
			return {
				getSteps:'',
				userAccount: '',
				currentcover: '',
				currentprice0: 0,
				currentprice1: 0,
				currentCard: {
					cover: "",
					card: {
						price0: '',
						price1: '',
						sales: '',
						stock: ''

					}
				},
				cards: {},
				cardCollect: [],
				approveRBET: '',
				gasPriceString: '',
				currentPayType: 0,
				isOpen: true,
				equips: {},
				collectionId: 0,
				currentEquips: {
					equip: {
						capacity: '',
						equipType: '',
						price0: '',
						price1: '',
						quality: '',
						sales: '',
						startId: '',
						status: '',
						stock: '',
						upgradeable: '',
					},
					cover: "",
				},
				equipCollect: [],
				equipCollectImgs: [],
				buttonRect: {},
				baseurl: 'http://192.168.1.201:8866/api/v1/',
				value: "请选择",
				range: [{
						value: 0,
						text: "鞋子"
					},
					{
						value: 1,
						text: "裤子"
					},
					{
						value: 2,
						text: "衣服"
					},
				],
				curNow: 0,
				list: ['运动装备', '属性卡'],
				current: 0,
				colorIndex: 0,
				items: ['选项卡1', '选项卡2'],
				styleType: 'button',
				activeColor: '#FFEB34',
				contract: null,
				RBETContract: null,
				RBCTContract: null,
				RBContract: null
			}
		},
		mounted() {


		},
		onLoad() {
			var that = this;
			that.getSteps =getApp().globalData.userStep
			try {

				const provider = new ethers.providers.Web3Provider(window.ethereum);

				provider.send("eth_requestAccounts", []).then(accounts => {
					this.myAccount = accounts[0]
					this.userAccount = hideBankCards(accounts[0]);
					//加载属性卡和装备库
					useContract(RunbitCollectionAddress, RunbitCollectionAbi).then(collectContract => {
						this.collectContract = collectContract
						this.getCards(collectContract)
						this.getEquips(collectContract)
					});
					//查询商店合约授权情况，授权后才能购买和兑换
					useContract(RBAddress, RBAbi).then(RBContract => {
						//获取rb余额
						this.RBContract = RBContract;
						RBContract.balanceOf(this.myAccount).then(balanceOfRB => {
							this.balanceOfRB = balanceOfRB
							console.log("balanceOfRB", this.balanceOfRB);
						})
						//获取RB对商品合约的授权情况
						RBContract.allowance(this.myAccount, RunbitCollectionAddress).then(data => {
							if (data.eq(BigNumber.from(0))) {
								this.approveState = false
							} else {
								this.approveState = true
							}
						})
					});
					//获取属性卡碎片
					useContract(RBCTAddress, RBCTAbi).then(RBCTContract => {
						this.RBCTContract = RBCTContract
						RBCTContract.balanceOf(this.myAccount).then(balanceofRBCT => {
							this.balanceofRBCT = parseInt(balanceofRBCT)
							console.log("balanceofRBCT", this.balanceofRBCT)
						})
						//获取RBCT属性卡碎片对商品合约的授权情况
						RBCTContract.allowance(this.myAccount, RunbitCollectionAddress).then(data => {
							if (data.eq(BigNumber.from(0))) {
								this.approveRBCT = false
							} else {
								this.approveRBCT = true
							}
							console.log("approveRBCT", this.approveRBCT)
						})
					});
					//获取装备碎片
					useContract(RBETAddress, RBETAbi).then(RBETContract => {
						this.RBETContract = RBETContract
						RBETContract.balanceOf(this.myAccount).then(balanceofRBET => {
							this.balanceofRBET = parseInt(balanceofRBET)
							console.log("balanceofRBET", this.balanceofRBET)
						})
						//获取RBET装备碎片对商品合约的授权情况
						RBETContract.allowance(this.myAccount, RunbitCollectionAddress).then(data => {
							if (data.eq(BigNumber.from(0))) {
								this.approveRBET = false
							} else {
								this.approveRBET = true
							}
							console.log("approveRBET", this.approveRBET)
						})
					});


				});



			} catch (e) {
				console.error(e);
			}
		},
		methods: {
			//兑换卡片确认按钮
			redmCardBtn() {
				this.currentPayType = 0;
				if (this.balanceofRBCT > this.currentCard.card.price0) {
					this.redeemCard(this.collectContract, this.collectionId);
				} else {
					uni.showToast({
						title: "属性卡碎片不足",
						icon: "error"
					})
				}

			},
			//兑换装备确认按钮
			redeemCardBtn() {
				this.currentPayType = 0;
				// this.$refs.inputDialogs.colse();
				if (this.balanceofRBET > this.currentEquips.equip.price0) {
					this.redeemEquip(this.collectContract, this.collectionId);
				} else {
					uni.showToast({
						title: "装备碎片不足",
						icon: "error"
					})
				}

			},
			//装备购买确认按钮
			dialogInputConfirm(val) {


				this.currentPayType = 1;
				this.$refs.inputDialogs.close();
				if (this.balanceOfRB > this.currentEquips.equip.price1 / 1000000000000000000) {
					this.buyEquip(this.collectContract, this.currentEquips.equip.equipType, this.collectionId);
				} else {
					uni.showToast({
						title: "余额不足",
						icon: "error"
					})
				}

				// this.$refs.inputDialog.close()
				// setTimeout(() => {
				// 	uni.hideLoading()
				// 	console.log(val)
				// 	this.value = val
				// 	// 关闭窗口后，恢复默认内容
				// 	this.$refs.inputDialog2.open()
				// }, 3000)
			},
			buyCardBtn() {
				this.currentPayType = 1;
				if (this.balanceOfRB > this.currentCard.card.price1 / 1000000000000000000) {
					this.buyCard(this.collectContract, this.collectionId);
				} else {
					uni.showToast({
						title: "余额不足",
						icon: "error"
					})
				}

			},
			//点击装备列表
			onGoods(item) {
				this.collectionId = item;
				this.currentEquips = this.equipCollect[item];
				this.currentprice0 = this.currentEquips.equip.price0;
				this.currentprice1 = this.currentEquips.equip.price1;
				this.currentcover = this.currentEquips.cover;
				this.isOpen = true;
				if (this.isOpen) {
					this.$refs.inputDialogs.open();
				}

			},
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
						uni.showToast({
							title: "点击了第" + e.tapIndex + "个选项",
							icon: "none"
						})
					}
				})
			},

			// 点击卡片列表
			onGoods2(index) {
				this.collectionId = index;
				this.currentCard = this.cardCollect[index];
				this.currentprice0 = this.currentCard.card.price0;
				this.currentprice1 = this.currentCard.card.price1 / 100000000000000000;
				this.currentcover = this.currentCard.cover;
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

			dialogInputConfirm2(val) {
				//this.$refs.inputDialog2.close()

			},
			change() {

			},
			async getCards(contract) {
				var that = this;
				//获取属性卡数量numOfCard和属性卡合集cardCollect
				//cardLoading=true获取数据中
				var numOfCard;
				uni.showLoading({
					title: '加载中'
				});
				that.cardCollect = [];
				contract.getCardCollectCount().then(async num => {
					for (let i = 0; num && i < num; i++) {
						await contract.getCardCollection(i).then(async card => {
							await that.getImg(2, i, card);
							uni.hideLoading();
						})

					}
				});
			},
			//获取装备集合
			async getEquips(contract) {
				var that = this;
				//获取装备数量numOfEquip和装备合集equipCollect
				var numOfEquip;
				var equipLoading = true;
				uni.showLoading({
					title: '加载中'
				});
				that.equipCollect = [];

				contract.getEquipCollectCount().then(async num => {
					for (var i = 0; i < num; i++) {


						await contract.getEquipCollection(i).then(async equip => {

							// that.equips.equip = equip;

							await that.getImg(1, i, equip);
							equipLoading = false;
							uni.hideLoading();
						})

					}
				});

			},

			getImg(img_type, collection_id, currentObj) {

				var imgs = "";
				var that = this;
				uni.request({
					url: this.baseurl + 'game/getCover',
					method: "GET",
					data: {
						img_type: img_type,
						collection_id: collection_id, //每一页12个数据
					},

					success: function(res) {
						if (res.data.code == 0) {
							imgs = "http://218.17.157.9:8866/images/" + res.data.data;

						}
						if (img_type == 1) {
							var resultObj = {};
							resultObj.balance = currentObj.sales / currentObj.stock * 100
							resultObj.cover = imgs;
							resultObj.equip = currentObj;
							that.equipCollect.push(resultObj); //获取内容
						} else {
							var resultObj = {};

							resultObj.balance = currentObj.sales / currentObj.stock * 100
							resultObj.card = currentObj;
							resultObj.cover = imgs;
							that.cardCollect.push(resultObj); //获取内容

						}

					},

				})
				return imgs;
			},



			//购买卡片
			async buyCard(contract, cardId) {
				try {
					//判断是否授权
					if (!this.approveState) {
						//未授权，弹窗提示授权？
						//用户点击确认授权后，调用授权代码，如下						
						await contractApprove(this.RBContract, RunbitCollectionAddress)
						this.approveState = true
						console.log("approveState2", this.approveState)
						uni.showToast({
							title: "授权中,授权成功后重新点击购买",
							icon: "none"
						})
						return

					}
					this.$refs.inputDialog2.open()
					//已授权
					let tx = await contract.buyCard(cardId)
					//交易hash
					tx.wait().then(res => {
						this.$refs.inputDialog2.close()
						uni.showToast({
							title: "购买成功",
							icon: "success"
						})
						//购买成功的一些操作，如关闭loading
					})

				} catch (e) {
					//出错的一些操作

					console.error(e)
				}
			},
			//购买装备
			async buyEquip(contract, equipType, collectionid) {
				try {
					//判断是否授权

					if (!this.approveState) {
						//未授权，弹窗提示授权？
						//用户点击确认授权后，调用授权代码，如下						
						await contractApprove(this.RBContract, RunbitCollectionAddress)
						this.approveState = true
						console.log("approveState2", this.approveState)

						uni.showToast({
							title: "授权中,授权后重新点击购买",
							icon: "none"
						})
					}
					//已授权

					this.$refs.inputDialog2.open()

					let tx = await contract.buyEquip(collectionid)
					//交易hash
					console.log(tx.hash)
					tx.wait().then(res => {
						this.$refs.inputDialog2.close()
						uni.showToast({
							title: "购买成功",
							icon: "success"
						})
						//购买成功的一些操作，如关闭loading
					})

				} catch (e) {
					//出错的一些操作

					console.error(e)
				}
			},
			//兑换属性卡
			async redeemCard(contract, cardId) {
				try {
					//判断是否授权
					if (!this.approveRBCT) {
						//未授权，弹窗提示授权？
						//用户点击确认授权后，调用授权代码，如下						
						await contractApprove(this.RBCTContract, RunbitCollectionAddress)
						this.approveRBCT = true
						console.log("approveRBCT", this.approveRBCT)
						uni.showToast({
							title: "授权中,授权后重新兑换",
							icon: "none"
						})
						return;
					}
					this.$refs.inputDialog2.open()
					//已授权
					let tx = await contract.redeemCard(cardId)
					tx.wait().then(res => {
						this.$refs.inputDialog2.close()
						uni.showToast({
							title: "兑换成功",
							icon: "success"
						})
						//兑换成功的一些操作，如关闭loading
					})

				} catch (e) {
					//出错的一些操作

					console.error(e)
				}
			},
			//兑换装备
			async redeemEquip(contract, collectionId) {
				try {
					if (!this.approveRBET) {
						console.log("开始授权----" + collectionId);

						await contractApprove(this.RBETContract, RunbitCollectionAddress)
						console.log(contractApprove);
						console.log(RunbitCollectionAddress);
						this.approveRBET = true
						uni.showToast({
							title: "授权中",
							icon: "none"
						})
						return
					}
					console.log("装备兑换开始----" + collectionId);

					this.$refs.inputDialog2.open()

					let tx = await contract.redeemEquip(collectionId)
					console.log(tx.hash)
					tx.wait().then(res => {
						console.log("装备兑换成功----" + collectionId);
						uni.showToast({
							title: "兑换成功",
							icon: "success"
						})
						this.$refs.inputDialog2.close()
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
		height: 232px;
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
		width: 10rem;
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
.input_edi {
		position: absolute;
		width: 300.44rpx;
	}

	.input_logo {
		margin-left: 0.2rem;
		position: absolute;
		width: 70.44rpx;
	}

	.input_txt {
		color: #000000;
		position: absolute;
		font-size: 28.33rpx;
		margin-left: 2.5rem;
		text-align: center;
		height: 70.72rpx;
		line-height: 70.72rpx;
	}
	.dialogimg {
		display: block;
		margin: 0 auto;
		width: 350.33rpx;
		height: 350.88rpx;
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
		width: 15.88rpx;
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
