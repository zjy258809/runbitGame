<template>
	<view class="content">
		<view class="bg">

			<view class="uni-flex uni-row" @tap="openUser" style="margin: 1.425rem; height: 89.44rpx; ">
				<img class="flex-itemLogo" src="../../../static/heard.png" style="width:2.8rem;" />
				<img class="currentImg" :src="stepLogo" />
				<view :class="stepStaus==1?'currentbs':'currentbs2'">{{ getSteps }}步</view>
				<view class="userName">
					<img class="input_edi" src="../../../static/input_edi.png"></img>
					<img class="input_logo" src="../../../static/inputlogo.png"></img>
					<view class="input_txt">{{ userAccount }}</view>
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
						<mineEquip v-if="myEquips.length > 0" :lists="myEquips" price-type="$" @onGoods="Clickequip" />
						<img v-if="myEquips.length == 0" class="nocard" src="../../../static/Group120151.png" />
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
						<mineEquip v-if="myCards.length > 0" :lists="myCards" price-type="$" @onGoods="clickCard" />
						<img v-if="myCards.length == 0" class="nocard" src="../../../static/Group120151.png" />
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
							<image class="dialogimg" @tap="changeShop(1)" :src="card1.img.replace('org','lol')"></image>
							<image class="dialogimg" @tap="changeShop(2)" :src="card2.img.replace('org','lol')"></image>
						</view>
						<uni-card title="" extra=""
							style="width: 90%; border:1px solid black; border-radius: 0.825rem; background-color:#F4F5F6 ; margin: 2rem auto;">


							<view class="curId uni-flex uni-row">
								<view class="flex-item">舊裝備等級</view>
								<view class="flex-item" style="margin-left: 2.5rem;">合成後等級</view>
							</view>

							<view class="curId uni-flex uni-row">
								<view class="flex-item">{{ card1.equip.level }} & {{ card2.equip.level }}</view>
								<view class="flex-item" style="margin-left: 2.5rem; color: #FC823D;">
									{{ parseInt(card1.equip.level) + 1 }}
								</view>
							</view>

						</uni-card>
						<view class="curId2 uni-flex uni-row">
							<view class="flex-item3">合成費用共計</view>
							<view class="flex-item4">{{ ForgeFee }} RB</view>
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
					@confirm="dialogInputConfirm4(0)">
					<view>
						<img class="cards" :src="curCard.img.replace('org','lol')" />
						<uni-card title="" extra=""
							style="width: 90%; border:1px solid black; border-radius: 0.825rem; background-color:#F4F5F6 ; margin: 1rem auto;">
							<view class="curId uni-flex uni-row">
								<view class="flex-item ">耐久</view>
								<view class="flex-item idvalue2">累計收益</view>
							</view>
							<view class="curId uni-flex uni-row">
								<view class="flex-item flex-itemValue">{{ curCard.consume }}/{{ curCard.card.durability
								}}</view>
								<view class="flex-item flex-itemValue idvalue2">{{ displayNum(curCard.reward) }} RB
								</view>
							</view>
						</uni-card>
						<view class="uni-flex uni-row" style="width: 60%; text-align: center; margin: 10px auto;">
							<view class="id4">{{ cardStatus }}</view>
						</view>

					</view>
				</uni-popup-dialog>

			</uni-popup>

		</view>

		<!-- 装备信息 -->
		<view>
			<uni-popup ref="inputDialog5" type="dialog">
				<uni-popup-dialog ref="inputClose" :mask-click="true" :cancelText="cancleText"
					:confirmText="confirmText" title="裝備信息" value="對話框預置提示內容!" placeholder="請輸入內容" @close="cancleEquip"
					@confirm="dialogInputConfirm4(1)">
					<view>

						<img class="cards2" :src="curEquip.img.replace('org','lol')" />

						<view class="uni-flex uni-row">
							<img class="addcards" @tap="addCard(0)" :src="cards[0].img" />
							<img class="addcards" @tap="addCard(1)" :src="cards[1].img" />
							<img class="addcards" @tap="addCard(2)" :src="cards[2].img" />
						</view>

						<uni-card title="" extra=""
							style="width: 90%; border:1px solid black; border-radius: 0.825rem; background-color:#F4F5F6 ; margin: 0.2rem auto;">


							<view class="curId uni-flex uni-row">
								<view class="level ">級别</view>
								<view class="rare">稀有度</view>
							</view>


							<view class="curId uni-flex uni-row">
								<view class="level flex-item">
									<image class="smicon " src="../../../static/Group115861.png"></image>
									<image v-if="curEquip.equip.level >= 2" class="smicon "
										src="../../../static/Group115861.png"></image>
									<image v-if="curEquip.equip.level >= 3" class="smicon "
										src="../../../static/Group115861.png"></image>
									<image v-if="curEquip.equip.level >= 4" class="smicon "
										src="../../../static/Group115861.png"></image>
									<image v-if="curEquip.equip.level >= 5" class="smicon "
										src="../../../static/Group115861.png"></image>
								</view>
								<view class="rare">{{ curEquip.equip.quality }}</view>
							</view>

							<view class="curId uni-flex uni-row" style="margin-top: 0.8rem;">
								<view class="level ">卡片槽</view>
								<view class="rare">可升級</view>
							</view>

							<view class="curId uni-flex uni-row">
								<view class="level flex-itemValue">{{ curEquip.equip.capacity }}</view>
								<view v-if="curEquip.equip.upgradeable == 0" class="flex-item flex-itemValue rare">否
								</view>
								<view v-if="curEquip.equip.upgradeable == 1" class="flex-item flex-itemValue rare">是
								</view>
							</view>

						</uni-card>
						<view class="uni-flex uni-row" style="width: 60%; text-align: center; margin: 5px auto;">
							<view class="id4">{{ equipStatus }}</view>

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

		<!-- 激活码弹框 -->
		<view>
			<!-- 输入框示例 -->
			<uni-popup ref="isopen" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" :before-close="true" title="通知" placeholder="请输入激活码"
					@confirm="isopenDialog"></uni-popup-dialog>
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
import { myRequest } from '../../../utils/api.js'
import {
	displayNum
} from '../../../contract/ultis.js'
const runContract = useContract(RunbitAddress, RunbitAbi)
const equipContract = useContract(equipAddress, equipAbi)
const cardContract = useContract(cardAddress, cardAbi)
const collectContract = useContract(RunbitCollectionAddress, RunbitCollectionAbi)
export default {
	data() {
		return {
			stepLogo: '',
			stepStaus: 1,
			cardCancle: '',
			cardconfirm: '',
			cardStatus: '',
			cancleText: '取消',
			confirmText: '确认',
			equipStatus: '未裝備',
			bindCardId: '',
			title: '',
			userAccount: '连接钱包',
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
			bindCardIndex: 0,
			type: '',
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
			approveState: false,
			refContract: null,
			gasPriceString: ''
		}
	},
	onShow() {
		this.loadMine = getApp().globalData.loadMine;
		if (this.loadMine == 1) {
		
			this.myCards = JSON.parse(uni.getStorageSync('myCards'));
			this.myEquips = JSON.parse(uni.getStorageSync('myEquips'));
			this.equips = JSON.parse(uni.getStorageSync('bindEquips'));
			getApp().globalData.loadMine = 0

		}
		this.steps = uni.getStorageSync('steps');

	},
	onLoad() {
		try {			
			if (!window.ethereum) {
				uni.showModal({
					content: '请使用DAPP浏览器或安装metamask!',
					showCancel: false,
					success: ({ confirm, cancel }) => {

					}
				})
				return
			}
			uni.showLoading({
				title: '加载中'
			});
			this.getSteps = getApp().globalData.userStep
			this.steps = uni.getStorageSync('steps');
			this.stepStaus = getApp().globalData.stepStaus;
			this.stepLogo = getApp().globalData.stepLogo;

			const provider = new ethers.providers.Web3Provider(window.ethereum);

			provider.getBlock().then(block => {
				this.curDay = parseInt((block.timestamp + 28800) / 86400);
			});

			Promise.all([runContract, cardContract, equipContract, collectContract]).then(res => {
				this.runContract = res[0]
				this.cardContract = res[1]
				this.equipContract = res[2]
				this.collectContract = res[3]
			})

			provider.getGasPrice().then((gasPrice) => {
				// gasPrice is a BigNumber; convert it to a decimal string
				this.gasPriceString = (parseInt(gasPrice) * 2).toString();
			})
			provider.send("eth_requestAccounts", []).then(async accounts => {
				this.myAccount = accounts[0]
				this.userAccount = hideBankCards(accounts[0]);


				uni.getStorage({
					key: 'myCards'
				}).then(res => {
					//有缓存

					if (!res[0]) {
						this.myCards = JSON.parse(res[1].data);
					}
					else {
						//没缓存
						this.updateMyCards()

					}
				})

				getNFTApprove(this.cardContract, this.myAccount, RunbitCollectionAddress).then(
					state => {
						this.approveCard = state
					})

				uni.getStorage({
					key: 'myEquips'
				}).then(res => {
					//有缓存
					if (!res[0]) {
						this.myEquips = JSON.parse(res[1].data);
						let a =JSON.parse(res[1].data);
						uni.hideLoading()
					}
					else {
						//没缓存
						this.updateMyEquips()

					}
				});
				getNFTApprove(this.equipContract, this.myAccount, RunbitCollectionAddress).then(
					state => {
						this.approveEquip = state
					})




				//查询商店合约授权情况，授权后才能购买和兑换
				useContract(RBAddress, RBAbi).then(RBContract => {
					//获取rb余额
					this.RBContract = RBContract;
					RBContract.balanceOf(this.myAccount).then(balanceOfRB => {
						this.balanceOfRB = balanceOfRB
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

				uni.getStorage({
					key: 'bindEquips'
				})
					.then(res => {
						//有缓存
						if (!res[0]) {
							this.equips = JSON.parse(res[1].data);
						}
						//无缓存
						else {
							getUserInfo(this.myAccount).then(info => {
								let equips = []
								for (let i = 0; i < 3; ++i) {
									let equipItem = {}
									let equipCopy = {}
									let e = info[1][i]
									Object.keys(e).forEach((key, index) => {
										equipCopy[key] = typeof e[key] == 'number' ? e[key] : e[key].toNumber()
									})
									equipItem.equip = equipCopy
									equipItem.id = info[0][i].toNumber()
									equipItem.img = info[2][i]
									let cards = []
									for (let j = i * 3; j < i * 3 + 3; ++j) {
										let cardItem = {}
										let cardCopy = {}
										let c = info[5][j]
										cardItem.id = info[3][j].toNumber()
										cardItem.img = info[6][j]
										cardItem.consume = info[4][j].toNumber()
										Object.keys(c).forEach((key, index) => {
											cardCopy[key] = typeof c[key] == 'number' ? c[key] : c[key].toNumber()
										})
										cardItem.card = cardCopy
										cards[j % 3] = cardItem
									}
									equipItem.cards = cards
									equips[i] = equipItem
								}
								this.equips = equips
								uni.setStorage({
									key: 'bindEquips',
									data: JSON.stringify(this.equips),
									success: function () {
										console.log(
											'cache bindEquips');
									}
								});
							})
						}
					})


			});

		} catch (e) {
			console.error(e);
		}

	},
	methods: {
		displayNum,
		async updateMyCards() {
			let myCards = await getMyCards(this.myAccount)
			this.myCards = myCards;
			getApp().globalData.loadIndex = 1;
			uni.hideLoading()
			uni.setStorage({
				key: 'myCards',
				data: JSON.stringify(myCards),
				success: function () {
					console.log('cache myCards');
				}
			});


		},
		async updateMyEquips() {
			let myEquips = await getMyEquips(this.myAccount)
			this.myEquips = myEquips;
			getApp().globalData.loadIndex = 1;
			uni.hideLoading()
			uni.setStorage({
				key: 'myEquips',
				data: JSON.stringify(myEquips),
				success: function () {
					console.log('cache myEquips');
				}
			});


		},
		// 激活码激活
		async isopenDialog(val) {
			var isAddress = ethers.utils.isAddress(val);
			try {
				if (!isAddress) {
					uni.showToast({
						title: "激活码错误",
						icon: "error"
					})

					return
				}
				let tx = await this.refContract.addReferrerWithCheck(val)
				uni.showLoading({
					title: '请稍等...'
				})
				await tx.wait()
				uni.hideLoading()
				this.$refs.isopen.close();
				uni.showToast({
					title: "激活成功",
					icon: "success"
				})
			} catch (e) {
				console.error(e)
			}

		},
		transferNFTCard(val) {
			var isAddress = ethers.utils.isAddress(val);
			if (!isAddress) {
				uni.showToast({
					title: "地址异常",
					icon: "error"
				})
				return
			}
			if (this.transferType == 0)
				this.transfer(0, val, this.curCard.id);
			else {


				this.transfer(1, val, this.curEquip.id);
			}

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
					let tx = await unbindEquip(this.runContract, this.curEquip.equip.equipType, this.gasPriceString)
					await tx.wait()
					uni.showToast({
						title: "卸载成功",
						icon: "success"
					})

					this.equips[this.curEquip.equip.equipType] = 0

					uni.setStorage({
						key: 'bindEquips',
						data: JSON.stringify(this.equips),
						success: function () {
							console.log('cache bindEquips');
						}
					});
					getApp().globalData.loadIndex = 1;

					this.$refs.inputDialog5.close();
				} catch (e) {
					console.error(e)
					let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""
					uni.showToast({
						title: "卸载失败" + ":" + reason,
						icon: "none"
					})
				} finally {
					uni.hideLoading()

				}
			}
		},
		//卸卡
		async cancleCards() {

			uni.showLoading({
				title: '卸下中...'
			})
			try {
				//查看该卡所绑装备是否正在使用中
				this.runContract.getEquipInfo(this.bindCardId).then(async date => {
					if (date.latestDay == this.curDay) {
						uni.showToast({
							title: "属性卡正在使用,请明天再试!",
							icon: "none"
						})
						return
					}


					let tx = await unbindCard(this.runContract, this.bindCardId, this.bindCardIndex, this.gasPriceString)
					await tx.wait()

					uni.showToast({
						title: "卸下成功",
						icon: "success"
					})
					for (let i = 0; i < 3; ++i) {
						if (this.equips[i].id == this.bindCardId) {
							this.equips[i].cards[this.bindCardIndex] = 0
							uni.setStorage({
								key: 'bindEquips',
								data: JSON.stringify(this.equips),
								success: function () {
									console.log('cache bindEquips');
								}
							})
						}
					}
					//没缓存
					this.updateMyCards()
					this.updateMyEquips()
					//重新加载
				})
			} catch (e) {
				console.error(e)
				let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""
				uni.showToast({
					title: "卸载失败" + ":" + reason,
					icon: "none"
				})
				//todo 错误提示
			}
		},
		//筛选点击事件合成筛选
		getClick(item) {
			if (this.cardIndex == 0) {
				this.currentCard = item;
			}

			if (this.type == "foge") {
				if (item.equip.level >= 5) {
					uni.showToast({
						title: "等级已达最高级",
						icon: "error"
					})
					return
				}
				getForgeFee(this.collectContract, item.equip.equipType, item.equip.level).then(
					ForgeFee => {
						this.ForgeFee = ForgeFee
					})


				//选择卡槽1
				if (this.cardIndex == 1) {

					this.card1 = item;
				}
				//选择卡槽2
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
						return
					}
					if (parseInt(this.card2.equip.equipType) != parseInt(this.card1.equip.equipType)) {
						this.card1 = this.card3;
						this.card2 = this.card3;
						uni.showToast({
							title: "装备类型必须一致",
							icon: "error"
						})
						return
					}
					if (parseInt(this.card2.id) == parseInt(this.card1.id)) {
						this.card1 = this.card3;
						this.card2 = this.card3;
						uni.showToast({
							title: "不能为同一件装备",
							icon: "error"
						})
						return
					}

				}
			}
		},
		//获取当前装备绑定的卡片
		async getEquitCard(equip) {
			let cards = equip.cards
			if (cards[0].img) {
				this.cards[0].img = (cards[0].img).replace("org","lol");;
			} else {
				this.cards[0].img = '../../../static/Group12032.png';
			}
			if (cards[1].img) {
				this.cards[1].img = (cards[1].img).replace("org","lol");;
			} else {
				this.cards[1].img = '../../../static/Group12032.png';
			}
			if (cards[2].img) {
				this.cards[2].img = (cards[2].img).replace("org","lol");;
			} else {
				this.cards[2].img = '../../../static/Group12032.png';
			}


		},
		//打开卡片筛选
		addCard(index) {
			this.carIndex = index;
			//当前装备已使用
			if (this.steps != 0 && this.equips[this.curEquip.equip.equipType].id == this.curEquip.id) {

				uni.showToast({
					title: "装备正在使用，无法更换属性卡",
					icon: "error"
				})
				return
			}
			this.$refs.inputDialog5.close()
			this.$refs.inputDialog4.open() //装备筛选
		},
		//装备合成弹框
		synthetic() {
			this.type = "foge" //合成
			this.$refs.inputDialog.open()
		},
		//装备合成确认
		forgeEquipDialog() {
			try {
				if (this.card2.id && this.card1.id) {
					this.forgeEquip(this.collectContract, this.card1.id, this.card2.id);
				} else {
					uni.showToast({
						title: "装备不完整",
						icon: "error"
					})
				}
			} catch (e) {
				let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""
				uni.showToast({
					title: "购买失败" + ":" + reason,
					icon: "none"
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
					uni.showToast({
						title: "点击了第" + e.tapIndex + "个选项",
						icon: "none"
					})
				}
			})
		},
		//装备列表点击
		Clickequip(item) {
			this.type = "equip";
			this.cardIndex = 0;
			this.curEquip = item
			this.title = "属性卡选择";
			this.$refs.inputDialog5.open()
			this.getEquitCard(item);
			var index = item.equip.equipType;
			this.equipStatus = "未裝備"
			this.cancleText = "取消";
			this.confirmText = "转让";
			if (this.equips[index]) {
				if (parseInt(this.equips[index].id) == parseInt(item.id)) {
					this.equipStatus = "已裝備"
					this.cancleText = "卸下";
					this.confirmText = "确认";
				}
			}
			this.goodsArr = []
			Object.keys(this.myCards).forEach((key, index) => {
				if (this.myCards[key].card.level <= this.curEquip.equip.level) {
					if(this.myCards[key].status == 0 || this.getFixEquip(this.myCards[key].status)!=1)
					this.goodsArr.push(this.myCards[key])
				}

			})
		},
		getFixEquip(equipId)
		{
			for (var i = 0; i < this.myEquips.length; i++) {
				if(equipId==this.myEquips[i].id)
				{
					return 1
				}
			}
		},
		// 卡片详情取消按钮
		cancleCard() {
			if (this.cardCancle == "取消") {
				this.$refs.inputDialog3.close();
			} else {
				//进入卡片卸载
				this.cancleCards();

			}
		},
		// 卡片列表点击
		async clickCard(item) {
			this.$refs.inputDialog3.open();
			this.curCard = item;
			//获取累计收益
			await myRequest({
				url: 'game/getCardEarnings',
				data: {
					nft_id: item.id
				}
			}).then(data => {
				this.curCard.reward = data
			})
			this.runContract.getCardInfo(item.id).then(
				card => {
					if (card[0] == 0) {
						this.cardStatus = "未装备"
						this.cardconfirm = "转让"
						this.cardCancle = "取消"
					} else {
						this.cardStatus = "在" + card[0] + "装备的" + card[1].toString() + "卡槽使用"
						this.cardconfirm = "确认"
						this.cardCancle = "卸载"
						this.bindCardId = card[0];
						this.bindCardIndex = card[1];
					}
				})

		},
		sectionChange(index) {
			this.curNow = index;

		},
		//装备合成中选择装备
		changeShop(item) {
			//如果已经选择了一个，另一个只展示同类型
			this.cardIndex = item;
			this.goodsArr = this.myEquips;
			this.$refs.inputDialog4.open()
		},
		openUser() {
			
			if (!window.ethereum) {
				uni.showModal({
					content: '请使用DAPP浏览器或安装metamask!',
					showCancel: false,
					success: ({ confirm, cancel }) => {

					}
				})
				return
			}
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
			if (this.currentCard.card.level > this.curEquip.equip.level) {
				uni.showToast({
					title: "卡片等级大于装备等级",
					icon: "error"
				})
				return
			}

			this.$refs.inputDialog4.close()
			try {
				let tx = await bindCard(this.runContract, this.curEquip.id, this.currentCard.id, this.carIndex, this.gasPriceString);
				await tx.wait()
				uni.hideLoading();
				this.curEquip.cards[this.carIndex] = this.currentCard
				this.getEquitCard(this.curEquip);
				uni.showToast({
					title: "绑定成功",
					icon: "success"

					//this.$refs.inputDialog5.open()
				})
				//当前装备使用中
				if (this.equips[this.curEquip.equip.equipType].id == this.curEquip.id) {
					this.equips[this.curEquip.equip.equipType].cards[this.carIndex] = this.currentCard
					uni.setStorage({
						key: 'bindEquips',
						data: JSON.stringify(this.equips),
						success: function () {
							console.log('cache bindEquips');
						}
					})
				}
				this.updateMyCards()
				this.updateMyEquips()

			} catch (e) {
				let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""
				uni.showToast({
					title: "绑定失败" + ":" + reason,
					icon: "none"
				})

			}



		},
		// 点击去背包
		dialogInputConfirm2(val) {
			getMyEquips(this.myAccount).then(myEquips => {
				this.myEquips = myEquips;
			})

			this.$refs.inputDialog2.close()

		},
		// 转让属性卡
		dialogInputConfirm4(type) {
			this.transferType = type
			if (type == 0 && this.cardconfirm == "转让") {
				this.$refs.inputDialog6.open();
				this.$refs.inputDialog3.close();
			}
			if (type == 1 && this.confirmText == "转让") {
				if (this.curEquip.cards[0] || this.curEquip.cards[1] || this.curEquip.cards[2])

					uni.showToast({
						title: "请将属性卡卸载后再转让!",
						icon: "error"
					})
				else {

					this.$refs.inputDialog3.close();
					this.$refs.inputDialog6.open();
				}
			}
		},
		change(item) {
			this.changeType = item;
			this.myEquips = [];
		},
		//键入地址时校验地址是否有效，无效输入框提示，转让按钮置灰
		isVaildAddress(address) {
			return ethers.utils.isAddress(address)
		},
		//转账 type 0-属性卡，1-装备，address转让地址,nftId-装备或者属性卡id
		async transfer(type, address, nftId) {
			//转让前判断授权状态

			uni.showLoading({
				title: '转让中...'
			});
			this.transferLoading = true
			var nftContract = type === 0 ? this.cardContract : this.equipContract
			try {
				let tx = await nftContract["safeTransferFrom(address,address,uint256)"](this.myAccount, address,
					nftId)
				await tx.wait()
				
				this.updateMyCards()

				uni.hideLoading();
				this.$refs.inputDialog6.close();
				uni.showToast({
					title: "转让成功",
					icon: "success"
				})

			} catch (e) {
				console.error(e)
				let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""
				uni.showToast({
					title: "转让失败" + ":" + reason,
					icon: "none"
				})
				//提示错误
			} finally {
				this.transferLoading = true
			}
		},
		//合成装备,
		//只能同级别，同类型的进行合成
		//需要equip合约给collect授权
		async forgeEquip(collectContract, equipId1, equipId2) {
			try {
				var that = this;

				//1.先判断是否穿戴

				if (this.equips[this.card1.equip.equipType].id) {
					if (parseInt(this.equips[this.card1.equip.equipType].id) == parseInt(this.card1.id)) {
						uni.showToast({
							title: "已穿戴装备不可合成",
							icon: "error"
						})
						return
					}

				}


				//2.再查询equip对collect授权情况
				if (!that.approveEquip) {
					uni.showToast({
						title: "开始授权",
						icon: "success"
					})
					//确认授权
					await approveNFT(that.equipContract, RunbitCollectionAddress)
					that.approveEquip = true
					
					// return
				}

				//3.如果合成需要费用，则判断RB是否授权
				if (this.ForgeFee) {
					//3.1判断RB余额
					if (this.balanceOfRB < this.ForgeFee) {
						uni.showToast({
							title: "RB余额不足支付合成费用!",
							icon: "error"
						})
						return
					}
					if (!this.approveState) {
						//3.2 余额充足，判断RB授权情况
						//用户点击确认授权后，调用授权代码，如下						
						await contractApprove(this.RBContract, RunbitCollectionAddress)
						this.approveState = true

						uni.showToast({
							title: "授权成功,开始合并",
							icon: "none"
						})
					}
				}
				uni.showToast({
					title: "授权成功,开始合并",
					icon: "success"
				})

				that.$refs.inputDialog2.open();

				let tx = await collectContract.forgeEquip(equipId1, equipId2, {
					gasLimit: 1200000,
					gasPrice: this.gasPriceString
				});
				await tx.wait()

				this.updateMyEquips()
				uni.showToast({
					title: "合成成功,稍后刷新查看",
					icon: "success"
				})
				that.$refs.inputDialog2.close();

			} catch (e) {
				let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""
				uni.showToast({
					title: "购买失败" + ":" + reason,
					icon: "none"
				})

			}
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
	height: 232px;
	left: 0px;
	top: 0px;
	background-color: #F3F3F3;
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
	width: 188.88rpx;
	font-size: 25rpx;
}

.currentbs2 {
	margin-left: 8.47rpx;
	display: flex;
	flex-direction: row;
	font-weight: bold;
	align-items: center;
	font-size: 25rpx;
	width: 188.88rpx;
	color: red;
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
	position: absolute;
	right: 6.94rpx;
	width: 10rem;
	height: 65rpx;
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
	margin: 0rem;
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
	width: 280.44rpx;
	height: 65rpx;
}

.input_logo {
	margin-left: 0.2rem;
	position: absolute;
	width: 60.44rpx;
}

.input_txt {
	color: #000000;
	position: absolute;
	font-size: 25.83rpx;
	margin-left: 66.94rpx;
	text-align: center;
	height: 60rpx;
	line-height: 65rpx;
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
	width: 110.55rpx;
	height: 34.72rpx;
	text-align: center;
}

.rare {
	color: #969696;
	width: 110.55rpx;
	height: 34.72rpx;
	text-align: center;
	margin-left: 7rem;
}

.rareValue {
	color: #000000;
	width: 110.55rpx;
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
	margin: 0rem auto;

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
	margin: 0.5rem auto;
	height: 200rpx;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
