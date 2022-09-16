<template>
	<view class="content2">

		<view class="bg">

			<view class="uni-flex uni-row" @tap="openUser" style="margin: 1.425rem; height: 89.44rpx; ">
				<img src="../../../static/heard.png" style="width:2.8rem;" />
				<img class="currentImg" :src="stepLogo" />
				<view :class="stepStaus==1?'currentbs':'currentbs2'"> {{ Steps }}步</view>
				<view class="userName">
					<img class="input_edi" src="../../../static/input_edi.png"></img>
					<img class="input_logo" src="../../../static/inputlogo.png"></img>
					<view class="input_txt">{{ userAccount }}</view>
				</view>

			</view>

			<view class="person">
				<img class="user_person" src="../../../static/grounp-5-2.png"></img>
				<view @tap="inputDialogToggle()" class="userlogo">{{ stack }}</view>
				<view class="user_person_item uni-flex uni-column">
					<img class="gp11 " @tap="chooseEquipDia(2)" :src="equipsImgs[2].img" />
					<img class="gp12" @tap="chooseEquipDia(1)" :src="equipsImgs[1].img" />
					<img class="gp12" @tap="chooseEquipDia(0)" :src="equipsImgs[0].img" />
				</view>
			</view>


			<uni-card title="" extra="" style="width: 70%; margin: 50rpx auto;">
				<view class="uni-flex uni-row">
					<img class="currentImg2" src="../../../static/Vector14.png" />

					<view class="uni-flex uni-column">

						<view class="curId uni-flex uni-row">
							<view class="flex-item">功能性</view>
							<view class="flex-item idvalue">{{ specialty }}</view>
						</view>

						<view class="curId uni-flex uni-row">
							<view class="flex-item ">美观性</view>
							<view class="flex-item idvalue">{{ aesthetic }}</view>
						</view>
						<view class="curId uni-flex uni-row">
							<view class="flex-item ">舒适性</view>
							<view class="flex-item idvalue">{{ comfort }}</view>
						</view>
					</view>

				</view>

			</uni-card>

			<uni-card title="" extra="" style="width: 70%; margin: 0rem auto;">
				<view class="uni-flex uni-row">
					<img class="currentImg2" src="../../../static/Frame 11972.png" />

					<view class="uni-flex uni-column">

						<view class="curId uni-flex uni-row">
							<view class="flex-item">预计收益</view>
							<view class="flex-item idvalue">{{ getFix2(reward) }} RB</view>
						</view>

					</view>

				</view>

			</uni-card>
			<img @tap="updateStep()" class="gp4" src="../../../static/Group4.png" />

			<view class="bs">已同步{{ steps }}步</view>

		</view>

		<!-- 赛道弹框 -->
		<view>
			<uni-popup ref="inputDialog" type="dialog">


				<uni-popup-dialog ref="inputClose" title="赛道选择" value="对话框预置提示内容!" placeholder="请输入内容"
					@confirm="dialogInputConfirm" @close="closeTrack">
					<view>

						<image :class="trackId == 2 ? 'ondialogimg' : 'dialogimg'" src="../../../static/Group11595.png"
							@click="chooseTrack(2)"></image>
						<image :class="trackId == 1 ? 'ondialogimg' : 'dialogimg'" src="../../../static/Group12072.png"
							@click="chooseTrack(1)"></image>
						<image :class="trackId == 0 ? 'ondialogimg' : 'dialogimg'" src="../../../static/Group12073.png"
							@click="chooseTrack(0)"></image>

						<view v-if="trackId!=setTrackId" style="color: #969696;">更改跑道为[{{this.stack}}],明天生效</view>
					</view>
				</uni-popup-dialog>

			</uni-popup>
		</view>

		<!-- 装备选择 -->
		<view>
			<uni-popup ref="chooseEquipDialog" type="dialog">


				<uni-popup-dialog ref="inputClose" :mask-click="true" cancelText="取消" confirmText="添加" title="裝備選擇"
					value="對話框預置提示內容!" placeholder="請輸入內容" @confirm="chooseEquip">
					<view>

						<oct-goods2 :lists="EquipsList" price-type="$" @onGoods="onGoods" />

					</view>
				</uni-popup-dialog>

			</uni-popup>

		</view>

		<!-- 卡片选择 -->
		<view>
			<uni-popup ref="choosecardDialog" type="dialog">


				<uni-popup-dialog ref="inputClose" :mask-click="true" cancelText="取消" confirmText="添加" title="卡片選擇"
					value="對話框預置提示內容!" placeholder="請輸入內容" @confirm="choosecard">
					<view>

						<oct-goods2 :lists="cardsList" price-type="$" @onGoods="changeCard" />

					</view>
				</uni-popup-dialog>

			</uni-popup>

		</view>

		<!-- 装备信息 -->
		<view>
			<uni-popup ref="equipInfo" type="dialog">
				<uni-popup-dialog ref="inputClose" :mask-click="true" cancelText="卸下" confirmText="确认" title="裝備信息"
					value="對話框預置提示內容!" placeholder="請輸入內容" @close="unEquip">
					<view>

						<img class="cards2" :src="currentequips.img" />

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
								<view class="level flex-itemValue">
									<image class="smicon " src="../../../static/Group115861.png"></image>
									<image v-if="currentequips.equip.level >= 2" class="smicon "
										src="../../../static/Group115861.png"></image>
									<image v-if="currentequips.equip.level >= 3" class="smicon "
										src="../../../static/Group115861.png"></image>
									<image v-if="currentequips.equip.level >= 4" class="smicon "
										src="../../../static/Group115861.png"></image>
									<image v-if="currentequips.equip.level >= 5" class="smicon "
										src="../../../static/Group115861.png"></image>
								</view>
								<view class="flex-item flex-itemValue rare">{{ currentequips.equip.quality }}</view>
							</view>

							<view class="curId uni-flex uni-row" style="margin-top: 0.8rem;">
								<view class="level ">卡片槽</view>
								<view class="rare">可升級</view>
							</view>

							<view class="curId uni-flex uni-row">
								<view class="level flex-itemValue">{{ currentequips.equip.capacity }}</view>
								<view v-if="currentequips.equip.upgradeable == 0" class="flex-item flex-itemValue rare">
									否
								</view>
								<view v-if="currentequips.equip.upgradeable == 1" class="flex-item flex-itemValue rare">
									是
								</view>
							</view>

						</uni-card>
						<view class="uni-flex uni-row" style="width: 60%; text-align: center; margin: 5px auto;">
							<view class="id4">已裝備</view>

						</view>


					</view>
				</uni-popup-dialog>

			</uni-popup>

		</view>

		<!-- 激活码弹框 -->
		<view>
			<!-- 输入框示例 -->
			<uni-popup ref="isopen" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" :before-close="true" title="请输入激活码" placeholder="请输入激活码"
					@confirm="dialogInputConfirm2"></uni-popup-dialog>
			</uni-popup>
		</view>
		<!-- 消息提示框 -->
		<uni-popup ref="message" type="message">
			<uni-popup-message type="warn" :message="tip" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>
