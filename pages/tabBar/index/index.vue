<template>
	<view class="content">

		<view class="bg">

			<view class="uni-flex uni-row" @tap="openUser" style="margin: 1.425rem; height: 89.44rpx; ">
				<img src="../../../static/heard.png" style="width:3rem;" />
				<img class="currentImg" src="../../../static/Ellipse38.png" />
				<view class="currentbs">{{getSteps}}步</view>
				<view class="userName">
					<img class="input_edi" src="../../../static/input_edi.png"></img>
					<img class="input_logo" src="../../../static/inputlogo.png"></img>
					<view class="input_txt">{{userAccount}}</view>
				</view>

			</view>

			<view class="person">
				<img class="user_person" src="../../../static/grounp-5-2.png"></img>
				<view @tap="inputDialogToggle()" class="userlogo">{{stack}}</view>
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
							<view class="flex-item idvalue">{{specialty}}</view>
						</view>

						<view class="curId uni-flex uni-row">
							<view class="flex-item ">美观性</view>
							<view class="flex-item idvalue">{{aesthetic}}</view>
						</view>
						<view class="curId uni-flex uni-row">
							<view class="flex-item ">舒适性</view>
							<view class="flex-item idvalue">{{comfort}}</view>
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
							<view class="flex-item idvalue2">{{reward}} RB</view>
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
					@confirm="dialogInputConfirm">
					<view>

						<image :class="setTrackId==0?'ondialogimg':'dialogimg'" src="../../../static/Group11595.png"
							@click="chooseTrack(0)"></image>
						<image :class="setTrackId==1?'ondialogimg':'dialogimg'" src="../../../static/Group12072.png"
							@click="chooseTrack(1)"></image>
						<image :class="setTrackId==2?'ondialogimg':'dialogimg'" src="../../../static/Group12073.png"
							@click="chooseTrack(2)"></image>
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
									<image v-if="currentequips.equip.level>=2" class="smicon "
										src="../../../static/Group115861.png"></image>
									<image v-if="currentequips.equip.level>=3" class="smicon "
										src="../../../static/Group115861.png"></image>
									<image v-if="currentequips.equip.level>=4" class="smicon "
										src="../../../static/Group115861.png"></image>
									<image v-if="currentequips.equip.level>=5" class="smicon "
										src="../../../static/Group115861.png"></image>
								</view>
								<view class="flex-item flex-itemValue rare">{{currentequips.equip.quality}}</view>
							</view>

							<view class="curId uni-flex uni-row" style="margin-top: 0.8rem;">
								<view class="level ">卡片槽</view>
								<view class="rare">可升級</view>
							</view>

							<view class="curId uni-flex uni-row">
								<view class="level flex-itemValue">{{currentequips.equip.capacity}}</view>
								<view v-if="currentequips.equip.upgradeable==0" class="flex-item flex-itemValue rare">否
								</view>
								<view v-if="currentequips.equip.upgradeable==1" class="flex-item flex-itemValue rare">是
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
				<uni-popup-dialog ref="inputClose" mode="input" :before-close="true" title="通知" placeholder="请输入激活码"
					@confirm="dialogInputConfirm2"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {
		ethers,
	} from 'ethers'
	import {
		refStoreAddress,
		refAbi,
		RunbitCollectionAddress,
		RunbitCollectionAbi,
		RBAddress,
		RBAbi,
		RunbitAddress,
		RunbitAbi,
		equipAddress,
		equipAbi,
		cardAddress,
		cardAbi,
	} from '../../../contract/address.js'
	import {
		useContract,
		getApproveState,
		contractApprove,
		hideBankCards
	} from '../../../contract/useContract.js'
	import {
		setTrack,
		getTrackId,
		getBindEquips,
		bindEquip,
		getBindCards,
		bindCard,
		unbindEquip,
		getUnharvestReward,
		getUserState
	} from '../../../contract/useRunbit.js'
	import {
		getMyCards,
		getMyEquips,
		getNFTApprove,
		approveNFT
	} from '../../../contract/useEquipCard.js'
	import {
		title
	} from 'process'
	export default {
		data() {
			return {
				stack: '烈日沙滩',
				reward: 0,
				specialty: 0, //功能
				aesthetic: 0, //美观
				comfort: 0, //舒适
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
				userAccount: '',
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
				equipContract: null,
				cardContract: null,
				setTrackId: 0,
				gasPriceString: ''
			}
		},
		onLoad() {

			//  console.log( getApp().globalData.userStep);
			// this.layerAddress = getApp().globalData.layerAddress;
			//  this.layerAbi = getApp().globalData.layerAbi;
		},
		mounted() {
			this.scrrenHeight = uni.getSystemInfoSync().windowHeight;
			// this.$refs.isopen.open();
			try {
				uni.showLoading({
					title: '加载中...'

				})
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				provider.getBlock().then(block => {
					this.curDay = parseInt((block.timestamp + 28800) / 86400);
					this.lastStep
				});

				provider.getGasPrice().then((gasPrice) => {
					// gasPrice is a BigNumber; convert it to a decimal string
					this.gasPriceString = gasPrice.toString();



				});



				provider.send("eth_requestAccounts", []).then(accounts => {
					this.myAccount = accounts[0];
					uni.setStorageSync('myAccount', this.myAccount);

					this.getStep();
					setInterval(() => {
					this.getStep();
					}, 60000);
					this.userAccount = hideBankCards(accounts[0]);


					//判断是否需要填激活码		 
					useContract(refStoreAddress, refAbi).then(refContract => {
						this.contract = refContract;
						refContract.referrer(this.myAccount).then(refer => {

							if (refer === '0x0000000000000000000000000000000000000000') {
								this.$refs.isopen.open();
							} else {
								uni.setStorageSync('inviter', refer);
							}

						})

					})

					useContract(RunbitAddress, RunbitAbi).then(async runContract => {
						this.runContract = runContract
						//获取赛道
						getTrackId(this.runContract).then(id => {
							this.trackId = id.toNumber()
							console.log("trackid ", this.trackId)
						})
						console.log("myAccount ", this.myAccount)
						console.log("curDay ", this.curDay)
						getUserState(this.runContract, this.myAccount, this.curDay).then(date => {
							this.steps = parseInt(date.lastSteps);

						})
						console.log(this.curDay);
						getUnharvestReward(this.runContract, this.myAccount, this.curDay).then(
							ForgeFee => {
								this.reward = (ForgeFee / 1000000000000000000).toFixed(2)
								console.log(this.reward);
							})
						//获取装备,0代表没装备
						getBindEquips(this.runContract, this.myAccount).then(async equips => {
							console.log("已经穿了" + equips);
							for (var i = 0; i < equips.length; i++) {
								if (equips[i] != 0) {
									//穿了装备
									this.getEquitCardValue(equips[i].id);
								}

							}
							this.getequipsImg(equips);
							uni.hideLoading();
						})


						//更新步数
						// this.updateStep()
					})

					//加载我的属性卡和装备库
					useContract(equipAddress, equipAbi).then(contract => {


						getMyEquips(this.myAccount, contract).then(myEquips => {
							this.equipContract = contract
							this.myEquips = myEquips;
							console.log("myEquips--------", myEquips)
						})


					});

					useContract(cardAddress, cardAbi).then(contract => {
						this.cardContract = contract
						getMyCards(this.myAccount, contract).then(myCards => {
							this.cardsList = myCards;
							console.log("myCards--------", myCards)

						})
					});


				});
				//this.getMetamskConnect();
				//测试



			} catch (e) {
				console.error(e);
			}

		},
		beforeCreate() {

		},
		methods: {
			openUser() {
				uni.navigateTo({
					url: '../../userAccount/userAccount'
				});
			},

			async unEquip() {
				uni.showLoading({
					title: '装备卸下中...'

				})
				try {
					let tx = await unbindEquip(this.runContract, this.curequipIndex)

					await tx.wait()

				} catch (e) {
					console.error(e)
					//todo 错误提示
				} finally {
					//获取装备,0代表没装备
					getBindEquips(this.runContract, this.myAccount).then(async equips => {
						console.log(equips);
						this.getequipsImg(equips);
					})
					uni.showToast({
						title: "装备卸下成功",
						icon: "success"
					})
				}
			},
			//打开卡片筛选
			addCard(index) {
				this.carIndex = index;
				this.$refs.equipInfo.close()
				this.$refs.choosecardDialog.open() //装备筛选
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
				console.log("当前装备ID:" + this.currentequips.id);
				console.log("卡片ID:" + this.cardId);
				uni.showLoading({
					title: '绑定中...'
				});
				let tx = await bindCard(this.runContract, this.currentequips.id, this.cardId, this.carIndex);
				tx.wait().then(res => {
					this.$refs.choosecardDialog.close()
					this.$refs.equipInfo.open()
					uni.hideLoading();
					this.getEquitCard(this.curequipIndex);
					uni.showToast({
						title: "绑定成功",
						icon: "success"
					})
				})
			},
			//卡片点击事件
			changeCard(item) {
				this.currentCard = item;
				this.cardId = parseInt(item.id);
			},
			// 获取装备图片绑定
			getequipsImg(equips) {
				this.equips = equips

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
			},
			// 装备筛选确认选中绑定装备
			async chooseEquip() {
				var that = this;
				uni.showLoading({
					title: '装备绑定中...'

				})
				try {
					console.log(this.equipId);
					let tx = await bindEquip(this.runContract, this.equipId)
					await tx.wait()
				} catch (e) {
					console.error(e)
					//todo 错误提示
				} finally {
					//获取装备,0代表没装备
					getBindEquips(this.runContract, this.myAccount).then(async equips => {
						console.log(equips);
						this.getequipsImg(equips);
					})
					uni.showToast({
						title: "装备绑定成功",
						icon: "success"
					})

				}
			},
			//获取绑定的卡片
			async getEquitCard(index) {
				console.log("装备id" + this.equipId);
				getBindCards(this.runContract, this.equipId).then(async cards => {
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
					
				})
			},

			//获取绑定的卡片值累加
			async getEquitCardValue(index) {
				uni.showLoading({
					title: '获取数据中...'

				})
				console.log("装备id" + index);
				await getBindCards(this.runContract, index).then(async cards => {
					if (cards[0].img) {
						console.log("装备值" + cards[0].card.specialty);
						this.specialty = this.specialty + parseInt(cards[0].card.specialty);
						this.aesthetic = this.aesthetic + parseInt(cards[0].card.aesthetic);
						this.comfort = this.comfort + parseInt(cards[0].card.comfort);
					}
					if (cards[1].img) {
						this.specialty = this.specialty + parseInt(cards[1].card.specialty);
						this.aesthetic = this.aesthetic + parseInt(cards[1].card.aesthetic);
						this.comfort = this.comfort + parseInt(cards[1].card.comfort);
					}
					if (cards[2].img) {
						this.specialty = this.specialty + parseInt(cards[2].card.specialty);
						this.aesthetic = this.aesthetic + parseInt(cards[2].card.aesthetic);
						this.comfort = this.comfort + parseInt(cards[2].card.comfort);
					}

				})
				uni.hideLoading();
			},
			//装备点击详情
			async chooseEquipDia(index) {
				console.log(index);
				this.curequipIndex = index;

				this.shoeEquips = [];
				this.pantEquips = [];
				this.waistEquips = [];



				for (var i = 0; i < this.myEquips.length; i++) {
					if (this.myEquips[i].equip.equipType == 0) {
						this.shoeEquips.push(this.myEquips[i]);
					}
					if (this.myEquips[i].equip.equipType == 1) {
						this.pantEquips.push(this.myEquips[i]);
					}
					if (this.myEquips[i].equip.equipType == 2) {
						this.waistEquips.push(this.myEquips[i]);
					}
				}

				if (index == 0) {
					this.EquipsList = this.shoeEquips;
				} else if (index == 1) {
					this.EquipsList = this.pantEquips;
				} else {
					this.EquipsList = this.waistEquips;
				}

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
					console.log("装备ID:" + this.equipId);
					this.getEquitCard(index);
					this.$refs.equipInfo.open()
					//打开装备详情
				}


			},


			async approve() {

			},
			// 赛道弹框
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			//赛道确认
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
					uni.showToast({
						title: "更换成功",
						icon: "success"
					})
				}
			},
			// 激活码激活
			async dialogInputConfirm2(val) {
				console.log(val)
				var isAddress = ethers.utils.isAddress(val);
				try {
					if (!isAddress) {
						uni.showToast({
							title: "激活码错误",
							icon: "error"
						})

						return
					}
					let tx = await this.contract.addReferrerWithCheck(val)
					console.log(tx.hash)
					uni.showLoading({
						title: '请稍等...'
					})
					tx.wait().then(res => {
						uni.hideLoading()
						this.$refs.isopen.close();
						uni.showToast({
							title: "激活成功",
							icon: "success"
						})
					})
				} catch (e) {
					console.error(e)
				}

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
			//选中赛道
			chooseTrack(id) {
				//更新选中的赛道
				if (id == 0)
					this.stack = "烈日沙滩"
				if (id == 1)
					this.stack = "芳草地"
				if (id == 2)
					this.stack = "石子路"
				this.setTrackId = id
				//todo 选中的赛道更新样式
			},
			//确认更新赛道
			setTrack() {
				try {
					this.runContract.updateTrack(id).then(tx => {
						//更新成功
						this.trackId = id
					})
				} catch (e) {
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
								uni.setStorageSync('Steps', res.data.data.steps);
								getApp().globalData.userStep = this.getSteps;
								this.check_sum = res.data.data.check_sum
							}
						}
					})
				})
			},
			//更新到合约中
			async updateStep() {
				uni.showLoading({
					title: '同步中...'
				})
				//从接口获取最新步数

				if (this.getSteps === this.steps) {
					uni.showToast({
						title: "步数无需更新",
						icon: "none"
					})
					//todo 提示无需更新
					return
				}
				try {
					this.runContract.updateSteps(this.check_sum).then(res => {
						this.steps = this.getSteps
					})
				} catch (e) {
					//todo 出错
				} finally {
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
		width: 158.88rpx;
		height: 34.72rpx;
		text-align: center;
	}

	.smicon {
		width: 15.88rpx;
		height: 23.88rpx;
	}

	.rareValue {
		color: #000000;
		width: 95.55rpx;
		height: 34.72rpx;
		text-align: center;
		margin-left: 7rem;
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

	.user_person {
		position: absolute;
		height: 80%;
	}

	.user_person_item {
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
		margin-left: 7.5rem;
	}

	.idvalue2 {
		margin-left: 6rem;
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
