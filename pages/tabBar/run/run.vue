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

			<view style="margin-top: 123.88rpx; height:69.44rpx ; width: 100%;">
				<u-subsection style="width: 90%; margin-left: 5%;" activeColor="#FFEB34" font-size="15" :list="list"
					mode="subsection" :current="curNow" @change="sectionChange"></u-subsection>
				<view>
					<view v-if="curNow === 0" style="background:#F3F3F3">
						<view class="uni-flex uni-row"
							style="display: flex; margin:1rem 0px; height: 85.55rpx; margin-left: 5%; width: 90%; ">
							<view style="width: 50%; margin: auto 0;  ">
								<uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select>
							</view>
							<view @click="actionSheetTap" class="fillter">筛选</view>
							<image @click="actionSheetTap" class="filltericon" src="../../../static/Frame3.png"></image>

						</view>
						<oct-goods v-if="equipCollect.length > 0" :lists="equipCollect" price-type="$"
							@onGoods="onGoods" />
					</view>
					<view v-if="curNow === 1" style="background:#F3F3F3">
						<view class="uni-flex uni-row"
							style="display: flex; margin:1rem 0px; height: 85.55rpx;margin-left: 5%; width: 90%; ">
							<view style="width: 50%; margin: auto 0; ">
								<uni-data-select v-model="carvalue" :localdata="carRange" @change="carChange">
								</uni-data-select>
							</view>

						</view>
						<cardItem v-if="cardCollect.length > 0" :lists="cardCollect" price-type="$"
							@onGoods="onGoods2" />

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
									<image v-if="currentEquips.equip.level >= 2" class="smicon "
										src="../../../static/Group115861.png"></image>
									<image v-if="currentEquips.equip.level >= 3" class="smicon "
										src="../../../static/Group115861.png"></image>
									<image v-if="currentEquips.equip.level >= 4" class="smicon "
										src="../../../static/Group115861.png"></image>
									<image v-if="currentEquips.equip.level >= 5" class="smicon "
										src="../../../static/Group115861.png"></image>
								</view>
								<view class="flex-item flex-itemValue idvalue2">{{ currentEquips.equip.quality }}</view>
							</view>

							<view class="curId uni-flex uni-row" style="margin-top: 0.8rem;">
								<view class="flex-item ">卡片槽</view>
								<view class="flex-item idvalue2">可升级</view>
							</view>

							<view class="curId uni-flex uni-row">
								<view class="flex-item flex-itemValue">{{ currentEquips.equip.capacity }}</view>
								<view v-if="currentEquips.equip.upgradeable == 0"
									class="flex-item flex-itemValue idvalue2">否</view>
								<view v-if="currentEquips.equip.upgradeable == 1"
									class="flex-item flex-itemValue idvalue2">是</view>
							</view>

						</uni-card>

						<view class="uni-flex uni-row" style="width: 90%; margin: 0 auto;">
							<view class="flex-item id3">mint</view>
							<view class="idvalue3">{{ currentEquips.equip.sales }}/{{ currentEquips.equip.stock }}
							</view>
						</view>
						<view class="uni-flex uni-row" style="width: 90%; margin: 10px auto;">
							<view class="id3">购买价格(RB)</view>
							<view class="idvalue3">{{ big2num(currentEquips.equip.price1) }}</view>
						</view>
						<view class="uni-flex uni-row" style="width: 90%; margin: 10px auto;">
							<view class="id3">兑换价格(RBET)</view>
							<view class="idvalue3">{{ currentEquips.equip.price0 }}</view>
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

						<image class="cards" :src="currentcover"></image>
						<uni-card title="" extra=""
							style="width: 90%; border:1px solid black; border-radius: 0.825rem; background-color:#F4F5F6 ; margin: 1rem auto;">


							<view class="curId uni-flex uni-row">
								<view class=" ">{{ currnetDesc }}</view>
							</view>

						</uni-card>
						<view class="uni-flex uni-row" style="width: 98%; margin: 10px auto;">
							<view class="flex-item id3">cost</view>
							<view v-if="currentPayType == 0" class="idvalue3">{{ currentprice0 }} {{currentUnit}}
							</view>
							<!-- 兑换 -->
							<view v-if="currentPayType == 1" class="idvalue3">{{ currentprice1 }} RB</view>
							<!-- 购买 -->
						</view>

					</view>
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

		<!-- 购买卡片弹框 -->
		<view>
			<uni-popup ref="inputDialog3" type="dialog">


				<uni-popup-dialog ref="inputClose" cancelText="兑换" confirmText="购买" title="购买" value="对话框预置提示内容!"
					placeholder="请输入内容" @close="redmCardBtn" @confirm="buyCardBtn">
					<view>

						<img class="cards" :src="currentCard.cover" />

						<view class="uni-flex uni-row" style="width: 98%; margin: 10px auto;">
							<view class="flex-item id3">mint</view>
							<view class="idvalue3">{{ currentCard.card.sales }}/{{ currentCard.card.stock }}</view>
						</view>
						<view class="uni-flex uni-row" style="width: 98%; margin: 10px auto;">
							<view class="flex-item id3">购买价格(RB)</view>
							<view class="idvalue3">{{ big2num(currentCard.card.price1) }}</view>
						</view>
						<view class="uni-flex uni-row" style="width: 98%; margin: 10px auto;">
							<view class="flex-item id3" style="width: 438.88rpx;">兑换价格(RBCT)</view>
							<view class="idvalue3">{{ currentCard.card.price0 }}</view>
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
	cardAddress,
	cardAbi,
	equipAddress,
	equipAbi,
	RunbitAddress,
	RunbitAbi,
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
import {
	myRequest
} from '../../../utils/api.js'
import {
	getMyCards,
	getMyEquips
} from '../../../contract/useEquipCard.js'