<script>
import {
	ethers,
} from 'ethers'
import {
	refStoreAddress,
	refAbi,
	RunbitAddress,
	RunbitAbi,
	equipAddress,
	equipAbi,
	cardAddress,
	cardAbi,
} from '../../../contract/address.js'
import {
	useContract,
	hideBankCards,
	useQuickContract
} from '../../../contract/useContract.js'
import {
	setTrack,
	bindEquip,
	bindCard,
	unbindEquip,
} from '../../../contract/useRunbit.js'
import {
	getMyCards,
	getMyEquips,
	getNFTApprove,
	approveNFT
} from '../../../contract/useEquipCard.js'
import {
	displayNum
} from '../../../contract/ultis.js'
import {
	myRequest
} from '../../../utils/api.js'
import {
	getUserInfo
} from '../../../contract/useRunbitProxy.js'

export default {
	data() {
		return {
			stepStaus: 1,
			stepLogo: '../../../static/Ellipse38.png',
			stack: '烈日沙滩',
			reward: 0,
			specialty: 0, //功能
			aesthetic: 0, //美观
			comfort: 0, //舒适
			trackId: '',
			tip: '',
			equipsImgs: [{
				img: '../../../static/chooseImg.png',
			},
			{
				img: '../../../static/chooseImg.png',
			},
			{
				img: '../../../static/chooseImg.png',
			},
			],
			currentCard: '',
			cardId: 0,
			carIndex: 0,
			cardsList: [],
			cardImgs: [],
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
			currentequips: {
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
			Steps: '',
			shoeEquips: [],
			myEquips: [],
			pantEquips: [],
			waistEquips: [],
			equips: '', //当前装备
			equipId: 0,
			curequipIndex: 0,
			EquipsList: [],
			getSteps: 0,
			goodsArr: [],
			userAccount: '连接钱包',
			value: '',
			type: 'center',
			scrrenHeight: 10,
			value: "",
			title: 'Hello',
			layerAddress: '',
			rpcaddr: '',
			myAccount: '',
			layerAbi: '',
			curDay: '',
			collectContract: null,
			approveState: true,
			steps: 0,
			equip: '',
			equipContract: null,
			cardContract: null,
			setTrackId: 0,
			gasPriceString: '',
		}
	},
	onShow() {
		
		const BASE_URL = 'https://gapi.runbit.org/api/v1/'
		 uni.request({
			url: BASE_URL + 'game/getPrice',
			method: "GET",
			success: res => {
				if (res.data.code === 0) {
					// var data =res.data.data;
				// this.RBPRICE = res.data.data
				getApp().globalData.rbPrice =res.data.data;
				
				}
			}
		})

		this.loadIndex = getApp().globalData.loadIndex;
		if (this.loadIndex == 1) {
			this.myCards = JSON.parse(uni.getStorageSync('myCards'));
			this.myEquips = JSON.parse(uni.getStorageSync('myEquips'));
			this.equips = JSON.parse(uni.getStorageSync('bindEquips'));
			this.getEquitCardValue()
			this.getequipsImg(this.equips);
			getApp().globalData.loadIndex = 0

		}
	},
	mounted() {
		this.scrrenHeight = uni.getSystemInfoSync().windowHeight;
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
			//判断网络
			window.ethereum.request({
				method: "eth_chainId"
			}).then(chainId => {
				if (chainId != 137) {
					uni.showToast({
						title: "请使用polygon网络!",
						icon: "error"
					})
				}
			});
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			provider.getGasPrice().then((gasPrice) => {
				this.gasPriceString = (parseInt(gasPrice) * 2).toString();
				uni.setStorageSync('gasPriceString', this.gasPriceString);
			});
			uni.showLoading({
				title: '正在从区块链同步您的数据...'

			})
			provider.send("eth_requestAccounts", []).then(async accounts => {
				this.myAccount = accounts[0];
				getApp().globalData.userAccount = this.myAccount;
				uni.clearStorage();
				this.getStep();
				setInterval(() => {
					this.getStep();
				}, 10000);
				//
				this.userAccount = hideBankCards(accounts[0]);

				//判断是否需要填激活码		 
				await this.getRef()
				this.loadUserInfo()
				this.loadmyEquips()
				this.loadMyCards()

				useContract(RunbitAddress, RunbitAbi).then(contract => {
					this.runContract = contract
				})

			});
		} catch (e) {
			let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""
			uni.showToast({
				title: "加载失败" + ":" + reason,
				icon: "none"
			})
		}

	},
	beforeCreate() {

	},
	methods: {
		displayNum,
		async getRef() {
			this.refContract = await useContract(refStoreAddress, refAbi)
			var refer = await this.refContract.referrer(this.myAccount)
			if (refer === '0x0000000000000000000000000000000000000000') {
				this.$refs.isopen.open();
				//没有推荐人
				uni.hideLoading()
			} else {
				uni.setStorageSync('inviter', refer);
			}
		},
		loadUserInfo() {
			uni.getStorage({
				key: 'bindEquips'
			})
				.then(res => {
					//有缓存
					if (!res[0]) {
						this.equips = JSON.parse(res[1].data);

						this.getequipsImg(this.equips);
						uni.hideLoading();
						console.log("bindEquips", this.equips)
					}
					//无缓存
					else {
						getUserInfo(this.myAccount).then(info => {
							let equips = []
							for (let i = 0; i < 3; ++i) {
								if (info[0][i].toNumber() == 0) {
									equips[i] = 0
									continue
								}
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
									if (info[3][j].toNumber() == 0) {
										cards[j % 3] = 0
										continue
									}
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

							this.getequipsImg(this.equips);
							uni.hideLoading();
							this.specialty = info[7].toNumber()
							this.aesthetic = info[8].toNumber()
							this.comfort = info[9].toNumber()
							this.steps = info[10].toNumber()
							this.reward = ethers.utils.formatEther(info[11])
							this.trackId = info[12].toNumber()
							this.setTrackId = info[13].toNumber()
							this.chooseTrack(this.trackId)
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
		},
		loadmyEquips() {
			uni.getStorage({
				key: 'myEquips'
			}).then(async res => {
				//有缓存
				if (!res[0]) {
					this.myEquips = JSON.parse(res[1].data);
				} else {
					//没缓存
					let myEquips = await getMyEquips(this.myAccount)
					this.myEquips = myEquips;
					uni.setStorage({
						key: 'myEquips',
						data: JSON.stringify(
							myEquips),
						success: function () {
							console.log(
								'cache myEquips'
							);
						}
					});


				}
			});
		},
		loadMyCards() {
			uni.getStorage({
				key: 'myCards'
			}).then(async res => {
				//有缓存
				if (!res[0]) {
					this.myCards = JSON.parse(res[1].data);
				} else {
					//没缓存
					let myCards = await getMyCards(this.myAccount)
					this.myCards = myCards;
					uni.setStorage({
						key: 'myCards',
						data: JSON.stringify(
							myCards),
						success: function () {
							console.log(
								'cache myCards'
							);
						}
					});

				}
			})
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

		async unEquip() {
			if (this.getSteps != this.steps) {
				uni.showToast({
					title: "有未更新的步数，请先更新!",
					icon: "error"
				})
				return
			}
			uni.showLoading({
				title: '装备卸下中...'

			})
			//curequipIndex 装备类型
			try {
				let tx = await unbindEquip(this.runContract, this.curequipIndex, this.gasPriceString)

				await tx.wait()
				//装备卸载成功，从绑定装备列表删除
				this.equips[this.curequipIndex] = 0
				this.getequipsImg(this.equips);
				this.getEquitCardValue()
				uni.showToast({
					title: "装备卸下成功",
					icon: "success"
				})
				uni.setStorage({
					key: 'bindEquips',
					data: JSON.stringify(this.equips),
					success: function () {
						console.log('cache bindEquip');
					}
				});
				getApp().globalData.loadMine = 1;
			} catch (e) {
				console.error(e)
				let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""
				uni.showToast({
					title: "卸载装备失败" + ":" + reason,
					icon: "none"
				})
			} finally { }
		},
		//打开卡片筛选
		addCard(index) {
			if (this.steps != 0) {

				uni.showToast({
					title: "已更新步数，无法更换属性卡",
					icon: "error"
				})
				return
			}

			this.carIndex = index;
			this.cardsList = this.myCards?.filter((item) => {
				if (item.status == 0 && item.card.level <= this.equips[this
					.curequipIndex].equip.level) return item
			})
			this.$refs.equipInfo.close()
			this.$refs.choosecardDialog.open() //装备筛选
			if (this.cardsList.length == 0)
				uni.showToast({
					title: "没有可绑定的卡片",
					icon: "error"
				})
		},
		getFix2(num) {
			var value = Math.floor(num * 1000) / 1000
			return value
		},
		//卡片确认选择
		async choosecard() {
			if (this.cardId == 0) {
				uni.showToast({
					title: "未选中属性卡",
					icon: "error"
				})
				return
			}
			if (this.currentCard.card.level > this.currentequips.equip.level) {
				uni.showToast({
					title: "卡片等级大于装备等级",
					icon: "error"
				})
				return
			}
			uni.showLoading({
				title: '绑定中...'
			});
			try {
				let tx = await bindCard(this.runContract, this.currentequips.id, this.cardId, this.carIndex, this
					.gasPriceString);
				await tx.wait()
				//该装备添加卡片
				this.equips[this.currentequips.equip.equipType].cards[this.carIndex] = this.currentCard
				this.getEquitCard(this.currentequips.equip.equipType);
				this.$refs.choosecardDialog.close()
				this.$refs.equipInfo.open()
				this.getEquitCardValue()

				uni.hideLoading();
				uni.showToast({
					title: "绑定成功",
					icon: "success"
				})
				//更新我的装备
				uni.setStorage({
					key: 'bindEquips',
					data: JSON.stringify(this.equips),

				});
				//更新我的卡片--卡片绑定状态改变								
				let myCards = await getMyCards(this.myAccount)
				this.myCards = myCards;
				getApp().globalData.loadMine = 1;
				uni.setStorage({
					key: 'myCards',
					data: JSON.stringify(
						myCards),
					success: function () {
						console.log(
							'cache myCards'
						);
					}
				});

				this.myEquips = await getMyEquips(this.myAccount)
				uni.setStorage({
					key: 'myEquips',
					data: JSON.stringify(this.myEquips),
					success: function () {
						console.log('success');
					}
				});


			} catch (e) {

				uni.hideLoading();
				let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""
				uni.showToast({
					title: "绑定装备失败" + ":" + reason,
					icon: "none"
				})
			}

		},
		//卡片点击事件
		changeCard(item) {
			this.currentCard = item;
			this.cardId = parseInt(item.id);
		},
		// 获取装备图片绑定
		getequipsImg(equips) {
			if (equips.length > 0) {
				if (equips[0].img) {
					this.equipsImgs[0].img = equips[0].img;
				} else {
					this.equipsImgs[0].img = '../../../static/chooseImg.png';
				}
				if (equips[1].img) {
					this.equipsImgs[1].img = equips[1].img;
				} else {
					this.equipsImgs[1].img = '../../../static/chooseImg.png';
				}
				if (equips[2].img) {
					this.equipsImgs[2].img = equips[2].img;
				} else {
					this.equipsImgs[2].img = '../../../static/chooseImg.png';
				}
			}
		},
		//装备筛选点击装备事件
		onGoods(item) {

			this.equipId = parseInt(item.id);
			this.equip = item;
		},
		// 装备筛选确认选中绑定装备
		async chooseEquip() {
			//如果没选中装备，不允许确认

			if (!this.equipId) {
				uni.showToast({
					title: "请选择装备",
					icon: "error"
				})
				return
			}
			var that = this;
			uni.showLoading({
				title: '装备绑定中...'

			})

			try {
				let tx = await bindEquip(this.runContract, this.equipId, this.gasPriceString)
				await tx.wait()
				uni.showToast({
					title: "绑定成功",
					icon: "success"
				})
				uni.hideLoading()
				this.equips[this.equip.equip.equipType] = this.equip
				this.getEquitCardValue()
				this.getequipsImg(this.equips)
				uni.setStorage({
					key: 'bindEquips',
					data: JSON.stringify(this.equips),
					success: function () {
						console.log('success');
					}
				});

				getApp().globalData.loadMine = 1;

			} catch (e) {
				console.error(e)
				let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""
				uni.showToast({
					title: "绑定失败" + ":" + reason,
					icon: "none"
				})
				//todo 错误提示
			} finally {

			}
		},
		//获取绑定的卡片
		async getEquitCard(index) {
			let cards = this.equips[index].cards
			if (cards && cards[0] && cards[0].img) {
				this.cards[0].img = cards[0].img;
			} else {
				this.cards[0].img = '../../../static/Group12032.png';
			}
			if (cards && cards[1] && cards[1]?.img) {
				this.cards[1].img = cards[1].img;
			} else {
				this.cards[1].img = '../../../static/Group12032.png';
			}
			if (cards && cards[2] && cards[2]?.img) {
				this.cards[2].img = cards[2].img;
			} else {
				this.cards[2].img = '../../../static/Group12032.png';
			}


		},
		//累加已绑卡片的总性能
		getEquitCardValue() {
			this.comfort = 0
			this.specialty = 0
			this.aesthetic = 0
			for (let i = 0; i < 3; i++) {
				if (this.equips[i]) {
					let cards = this.equips[i].cards
					for (let j = 0; j < 3 && cards; j++) {
						if (cards[j]) {
							this.specialty = this.specialty + parseInt(cards[j].card.specialty);
							this.aesthetic = this.aesthetic + parseInt(cards[j].card.aesthetic);
							this.comfort = this.comfort + parseInt(cards[j].card.comfort);
						}
					}
				}
			}
		},
		//装备点击详情 index--装备类型
		//装备点击详情 index--装备类型
		async chooseEquipDia(index) {
			this.curequipIndex = index;
			this.EquipsList = this.myEquips?.filter((item) => {
				if (item.equip.equipType == index) return item
			})
			if (this.equips[index] == 0) //
			{
				if (this.EquipsList.length <= 0) {
					uni.showToast({
						title: "该部位没有装备",
						icon: "error"
					})
					return
				}
				this.$refs.chooseEquipDialog.open() //装备筛选
			} else {
				this.currentequips = this.equips[index];
				this.equipId = this.equips[index].id;
				this.getEquitCard(index);
				this.$refs.equipInfo.open()
				//打开装备详情
			}
		},


		// 赛道弹框
		inputDialogToggle() {
			if (this.trackId != this.setTrackId)
				uni.showToast({
					title: "今日已更新过赛道",
					icon: "error"
				})

			this.$refs.inputDialog.open()
		},

		//赛道确认
		async dialogInputConfirm() {
			//当前没装备，不允许设置赛道
			if (this.equips[this.setTrackId] == 0) {
				this.closeTrack();
				var tip = this.setTrackId == 0 ? "石子路必须穿鞋子!" : this.setTrackId == 1 ? "芳草地必须穿裤子!" : "沙滩路必须穿上衣!"

				uni.showToast({
					title: tip,
					icon: "error"
				})
				return
			}
			uni.showLoading({
				title: '更新赛道中...'
			})
			this.$refs.inputDialog.close()
			try {
				let tx = await setTrack(this.runContract, this.setTrackId, this.gasPriceString)
				await tx.wait()
				id = this.trackId;
				if (id == 0)
					this.stack = "石子路"
				if (id == 1)
					this.stack = "芳草地"
				if (id == 2)
					this.stack = "烈日沙滩"
				uni.showToast({
					title: "您选择的跑道将在明天生效",
					icon: "success"
				})
			} catch (e) {
				let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""

				uni.showToast({
					title: "更新失败" + ":" + reason,
					icon: "none"
				})

			} finally {
				uni.hideLoading()
			}
		},


		// 激活码激活
		async dialogInputConfirm2(val) {
			var isAddress = ethers.utils.isAddress(val);
			try {
				if (!isAddress) {
					uni.showToast({
						title: "激活码错误",
						icon: "error"
					})
					return
				}
				let tx = await this.refContract.addReferrerWithCheck(val, {
					gasLimit: 1200000,
					gasPrice: this.gasPriceString
				});
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

				let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""

				uni.showToast({
					title: "激活失败" + ":" + reason,
					icon: "none"
				})
			}
		},
		//赛道取消按钮
		closeTrack() {
			// if (this.trackId == 0)
			// 	this.stack = "石子路"
			// if (this.trackId == 1)
			// 	this.stack = "芳草地"
			// if (this.trackId == 2)
			// 	this.stack = "烈日沙滩"
		},
		//选中赛道
		chooseTrack(id) {
			//更新选中的赛道
			this.trackId = id;
			if (this.trackId == 0)
				this.stack = "石子路"
			if (this.trackId == 1)
				this.stack = "芳草地"
			if (this.trackId == 2)
				this.stack = "烈日沙滩"

			this.setTrackId = id
			//todo 选中的赛道更新样式
		},
		//确认更新赛道
		setTrack() {
			try {
				this.runContract.updateTrack(id).then(tx => {
					//更新成功
					this.trackId = id
					if (id == 0)
						this.stack = "石子路"
					if (id == 1)
						this.stack = "芳草地"
					if (id == 2)
						this.stack = "烈日沙滩"
				})
			} catch (e) {

				let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""

				uni.showToast({
					title: "更新失败" + ":" + reason,
					icon: "none"
				})
				//出错处理
			}
		},
		//获取最新步数
		getStep() {
			//从接口获取最新步数
			return new Promise((resolve, reject) => {
				//todo 设置baseurl
				this.baseurl = 'https://gapi.runbit.org/api/v1/'
				uni.request({
					url: this.baseurl + 'game/getUserLastSteps',
					data: {
						addr: this.myAccount
					},
					method: "GET",
					success: res => {
						if (res.data.code === 0) {
							this.getSteps = res.data.data.steps
							var min = this.calculateDiffTime(res.data.data.timestamp);
							if (res.data.data.steps == 0 || parseInt(min) > 1) {
								console.log("离线-" + min);
								this.Steps = "离线 " + res.data.data.steps
								this.stepStaus = 0;
								this.stepLogo = "../../../static/close.png"
							} else {
								console.log("在线-" + min);
								this.Steps = "在线 " + res.data.data.steps
								this.stepStaus = 1;
								this.stepLogo = "../../../static/Ellipse38.png"
							}
							uni.setStorageSync('Steps', res.data.data.steps);
							getApp().globalData.userStep = this.Steps;
							getApp().globalData.stepStaus = this.stepStaus;
							getApp().globalData.stepLogo = this.stepLogo;
							this.check_sum = res.data.data.check_sum
						}
					}
				})
			})
		},
		/**
		 * 计算时间戳与当前时间的差值
		 * @param start_time 开始时间戳
		 */
		calculateDiffTime(start_time) {
			if (!parseInt(start_time)) return "-";
			var endTime = Math.round(new Date() / 1000);

			var timeDiff = endTime - start_time
			var day = parseInt(timeDiff / 86400);
			var hour = parseInt((timeDiff % 86400) / 3600);
			var minute = parseInt((timeDiff % 3600) / 60);

			day = day ? (day + '天') : '';
			hour = hour ? (hour + "时") : '';
			minute = minute ? minute : 0;
			return minute;
		},
		//更新到合约中
		async updateStep() {
			uni.showLoading({
				title: '步数同步中...'
			})
			//从接口获取最新步数
			if (this.getSteps == this.steps) {
				uni.showToast({
					title: "步数无需更新",
					icon: "none"
				})
				//todo 提示无需更新
				return
			}
			try {
				await this.runContract.updateSteps(this.check_sum)
				this.steps = this.getSteps
				uni.setStorageSync('steps', this.steps);

			} catch (e) {

				let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""

				uni.showToast({
					title: "更新失败" + ":" + reason,
					icon: "none"
				})
				//todo 出错
			} finally {
				uni.showToast({
					title: "步数同步成功",
					icon: "success"
				})
				uni.hideLoading()
			}
		}
		//
	}
}
</script>

<style>
.id4 {
	width: 12.5rem;
	color: #000000;
	font-size: 0.9375rem;
	font-weight: bold;
}

.flex-item {
	width: 250.88rpx;
	height: 34.72rpx;
}

.smicon {
	width: 15.88rpx;
	height: 23.88rpx;
}

.rareValue {
	color: #000000;
	width: 110.55rpx;
	height: 34.72rpx;
	text-align: center;
	margin-left: 7rem;
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

/* 图片居中 */
.addcards {
	width: 28%;
	margin: 0 auto;
	display: inline-block;
	margin: 1.25rem auto;
	height: 200rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.userlogo {
	box-sizing: border-box;
	text-align: center;
	position: absolute;
	width: 169.44rpx;
	height: 60.83rpx;
	line-height: 53.83rpx;
	font-weight: bold;
	font-size: 25.41rpx;
	right: 0;
	top: 200.11rpx;
	background: #FFEB34;
	border: 1px solid #000000;
	border-radius: 100px 0px 0px 100px;
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
	font-size: 25.83upx;
	margin-left: 66.94rpx;
	text-align: center;
	height: 60rpx;
	line-height: 65rpx;
}

.user_person {
	position: absolute;
	height: 80%;
}

.user_person_item {
	position: absolute;
	height: 100%;
}

.content2 {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;
	background-color: #F3F3F3;
}

.bg {
	position: absolute;
	width: 100%;
	height: 26.875rem;
	left: 0px;
	top: 0px;

	background: linear-gradient(180deg, #F3F3F3 0%, rgba(255, 177, 20, 0.0) 100%);
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
	margin-left: 8.47rpx;
	display: flex;
	flex-direction: row;
	font-weight: bold;
	align-items: center;
	font-size: 25rpx;
	width: 188.88rpx;
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
	width: 25.88rpx;
	height: 25.88rpx;
	display: block;
	margin: auto 0;
	margin-left: 16.94rpx;
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

	position: absolute;
	right: 6.94rpx;
	/* margin-left: 1.1rem; */
	width: 10rem;
	top: 6%;

	/* background-color: red; */
	height: 65rpx;
}

.person {
	width: 30%;
	height: 645.83rpx;
	margin: 0 auto;
}

.gp11 {
	margin-top: 4.5rem;
	margin-left: 0.625rem;
	width: 190.88rpx;
	height: 180.88rpx;
}

.gp12 {
	width: 190.88rpx;
	margin-left: 0.825rem;
	height: 180.88rpx;
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
	text-align: right;
	margin-right: 13.88rpx;
}

.idvalue2 {
	width: 138.88rpx;
	margin-left: 4rem;
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

.ondialogimg {
	display: block;
	margin: 0 auto;
	width: 408.33rpx;
	height: 248.88rpx;
	padding: 6.94rpx;
	border: 2px solid red !important;
	border-radius: 33.88rpx;
}
</style>
