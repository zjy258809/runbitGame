<template>
	<view class="content">
		<view class="bg">

			<view class="uni-flex uni-row"  @tap="openUser" style="margin: 1.425rem; height: 89.44rpx; ">
				<img class="flex-itemLogo" src="../../../static/heard.png" style="width:3.125rem;" />
				<img class="currentImg" src="../../../static/Ellipse38.png" />
				<view class="currentbs">{{getSteps}}步</view>
				<view class="userName">
					<img class="input_edi" src="../../../static/input_edi.png"></img>
					<img class="input_logo" src="../../../static/inputlogo.png"></img>
					<view class="input_txt">{{userAccount}}</view>
				</view>
			</view>

			<view style="margin-top: 123.88rpx; height:69.44rpx ; width: 90%; margin-left: 5%; ">
				<u-subsection activeColor="#FFEB34" font-size="15" :list="list" mode="subsection" :current="curNow"
					@change="sectionChange"></u-subsection>
				<view>
					<view v-if="curNow === 0">
						<view class="uni-flex uni-row"
							style="display: flex; margin:1rem 0px; height: 85.55rpx; width: 100%; ">
						<!-- 	<view style="width: 50%; margin: auto 0; ">
								<uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select>
							</view> -->
							<!-- <view @click="actionSheetTap" class="fillter">Fillter(0)</view> -->
							<image @click="synthetic" class="filltericon2" src="../../../static/Group11599.png">
							</image>

						</view>
						<mineEquip v-if="myEquips.length>0" :lists="myEquips" price-type="$" @onGoods="Clickequip" />
						<img v-if="myEquips.length==0" class="nocard"  src="../../../static/Group12015.png" />
					</view>
					<view v-if="curNow === 1">
						<view class="uni-flex uni-row"
							style="display: flex; margin:1rem 0px; height: 85.55rpx; width: 100%; ">
							<!-- <view style="width: 50%; margin: auto 0; ">
								<uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select>
							</view> -->
							<!-- <view @click="actionSheetTap" class="fillter">篩選</view> -->
							<!-- <image @click="actionSheetTap" class="filltericon" src="../../../static/Frame3.png"></image> -->

						</view>
						<mineEquip  v-if="myCards.length>0" :lists="myCards" price-type="$" @onGoods="clickCard" />
						<img v-if="myCards.length==0" class="nocard"  src="../../../static/Group12015.png" />
						<!-- <oct-goods :lists="goodsArr" price-type="$" @onGoods="onGoods2" /> -->

					</view>
				</view>
			</view>
		</view>
		<!-- 装备合成 -->
		<view>
			<uni-popup ref="inputDialog" type="dialog">


				<uni-popup-dialog ref="inputClose" :mask-click="true" cancelText="取消" confirmText="合成" title="裝備合成"
					value="對話方塊預置提示內容!" placeholder="請輸入內容" @confirm="forgeEquipDialog">
					<view>
						<view class="uni-flex uni-row">
							<image class="dialogimg" @tap="changeShop(1)" :src="card1.img"></image>
							<image class="dialogimg" @tap="changeShop(2)" :src="card2.img"></image>
						</view>
						<uni-card title="" extra=""
							style="width: 90%; border:1px solid black; border-radius: 0.825rem; background-color:#F4F5F6 ; margin: 2rem auto;">


							<view class="curId uni-flex uni-row">
								<view class="flex-item">舊裝備等級</view>
								<view class="flex-item" style="margin-left: 2.5rem;">合成後等級</view>
							</view>

							<view class="curId uni-flex uni-row">
								<view class="flex-item">{{card1.equip.level}} & {{card2.equip.level}}</view>
								<view class="flex-item" style="margin-left: 2.5rem; color: #FC823D;">
									{{ parseInt(card1.equip.level)+1}}
								</view>
							</view>








						</uni-card>
						<view class="curId2 uni-flex uni-row">
							<view class="flex-item3">合成費用共計</view>
							<view class="flex-item4">{{ForgeFee}} RB</view>
						</view>



					</view>
				</uni-popup-dialog>

			</uni-popup>

		</view>
		<!-- 筛选 -->
		<view>
			<uni-popup ref="inputDialog4" type="dialog">


				<uni-popup-dialog ref="inputClose" :mask-click="true" cancelText="取消" confirmText="添加" :title="title"
					value="對話框預置提示內容!" placeholder="請輸入內容" @confirm="dialogInputConfirm">
					<view>

						<oct-goods2 :lists="goodsArr" price-type="$" @onGoods="getClick" />

					</view>
				</uni-popup-dialog>

			</uni-popup>

		</view>

		<!-- 装备合成中 -->
		<view>
			<uni-popup ref="inputDialog2" type="dialog">


				<uni-popup-dialog ref="inputClose" mode="base" :mask-click="true" cancelText="取消" confirmText="去背包"
					title="裝備合成中" value="對話框預置提示內容!" placeholder="請輸入內容" @confirm="dialogInputConfirm2">
					<view>


						<view class="uni-flex uni-row" style="width: 98%; margin: 10px auto;">
							<view class="id4">合成中...請稍後到背包查看</view>

						</view>

					</view>
				</uni-popup-dialog>

			</uni-popup>

		</view>

		<!-- 卡片信息弹框 -->
		<view>
			<uni-popup ref="inputDialog3" type="dialog">
				<uni-popup-dialog ref="inputClose" :mask-click="true" :cancelText="cardCancle"
					:confirmText="cardconfirm" title="屬性卡信息" @close="cancleCard" value="對話框預置提示內容!" placeholder="請輸入內容"
					@confirm="dialogInputConfirm4">
					<view>
						<img class="cards" :src="curCard.img" />
						<uni-card title="" extra=""
							style="width: 90%; border:1px solid black; border-radius: 0.825rem; background-color:#F4F5F6 ; margin: 1rem auto;">
							<view class="curId uni-flex uni-row">
								<view class="flex-item ">耐久</view>
								<view class="flex-item idvalue2">累計收益</view>
							</view>
							<view class="curId uni-flex uni-row">
								<view class="flex-item flex-itemValue">{{curCard.card.durability}}/100</view>
								<view class="flex-item flex-itemValue idvalue2">0</view>
							</view>
						</uni-card>
						<view class="uni-flex uni-row" style="width: 60%; text-align: center; margin: 10px auto;">
							<view class="id4">{{cardStatus}}</view>
						</view>

					</view>
				</uni-popup-dialog>

			</uni-popup>

		</view>

		<!-- 装备信息 -->
		<view>
			<uni-popup ref="inputDialog5" type="dialog">
				<uni-popup-dialog ref="inputClose" :mask-click="true" :cancelText="cancleText" confirmText="确认"
					title="裝備信息" value="對話框預置提示內容!" placeholder="請輸入內容" @close="cancleEquip" @confirm="equipInfo">
					<view>

						<img class="cards2" :src="curEquip.img" />

						<view class="uni-flex uni-row">
							<img class="addcards" @tap="addCard(0)" :src="cards[0].img" />
							<img class="addcards" @tap="addCard(1)" :src="cards[1].img" />
							<img class="addcards" @tap="addCard(2)" :src="cards[2].img" />
						</view>

						<uni-card title="" extra=""
							style="width: 90%; border:1px solid black; border-radius: 0.825rem; background-color:#F4F5F6 ; margin: 0.6rem auto;">


							<view class="curId uni-flex uni-row">
								<view class="level ">級别</view>
								<view class="rare">稀有度</view>
							</view>


							<view class="curId uni-flex uni-row">
								<view class="flex-item">
									<image class="smicon " src="../../../static/Group115861.png"></image>
									<image v-if="curEquip.equip.level>=2" class="smicon "
										src="../../../static/Group115861.png"></image>
									<image v-if="curEquip.equip.level>=3" class="smicon "
										src="../../../static/Group115861.png"></image>
									<image v-if="curEquip.equip.level>=4" class="smicon "
										src="../../../static/Group115861.png"></image>
									<image v-if="curEquip.equip.level>=5" class="smicon "
										src="../../../static/Group115861.png"></image>
								</view>
								<view class="rare">{{curEquip.equip.quality}}</view>
							</view>

							<view class="curId uni-flex uni-row" style="margin-top: 0.8rem;">
								<view class="level ">卡片槽</view>
								<view class="rare">可升級</view>
							</view>

							<view class="curId uni-flex uni-row">
								<view class="level flex-itemValue">{{curEquip.equip.capacity}}/3</view>
								<view v-if="curEquip.equip.upgradeable==0" class="flex-item flex-itemValue rare">否
								</view>
								<view v-if="curEquip.equip.upgradeable==1" class="flex-item flex-itemValue rare">是
								</view>
							</view>

						</uni-card>
						<view class="uni-flex uni-row" style="width: 60%; text-align: center; margin: 5px auto;">
							<view class="id4">{{equipStatus}}</view>

						</view>


					</view>
				</uni-popup-dialog>

			</uni-popup>

		</view>
		<!-- 转让 -->
		<view>
			<uni-popup ref="inputDialog6" type="dialog">


				<uni-popup-dialog ref="inputClose" mode="input" :mask-click="true" cancelText="取消" confirmText="轉讓"
					title="轉讓" value="" placeholder="請校驗正確的轉讓地址!" @confirm="transferNFTCard">

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
		RunbitAddress,
		RunbitAbi,
		RBAbi,
		cardAddress,
		cardAbi,
		equipAddress,
		equipAbi
	} from '../../../contract/address.js'
	import {
		useContract,
		contractApprove,
		getApproveState,
		hideBankCards
	} from '../../../contract/useContract.js'
	import {
		bindCard,
		bindEquip,
		unbindEquip,
		unbindCard,
		getBindEquip,
		getBindEquips,
		getBindCards,
		getForgeFee,
		transferNFT
	} from '../../../contract/useRunbit.js'
	import {
		getMyCards,
		getMyEquips,
		getNFTApprove,
		approveNFT
	} from '../../../contract/useEquipCard.js'
	export default {
		data() {
			return {
				cardCancle: '',
				cardconfirm: '',
				cardStatus: '',
				cancleText: '取消',
				equipStatus: '未裝備',
				bindCardId:'',
				title: '',
				userAccount: '',
				getSteps: 0,
				buttonRect: {},
				curImg2: "../../../static/Group12032.png",
				curImg1: "../../../static/Group12032.png",
				curEquip: {
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
					img: "",
				},
				curCard: {
					img: "",
					card: {
						durability: ''
					}
				},
				value: 10,
				cards: [{
						img: '../../../static/Group12032.png'
					},
					{
						img: '../../../static/Group12032.png'
					},
					{
						img: '../../../static/Group12032.png'
					},
				],
				goodsArr: [],
				ForgeFee: '',
				range: [{
						value: 10,
						text: "全部"
					},
					{
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
				currentCard: 0,
				carIndex: 0,
				curNow: 0,
				list: ['运动装备', '属性卡'],
				current: 0,
				colorIndex: 0,
				items: ['选项卡1', '选项卡2'],
				styleType: 'button',
				activeColor: '#FFEB34',
				myCards: [],
				myEquips: [],
				onEquips: [],
				RBContract: null,
				balanceOfRB: 0,
				bindCardIndex:0,
				card1: {
					equip: {
						level: 0,
					},
					img: '../../../static/Group12032.png'
				},
				card2: {
					equip: {
						level: 0,
					},
					img: '../../../static/Group12032.png'
				},
				card3: {
					equip: {
						level: 0,
					},
					img: '../../../static/Group12032.png'
				},
				cardIndex: 0,
				approveState: false
			}
		},
		mounted() {
			try {
				uni.showLoading({
					title: '加载中'
				});
				this.getSteps = getApp().globalData.userStep
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				provider.send("eth_requestAccounts", []).then(accounts => {
					this.myAccount = accounts[0]
					this.userAccount = hideBankCards(accounts[0]);
					uni.showLoading({
						title: '加载中'
					});
					//加载我的属性卡和装备库 
					useContract(equipAddress, equipAbi).then(contract => {
						this.equipContract = contract
						getMyEquips(this.myAccount, contract).then(myEquips => {
							this.myEquips = myEquips;
							console.log("myEquips--------", myEquips)
							uni.hideLoading();
						})
						getNFTApprove(this.equipContract, this.myAccount, RunbitCollectionAddress).then(
							state => {
								this.approveEquip = state
							})

					});
					uni.showLoading({
						title: '加载中'
					});
					useContract(cardAddress, cardAbi).then(contract => {
						this.cardContract = contract
						getMyCards(this.myAccount, contract).then(myCards => {
							this.myCards = myCards;
							console.log("myCards--------", myCards)
						})
					});

					//查询商店合约授权情况，授权后才能购买和兑换
					useContract(RBAddress, RBAbi).then(RBContract => {
						//获取rb余额
						this.RBContract = RBContract;
						RBContract.balanceOf(this.myAccount).then(balanceOfRB => {
							this.balanceOfRB = balanceOfRB
							console.log("balanceOfRB", this.balanceOfRB);
						})
						uni.showLoading({
							title: '加载中'
						});
						//获取RB对商品合约的授权情况
						RBContract.allowance(this.myAccount, RunbitCollectionAddress).then(data => {
							if (data.eq(BigNumber.from(0))) {
								this.approveState = false
							} else {
								this.approveState = true
							}
						})
					});


					useContract(RunbitAddress, RunbitAbi).then(contract => {
						this.runContract = contract
						//获取装备,0代表没装备
						getBindEquips(contract, this.myAccount).then(async equips => {
							console.log("已经穿了" + equips);
							this.onEquips = equips;
						})
					})
				});
				useContract(RunbitCollectionAddress, RunbitCollectionAbi).then(contract => {
					this.collectContract = contract

				});
				setTimeout(() => {
					//可在此测试
					//  this.forgeEquip(this.collectContract, 0x4e2e, 0x4e2d)
					// getBindCards(contract,20007)

					// bindCard(contract,20007,20005,0)
					// bindEquip(contract,20007)
					// unbindEquip(contract,0)
					// unbindCard(contract,20007,0)
					//this.transfer(1, '0x042A52dFEcE28a7F451eC06f5Fb178F3b19aE485', 0x4e2e)
				}, 5000)


			} catch (e) {
				console.error(e);
			}

		},
		methods: {
			transferNFTCard(val) {
				var isAddress = ethers.utils.isAddress(val);
				if (!isAddress) {
					uni.showToast({
						title: "地址异常",
						icon: "error"
					})
					return
				}
				this.transfer(0, val, this.curCard.id);
			},
			//卸装
			async cancleEquip() {
				if (this.cancleText == "取消") {
					this.$refs.inputDialog5.close()
				} else {
					uni.showLoading({
						title: '装备卸下中...'
					})
					try {
						let tx = await unbindEquip(this.runContract, this.curEquip.equip.equipType)
						await tx.wait()
					} catch (e) {
						console.error(e)
						//todo 错误提示
					} finally {
						uni.hideLoading()
						//获取装备,0代表没装备
						getBindEquips(this.runContract, this.myAccount).then(async equips => {
							console.log("已经穿了" + equips);
							this.onEquips = equips;
						})
						this.$refs.inputDialog5.close();

						uni.showToast({
							title: "卸装成功",
							icon: "success"
						})
					}
				}
			},
			//卸卡
			async cancleCards() {
			
					uni.showLoading({
						title: '卸下中...'
					})
					try {
						let tx = await unbindCard(this.runContract, this.bindCardId, this.bindCardIndex)
						await tx.wait()
					} catch (e) {
						console.error(e)
						//todo 错误提示
					} finally {
						uni.hideLoading()
						uni.showToast({
							title: "卸下成功",
							icon: "success"
						})
				}
			},
			equipInfo() {
				this.$refs.inputDialog5.close()
			},
			//筛选点击事件合成筛选
			getClick(item) {
				if (item.equip.level >= 5) {
					uni.showToast({
						title: "等级已达最高级",
						icon: "error"
					})
					return
				}
				console.log(item.equip.equipType);
				console.log(item.equip.level);
				getForgeFee(this.collectContract, item.equip.equipType, item.equip.level).then(
					ForgeFee => {
						this.ForgeFee = ForgeFee
						console.log(this.ForgeFee);
					})


				if (this.cardIndex == 0) {
					this.currentCard = item;
				}
				if (this.cardIndex == 1) {

					this.card1 = item;
				}
				if (this.cardIndex == 2) {
					this.card2 = item;
				}
				if (this.card2.equip.level && this.card1.equip.level) {
					if (parseInt(this.card2.equip.level) != parseInt(this.card1.equip.level)) {
						this.card1 = this.card3;
						this.card2 = this.card3;
						uni.showToast({
							title: "装备等级必须一致",
							icon: "error"
						})
					}
					if (parseInt(this.card2.id) == parseInt(this.card1.id)) {
						this.card1 = this.card3;
						this.card2 = this.card3;
						uni.showToast({
							title: "不能为同一件装备",
							icon: "error"
						})
					}

				}
			},
			//获取当前装备绑定的卡片
			async getEquitCard(equipId) {
				console.log("装备id" + equipId);
				getBindCards(this.runContract, equipId).then(async cards => {
					if (cards[0].img) {
						this.cards[0].img = cards[0].img;
					} else {
						this.cards[0].img = '../../../static/Group12032.png';
					}
					if (cards[1].img) {
						this.cards[1].img = cards[1].img;
					} else {
						this.cards[1].img = '../../../static/Group12032.png';
					}
					if (cards[2].img) {
						this.cards[2].img = cards[2].img;
					} else {
						this.cards[2].img = '../../../static/Group12032.png';
					}
					console.log("当前装备卡片:" + cards);
				})
			},
			//打开卡片筛选
			addCard(index) {
				this.carIndex = index;
				this.$refs.inputDialog5.close()
				this.$refs.inputDialog4.open() //装备筛选
			},
			//装备合成弹框
			synthetic() {
				this.$refs.inputDialog.open()
			},
			//装备合成确认
			forgeEquipDialog() {
				if (this.card2.id && this.card1.id) {
					this.forgeEquip(this.collectContract, this.card1.id, this.card2.id);
				} else {
					uni.showToast({
						title: "装备不完整",
						icon: "error"
					})
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
						console.log(e.tapIndex);
						uni.showToast({
							title: "点击了第" + e.tapIndex + "个选项",
							icon: "none"
						})
					}
				})
			},
			//装备列表点击
			Clickequip(item) {
				this.cardIndex = 0;
				this.curEquip = item
				this.title = "属性卡选择";
				this.goodsArr = this.myCards;
				this.$refs.inputDialog5.open()
				this.getEquitCard(item.id);
				var index = item.equip.equipType;
				this.equipStatus = "未裝備"
				this.cancleText = "取消";
				if (this.onEquips[index].id) {
					if (parseInt(this.onEquips[index].id) == parseInt(item.id)) {
						this.equipStatus = "已裝備"
						this.cancleText = "卸下";
					}
				}
			},
			// 卡片详情取消按钮
			cancleCard()
			{
				if(this.cardCancle == "取消")
				{
					this.$refs.inputDialog3.close();
				}else{
					//进入卡片卸载
					this.cancleCards();
					
				}
			},
			// 卡片列表点击
			clickCard(item) {
				debugger
				console.log("卡片ID:"+item.id);
				this.$refs.inputDialog3.open();
				this.curCard = item;
				this.runContract.getCardInfo(item.id).then(
					card => {
						if (card[0] == 0) {
							this.cardStatus = "未装备"
							this.cardconfirm = "转让"
							this.cardCancle = "取消"
						} else {
							this.cardStatus = "已装备"
							this.cardconfirm = "确认"
							this.cardCancle = "卸载"
							this.bindCardId =card[0];
							this.bindCardIndex=card[1];
						}
					})

			},
			sectionChange(index) {
				this.curNow = index;

			},
			//装备合成中选择装备
			changeShop(item) {
				this.cardIndex = item;
				this.goodsArr = this.myEquips;
				this.$refs.inputDialog4.open()
			},
			openUser() {
				uni.navigateTo({
					url: '../../userAccount/userAccount'
				});
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			// 0表示卡片绑定
			async dialogInputConfirm(val) {
				if (this.cardIndex != 0) {
					return
				}
				uni.showLoading({
					title: '绑定中...'
				});
				if (this.curCard.id == 0) {
					uni.showToast({
						title: "未选中卡片",
						icon: "error"
					})
					return
				}
				//判断是否穿戴
				if (this.onEquips[item.equip.equipType].id) {
					if (parseInt(this.onEquips[item.equip.equipType].id) == parseInt(item.id)) {
						uni.showToast({
							title: "已穿戴装备不可合成",
							icon: "error"
						})
						return
					}
				}
				if (this.currentCard.card.level > this.curEquip.equip.level) {
					uni.showToast({
						title: "卡片等级大于装备等级",
						icon: "error"
					})
					return
				}
				console.log("装备id:" + this.curEquip.id);
				console.log("卡片id:" + this.currentCard.id);
				console.log("孔:" + this.carIndex);
				this.$refs.inputDialog4.close()
				let tx = await bindCard(this.runContract, this.curEquip.id, this.currentCard.id, this.carIndex);
				tx.wait().then(res => {
					uni.hideLoading();
					this.getEquitCard(this.curEquip.id);
					uni.showToast({
						title: "绑定成功",
						icon: "success"
					})
					this.$refs.inputDialog5.open()
				})



			},
			// 点击去背包
			dialogInputConfirm2(val) {
				getMyEquips(this.myAccount, this.equipContract).then(myEquips => {
					this.myEquips = myEquips;
					console.log("合成后的装备列表2", myEquips)
				})

				this.$refs.inputDialog2.close()

			},
			// 转让属性卡
			dialogInputConfirm4() {
				this.$refs.inputDialog3.close();
				if (this.cardconfirm == "转让") {
					this.$refs.inputDialog6.open();
				}
			},
			change(item) {
				this.changeType = item;
				this.myEquips=[];
				// getMyEquips(this.myAccount, contract).then(myEquips => {
				// 	this.myEquips = myEquips;
				// 	console.log("myEquips--------", myEquips)
				// 	uni.hideLoading();
				// })
				
			
			},
			//键入地址时校验地址是否有效，无效输入框提示，转让按钮置灰
			isVaildAddress(address) {
				return ethers.utils.isAddress(address)
			},
			//转账 type 0-属性卡，1-装备，address转让地址,nftId-装备或者属性卡id
			async transfer(type, address, nftId) {
				uni.showLoading({
					title: '转让中...'
				});
				this.transferLoading = true
				var nftContract = type === 0 ? this.cardContract : this.equipContract
				try {
					let tx = await nftContract["safeTransferFrom(address,address,uint256)"](this.myAccount, address,
						nftId)
					tx.wait().then(res => {


						getMyCards(this.myAccount, this.cardContract).then(myCards => {
							this.myCards = myCards;
							console.log("更新后的卡片:" + this.myCards);

						})
						uni.hideLoading();
						this.$refs.inputDialog6.close();
						uni.showToast({
							title: "转让成功",
							icon: "success"
						})

					})

				} catch (e) {
					console.error(e)
					//提示错误
				} finally {
					this.transferLoading = true
				}
			},
			//合成装备,
			//只能同级别，同类型的进行合成
			//需要equip合约给collect授权
			async forgeEquip(collectContract, equipId1, equipId2) {
				var that = this;
				//查询equip对collect授权情况
				if (!that.approveEquip) {
					uni.showToast({
						title: "授权中",
						icon: "success"
					})
					//确认授权
					await approveNFT(that.equipContract, RunbitCollectionAddress)
					that.approveEquip = true
					return
				}
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

				that.$refs.inputDialog2.open();

				let tx = collectContract.forgeEquip(equipId1, equipId2)
				console.log("合成成功")
				getMyEquips(that.myAccount, that.equipContract).then(myEquips => {
					that.myEquips = myEquips;
					console.log("合成后的装备列表", myEquips)
				})
			},
			async bind() {

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

	.id4 {
		width: 12.5rem;
		color: #000000;
		font-size: 0.9375rem;
		font-weight: bold;
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
		margin-left: 176.94rpx;
	}

	.filltericon {

		width: 50.83rpx;
		height: 45.83rpx;
		margin: auto 0;
		padding-top: 18.94rpx;

	}

	.filltericon2 {

		width: 180.83rpx;
		height: 55.83rpx;
		text-align: right;
		/* margin-left: 56.94rpx; */
		position: absolute;
		right: 80.83rpx;
		padding-top: 18.94rpx;

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

	.dialogimg {
		display: block;
		margin: 0 auto;
		width: 40%;
		height: 208.88rpx;
		margin-left: 5%;
		padding: 6.94rpx;
		border-radius: 10%;
		border: 1px solid black;

	}

	.curId {
		width: 13.25rem;
		margin: 0.225rem;
	}

	.curId2 {
		margin-top: 2rem;
		width: 13.25rem;
		text-align: center;
	}

	.flex-item3 {
		font-size: 0.8875rem;
		margin-left: 3rem;
		color: #969696;
		text-align: right;

	}

	.flex-item4 {
		font-size: 0.8875rem;
		color: #000000;
		margin-left: 0.2rem;
		text-align: left;

	}

	.idvalue2 {
		margin-left: 5rem;
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

	.idvalue3 {
		width: 75%;
		text-align: right;
		float: right;
	}

	.smicon {
		width: 15rpx;
		height: 23rpx;
	}

	.flex-item {
		color: #969696;
		width: 140.55rpx;
		height: 34.72rpx;
		text-align: center;
	}

	.level {
		color: #969696;
		width: 95.55rpx;
		height: 34.72rpx;
		text-align: center;
	}

	.rare {
		color: #969696;
		width: 95.55rpx;
		height: 34.72rpx;
		text-align: center;
		margin-left: 7rem;
	}

	.rareValue {
		color: #000000;
		width: 95.55rpx;
		height: 34.72rpx;
		text-align: center;
		margin-left: 7.5rem;
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

	.cards2 {
		width: 40%;
		margin: 0 auto;
		display: inline-block;
		margin: 1.25rem auto;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	/* 图片居中 */
	.addcards {
		width: 28%;
		margin: 0 auto;
		display: inline-block;
		margin: 1.25rem auto;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