export default {
	data() {
		return {
			stepLogo: '',
			stepStaus: 1,
			changeType: '',
			getSteps: '',
			userAccount: '连接钱包',
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
			currentPayType: 0,
			isOpen: true,
			equips: {},
			collectionId: 0,
			currnetDesc: "",
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
			baseurl: 'https://gapi.runbit.org/api/v1/',
			value: 10,
			carvalue: '',
			carRange: [{
				value: '',
				text: "全部"
			},
			{
				value: 1,
				text: "一级"
			},
			{
				value: 2,
				text: "二级"
			},
			{
				value: 3,
				text: "三级"
			},
			{
				value: 4,
				text: "四级"
			},
			{
				value: 5,
				text: "五级"
			},
			],
			range: [{
				value: '',
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
			curNow: 0,
			list: ['运动装备', '属性卡'],
			current: 0,
			colorIndex: 0,
			items: ['选项卡1', '选项卡2'],
			styleType: 'button',
			activeColor: '#FFEB34',
			currentUnit: '',
			contract: null,
			RBETContract: null,
			RBCTContract: null,
			RBContract: null,
			refContract: null,
			gasPriceString: '',
			equip_level: ''
		}
	},
	mounted() {


	},
	onLoad() {

		var that = this;
		that.getSteps = getApp().globalData.userStep
		that.stepStaus = getApp().globalData.stepStaus;
		that.stepLogo = getApp().globalData.stepLogo;
		try {

			this.getShops();
			if (!window.ethereum) {

				return
			}

			const provider = new ethers.providers.Web3Provider(window.ethereum);
			provider.getGasPrice().then((gasPrice) => {
				// gasPrice is a BigNumber; convert it to a decimal string
				this.gasPriceString = (parseInt(gasPrice) * 2).toString();

			});

			provider.send("eth_requestAccounts", []).then(accounts => {
				this.myAccount = accounts[0]

				this.userAccount = hideBankCards(accounts[0]);

				//加载属性卡和装备库
				//查询商店合约授权情况，授权后才能购买和兑换
				useContract(RBAddress, RBAbi).then(RBContract => {
					//获取rb余额 本页面RB不进行换算，显示时换算
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
				//获取属性卡碎片
				useContract(RBCTAddress, RBCTAbi).then(RBCTContract => {
					this.RBCTContract = RBCTContract
					RBCTContract.balanceOf(this.myAccount).then(balanceofRBCT => {
						this.balanceofRBCT = parseInt(balanceofRBCT)
					})
					//获取RBCT属性卡碎片对商品合约的授权情况
					RBCTContract.allowance(this.myAccount, RunbitCollectionAddress).then(data => {
						if (data.eq(BigNumber.from(0))) {
							this.approveRBCT = false
						} else {
							this.approveRBCT = true
						}
					})
				});
				//获取装备碎片
				useContract(RBETAddress, RBETAbi).then(RBETContract => {
					this.RBETContract = RBETContract
					RBETContract.balanceOf(this.myAccount).then(balanceofRBET => {
						this.balanceofRBET = parseInt(balanceofRBET)
					})
					//获取RBET装备碎片对商品合约的授权情况
					RBETContract.allowance(this.myAccount, RunbitCollectionAddress).then(data => {
						if (data.eq(BigNumber.from(0))) {
							this.approveRBET = false
						} else {
							this.approveRBET = true
						}
					})
				});

			});

			useContract(RunbitCollectionAddress, RunbitCollectionAbi).then(contract => {
				this.collectContract = contract
			})
		} catch (e) {
			console.error(e);
			let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""
			uni.showToast({
				title: "加载失败" + ":" + reason,
				icon: "none"
			})
		}
	},
	methods: {
		updateMyCards() {
			getMyCards(this.myAccount).then(myCards => {
				this.myCards = myCards;
				getApp().globalData.loadIndex = 1;

				getApp().globalData.loadMine = 1;
				uni.setStorage({
					key: 'myCards',
					data: JSON.stringify(myCards),
					success: function () {
						console.log('cache myCards');
					}
				});
			})
		},
		updateMyEquips() {
			getMyEquips(this.myAccount).then(myEquips => {
				this.myEquips = myEquips;
				getApp().globalData.loadIndex = 1;

				getApp().globalData.loadMine = 1;
				uni.setStorage({
					key: 'myEquips',
					data: JSON.stringify(myEquips),
					success: function () {
						console.log('cache myEquips');
					}
				});
			})
		},
		big2num,
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
		//兑换卡片确认按钮
		redmCardBtn() {
			
			if (!window.ethereum) {
				uni.showModal({
					content: '请使用DAPP浏览器或安装metamask!',
					showCancel: false,
					success: ({ confirm, cancel }) => {

					}
				})
				return
			}

			this.currentUnit = "RBCT"
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

			if (!window.ethereum) {
				uni.showModal({
					content: '请使用DAPP浏览器或安装metamask!',
					showCancel: false,
					success: ({ confirm, cancel }) => {

					}
				})
				return
			}
			this.currentUnit = "RBET"
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

			if (!window.ethereum) {
				uni.showModal({
					content: '请使用DAPP浏览器或安装metamask!',
					showCancel: false,
					success: ({ confirm, cancel }) => {

					}
				})
				return
			}
			this.currentPayType = 1;

			this.$refs.inputDialogs.close();
			var a = ethers.utils.formatEther(this.balanceOfRB);
			var b = this.currentEquips.equip.price1;

			if (parseFloat(a) > parseFloat(b)) {
				this.buyEquip(this.collectContract, this.currentEquips.equip.equip_Type, this.collectionId);
			} else {
				uni.showToast({
					title: "余额不足",
					icon: "error"
				})
			}

		},
		buyCardBtn() {

			if (!window.ethereum) {
				uni.showModal({
					content: '请使用DAPP浏览器或安装metamask!',
					showCancel: false,
					success: ({ confirm, cancel }) => {

					}
				})
				return
			}
			this.currentPayType = 1;
			var a = ethers.utils.formatEther(this.balanceOfRB);
			var b = this.currentCard.card.price1;

			if (parseFloat(a) > parseFloat(b)) {

				// if (ethers.utils.formatEther(this.balanceOfRB) > ethers.utils.formatEther(this.currentCard.card.price1)) {
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
			this.collectionId = this.equipCollect[item].equip.collection_id;
			this.currentEquips = this.equipCollect[item];
			this.currentprice0 = this.currentEquips.equip.price0;

			this.currnetDesc = "mint中,您将很快收到您的装备";
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
				title: '',
				itemList: ['全部', '一级', '二级', '三级', '四级', '五级'],
				popover: {
					// 104: navbar + topwindow 高度，暂时 fix createSelectorQuery 在 pc 上获取 top 不准确的 bug
					top: that.buttonRect.top + 104 + that.buttonRect.height,
					left: that.buttonRect.left + that.buttonRect.width / 2
				},
				success: (e) => {
					if (e.tapIndex == 0)
						this.equip_level = "";
					else
						this.equip_level = e.tapIndex;
					this.getShops();
					// uni.showToast({
					// 	title: "点击了第" + e.tapIndex + "个选项",
					// 	icon: "none"
					// })
				}
			})
		},

		// 点击卡片列表
		onGoods2(index) {
			this.collectionId = this.cardCollect[index].card.collection_id;
			this.currentCard = this.cardCollect[index];
			this.currentprice0 = this.currentCard.card.price0;
			this.currnetDesc = "mint中,您将很快收到您的属性卡";
			this.currentprice1 = this.currentCard.card.price1;
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
		change(item) {
			this.changeType = item;
			this.getShops();
			// this.getEquips(this.collectContract)

		},
		carChange(item) {
			this.carvalue = item;
			this.getShops();

		},

		async getShops() {
			var that = this;
			uni.showLoading({
				title: '加载中....'
			});
			this.baseurl = 'https://gapi.runbit.org/api/v1/'
			uni.request({
				url: this.baseurl + 'game/storeInfo',
				data: {
					equip_type: this.changeType,
					card_level: this.carvalue,
					equip_level: this.equip_level
				},
				method: "GET",
				success: res => {
					uni.hideLoading();
					if (res.data.code === 0) {
						that.equipCollect = [];
						that.cardCollect = [];

						for (var i = 0; i < res.data.data.equip.length; i++) {
							var resultObj = {};
							resultObj.balance = res.data.data.equip[i].sales / res.data.data.equip[i]
								.stock * 100
							resultObj.cover = "https://gapi.runbit.org/images/" + res.data.data
								.equip[i].cover;
							resultObj.equip = res.data.data.equip[i];
							if (res.data.data.equip[i].status != '0') {
								that.equipCollect.push(resultObj);
							}
						}

						for (var i = 0; i < res.data.data.card.length; i++) {
							var resultObj = {};
							resultObj.balance = res.data.data.card[i].sales / res.data.data.card[i]
								.stock * 100
							resultObj.card = res.data.data.card[i];
							resultObj.cover = "https://gapi.runbit.org/images/" + res.data.data.card[
								i].cover;
							if (res.data.data.card[i].status != '0') {

								that.cardCollect.push(resultObj);
							}
						}


					}
				}
			})
		},

		async getCards(contract) {
			var that = this;
			//获取属性卡数量numOfCard和属性卡合集cardCollect
			//cardLoading=true获取数据中
			uni.showLoading({
				title: '加载中....'
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
			uni.hideLoading();
		},
		//获取装备集合
		async getEquips(contract) {
			var that = this;
			//获取装备数量numOfEquip和装备合集equipCollect
			uni.showLoading({
				title: '加载中2'
			});
			that.equipCollect = [];

			contract.getEquipCollectCount().then(async num => {
				for (var i = 0; i < num; i++) {
					await contract.getEquipCollection(i).then(async equip => {
						if (equip.level == 1) {
							await that.getImg(1, i, equip);
						}
						uni.hideLoading();
					})
				}
			});
			uni.hideLoading();
		},

		getImg(img_type, collection_id, currentObj) {

			var imgs = "";
			var that = this;
			myRequest({
				url: 'game/getCover',
				data: {
					img_type: img_type,
					collection_id: collection_id, //每一页12个数据
				},
			}).then(res => {
				imgs = "https://gapi.runbit.org/images/" + res;
				if (img_type == 1) {
					var resultObj = {};
					resultObj.balance = currentObj.sales / currentObj.stock * 100
					resultObj.cover = imgs;
					resultObj.equip = currentObj;
					if (that.changeType == 10) { //默认加载全部
						that.equipCollect.push(resultObj); //获取内容
					} else if (that.changeType == currentObj.equip_Type) {
						that.equipCollect.push(resultObj); //加载指定
					}

				} else {
					var resultObj = {};

					resultObj.balance = currentObj.sales / currentObj.stock * 100
					resultObj.card = currentObj;
					resultObj.cover = imgs;
					if (that.carvalue == 10) {
						that.cardCollect.push(resultObj); //获取内容
					} else if (that.carvalue == currentObj.level) {
						that.cardCollect.push(resultObj); //加载指定
					}

				}
				uni.hideLoading()
			})
			return imgs;
		},


		//购买卡片
		async buyCard(contract, cardId) {
			try {
				uni.showLoading({
					title: '正在为您的购买订单提交上链...'
				});
				//判断是否授权
				if (!this.approveState) {
					//未授权，弹窗提示授权？
					//用户点击确认授权后，调用授权代码，如下						
					await contractApprove(this.RBContract, RunbitCollectionAddress)
					this.approveState = true
					uni.showToast({
						title: "授权中,授权成功后重新点击购买",
						icon: "none"
					})
					return

				}
				this.$refs.inputDialog2.open()
				//已授权
				let tx = await contract.buyCard(cardId, {
					gasLimit: 1200000,
					gasPrice: this.gasPriceString
				});
				//交易hash
				await tx.wait()
				uni.showToast({
					title: "正在为您创建NFT卡片,请3分钟后到卡片页面查看",
					icon: "success"
				})
				uni.hideLoading()
				this.updateMyCards()

			} catch (e) {
				//出错的一些操作

				console.error(e)
				let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""
				uni.showToast({
					title: "购买失败" + ":" + reason,
					icon: "none"
				})
			} finally {

				this.$refs.inputDialog2.close()
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

					uni.showToast({
						title: "授权中,授权后重新购买",
						icon: "none"
					})
				}
				//已授权
				this.updateMyEquips()
				//购买成功的一些操作，如关闭loading



				this.$refs.inputDialog2.open()
				uni.showLoading({
					title: '正在为您的购买订单提交上链...'
				});

				let tx = await contract.buyEquip(collectionid, {
					gasLimit: 1200000,
					gasPrice: this.gasPriceString
				});
				tx.wait().then(res => {
					uni.hideLoading();
					uni.showToast({
						title: "正在为您创建装备，请3分钟后到装备页面查看",
						icon: "success"
					})

					this.updateMyEquips()
					//购买成功的一些操作，如关闭loading
				})

			} catch (e) {
				//出错的一些操作

				console.error(e)
				let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""
				uni.showToast({
					title: "购买失败" + ":" + reason,
					icon: "none"
				})
			} finally {
				this.$refs.inputDialog2.close()

			}
		},
		//兑换属性卡
		async redeemCard(contract, cardId) {
			try {
				uni.showLoading({
					title: '正在为您的兑换订单提交上链...'
				});
				//判断是否授权
				if (!this.approveRBCT) {
					//未授权，弹窗提示授权？
					//用户点击确认授权后，调用授权代码，如下						
					await contractApprove(this.RBCTContract, RunbitCollectionAddress)
					this.approveRBCT = true
					uni.showLoading({
						title: '开始授权...'
					});
					uni.showToast({
						title: "授权成功,重新兑换",
						icon: "success"
					})
					return
				}


				this.$refs.inputDialog2.open()
				//已授权
				//let tx = await contract.redeemCard(cardId)
				let tx = await contract.redeemCard(cardId, {
					gasLimit: 1200000,
					gasPrice: this.gasPriceString
				});
				tx.wait().then(res => {
					this.$refs.inputDialog2.close()
					uni.hideLoading();
					uni.showToast({
						title: "正在为您创建NFT卡片，请3分钟后到卡片页面查看",
						icon: "success"
					})
					//兑换成功的一些操作，如关闭loading
					this.updateMyCards()
				})

			} catch (e) {
				//出错的一些操作
				console.error(e)
				let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""
				uni.showToast({
					title: "兑换失败" + ":" + reason,
					icon: "none"
				})
			}
		},
		//兑换装备
		async redeemEquip(contract, collectionId) {
			try {
				uni.showLoading({
					title: '正在为您的兑换订单提交上链...'
				});
				if (!this.approveRBET) {
					uni.showLoading({
						title: '开始授权...'
					});

					await contractApprove(this.RBETContract, RunbitCollectionAddress)
					this.approveRBET = true
					uni.showToast({
						title: "授权中",
						icon: "none"
					})

				}


				this.$refs.inputDialog2.open()

				let tx = await contract.redeemEquip(collectionId, {
					gasLimit: 1200000,
					gasPrice: this.gasPriceString
				});
				tx.wait().then(res => {
					uni.hideLoading();

					this.$refs.inputDialog2.close()
					uni.showToast({
						title: "正在为您创建装备，请3分钟后到装备页面查看",
						icon: "success"
					})
					//兑换成功的一些操作，如关闭loading
					this.updateMyEquips
				})

			} catch (e) {
				//出错的一些操作

				console.error(e)
				let reason = e.reason ? e.reason : e.code ? (e.code == 4001 ? "拒绝交易" : e.massage) : ""
				uni.showToast({
					title: "兑换失败" + ":" + reason,
					icon: "none"
				})
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
	background-color: #F3F3F3;

	/* background: linear-gradient(180deg, #FFF7B0 0%, rgba(255, 247, 176, 0) 100%); */
	border-radius: 0px 0px 36px 36px;
}

.currentbs {
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
	color: red;
	width: 188.88rpx;
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
	font-size: 20rpx;
	width: 50%;
	text-align: right;

}

.filltericon {

	width: 45.83rpx;
	height: 45.83rpx;
	margin: auto 0;
	margin-left: 5rpx;
	padding-top: 18.94rpx;

}

.input_edi {
	position: absolute;
	width: 280rpx;
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
	width: 50%;
	text-align: right;
	float: right;
}

.smicon {
	width: 15.88rpx;
	height: 23.88rpx;
}

.flex-item {
	width: 200.55rpx;
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
	width: 70%;
	font-size: 0.90rem;
	text-align: left;
}

/* 图片居中 */
.cards {
	width: 50%;
	height: 288.88rpx;
	margin: 0 auto;
	display: inline-block;
	margin: 1.25rem auto;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
