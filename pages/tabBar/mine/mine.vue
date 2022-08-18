<template>
	<view class="content">
		<view class="bg">

			<view class="uni-flex uni-row" style="margin: 1.425rem; height: 89.44rpx; ">
				<img class="flex-itemLogo"  @tap="openUser" src="../../../static/heard.png" style="width:3.125rem;" />
				<img class="currentImg" src="../../../static/Ellipse38.png" />
				<view class="currentbs">在線3000步</view>
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
							<!-- <view @click="actionSheetTap" class="fillter">Fillter(0)</view> -->
							<image @click="synthetic" class="filltericon2" src="../../../static/Group11599.png">
							</image>

						</view>
						<oct-goods :lists="goodsArr" price-type="$" @onGoods="onGoods" />
					</view>
					<view v-if="curNow === 1">
						<view class="uni-flex uni-row"
							style="display: flex; margin:1rem 0px; height: 85.55rpx; width: 100%; ">
							<view style="width: 50%; margin: auto 0; ">
								<uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select>
							</view>
							<view @click="actionSheetTap" class="fillter">篩選</view>
							<image @click="actionSheetTap" class="filltericon" src="../../../static/Frame3.png"></image>

						</view>
						<oct-goods :lists="goodsArr" price-type="$" @onGoods="onGoods2" />

					</view>
				</view>
			</view>
		</view>
		<!-- 装备合成 -->
		<view>
			<uni-popup ref="inputDialog" type="dialog">


				<uni-popup-dialog ref="inputClose" :mask-click="true" cancelText="取消" confirmText="合成" title="裝備合成"
					value="對話方塊預置提示內容!" placeholder="請輸入內容" @confirm="dialogInputConfirm">
					<view>
						<view class="uni-flex uni-row">
							<image class="dialogimg" @tap="changeShop(1)" :src="curImg1"></image>
							<image class="dialogimg" @tap="changeShop(2)" :src="curImg2"></image>
						</view>
						<uni-card title="" extra="" style="width: 90%; border:1px solid black; border-radius: 0.825rem; background-color:#F4F5F6 ; margin: 2rem auto;">


							<view class="curId uni-flex uni-row">
								<view class="flex-item">舊裝備等級</view>
								<view class="flex-item" style="margin-left: 2.5rem;">合成後等級</view>
							</view>

							<view class="curId uni-flex uni-row">
								<view class="flex-item">LV1 & LV2</view>
								<view class="flex-item" style="margin-left: 2.5rem; color: #FC823D;">LV3</view>
							</view>








						</uni-card>
						<view class="curId2 uni-flex uni-row">
							<view class="flex-item3">合成費用共計</view>
							<view class="flex-item4">3212 OPC</view>
						</view>



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


				<uni-popup-dialog ref="inputClose" :mask-click="true" cancelText="卸下" confirmText="轉讓" title="屬性卡信息"
					value="對話框預置提示內容!" placeholder="請輸入內容" @confirm="dialogInputConfirm4">
					<view>

						<img class="cards" src="../../../static/Group120021.png" />

						<uni-card title="" extra="" style="width: 90%; border:1px solid black; border-radius: 0.825rem; background-color:#F4F5F6 ; margin: 1rem auto;">
						
						
									<view class="curId uni-flex uni-row">
										<view class="flex-item ">耐久</view>
										<view class="flex-item idvalue2">累計收益</view>
									</view>
						
						
						<view class="curId uni-flex uni-row">
							<view class="flex-item flex-itemValue">90/100</view>
							<view class="flex-item flex-itemValue idvalue2">2400</view>
						</view>
						
						</uni-card>
						<view class="uni-flex uni-row" style="width: 60%; text-align: center; margin: 10px auto;">
							<view class="id4">已安裝於裝備#001</view>
							
						</view>

					</view>
				</uni-popup-dialog>

			</uni-popup>

		</view>
		
		<!-- 装备信息 -->
		<view>
			<uni-popup ref="inputDialog5" type="dialog">
				<uni-popup-dialog ref="inputClose" :mask-click="true" cancelText="卸下" confirmText="确认" title="裝備信息"
					value="對話框預置提示內容!" placeholder="請輸入內容" @confirm="dialogInputConfirm">
					<view>
		
						<img class="cards2" src="../../../static/Group12104.png" />
						
						<view class="uni-flex uni-row">
							<img class="addcards" src="../../../static/Group12032.png" />
							<img class="addcards" src="../../../static/Group120021.png" />
							<img class="addcards" src="../../../static/Group120021.png" />
						</view>
		
						<uni-card title="" extra="" style="width: 90%; border:1px solid black; border-radius: 0.825rem; background-color:#F4F5F6 ; margin: 0.6rem auto;">
						
						
									<view class="curId uni-flex uni-row">
										<view class="level ">級别</view>
										<view class="rare">稀有度</view>
									</view>
						
						
						<view class="curId uni-flex uni-row">
							<image class="smicon " src="../../../static/Group11589.png"></image>
							<view class="rareValue">2400</view>
						</view>
						
						<view class="curId uni-flex uni-row" style="margin-top: 0.8rem;">
							<view class="level ">卡片槽</view>
							<view class="rare">可升級</view>
						</view>
						
						<view class="curId uni-flex uni-row">
							<view class="level flex-itemValue">90/100</view>
							<view class="flex-item flex-itemValue idvalue2">是</view>
						</view>
						
						</uni-card>
						<view class="uni-flex uni-row" style="width: 60%; text-align: center; margin: 5px auto;">
							<view class="id4">已裝備</view>
							
						</view>
						
		
					</view>
				</uni-popup-dialog>
		
			</uni-popup>
		
		</view>
		<!-- 转让 -->
		<view>
			<uni-popup ref="inputDialog6" type="dialog">
		
		
				<uni-popup-dialog ref="inputClose" mode="input" :mask-click="true" cancelText="取消" confirmText="轉讓"
					title="轉讓" value="請校驗正確的轉讓地址!" placeholder="請輸入地址" @confirm="dialogInputConfirm2">
					
				</uni-popup-dialog>
						
					
						
		
			</uni-popup>
		
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				buttonRect: {},
				curImg2:"../../../static/Group12032.png",
				curImg1:"../../../static/Group12032.png",
				value: "請選擇",
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
				},
				{
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
			}
		},
		methods: {
			
			synthetic()
			{
				this.$refs.inputDialog.open()
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
			onGoods() {
				this.$refs.inputDialog5.open()
			},
			// 卡片购买
			onGoods2() {
				this.$refs.inputDialog3.open()
			},
			sectionChange(index) {
				this.curNow = index;

			},
			changeShop(item)
			{
				this.$refs.inputDialog4.open()
			},
			openUser()
			{
				uni.navigateTo({
					url: '../../userAccount/userAccount'
				});
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
			// 转让
			dialogInputConfirm4()
			{
			this.$refs.inputDialog3.close();
			this.$refs.inputDialog6.open();
			},
			change() {

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
	.id4{
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
		margin-left: 0.425rem;
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
		margin-left: 176.94rpx;
	}

	.filltericon {

		width: 50.83rpx;
		height: 45.83rpx;
		margin: auto 0;
		padding-top: 18.94rpx;

	}

	.filltericon2 {

		width: 140.83rpx;
		height: 55.83rpx;
		text-align: right;
		margin-left: 186.94rpx;
		padding-top: 18.94rpx;

	}

	.dialogimg {
		display: block;
		margin: 0 auto;
		width: 40%;
		height: 208.88rpx;
		margin-left: 5%;
		padding: 6.94rpx;
		border-radius: 10%;
		border:1px solid black;

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

	.idvalue3 {
		width: 75%;
		text-align: right;
		float: right;
	}

	.smicon {
		margin-left: 0.625rem;
		width: 43.88rpx;
		height: 23.88rpx;
	}

	.flex-item {
		color: #969696;
		width: 185.55rpx;
		height: 34.72rpx;
		text-align: center;
	}
	.level{
		color: #969696;
		width: 95.55rpx;
		height: 34.72rpx;
		text-align: center;
	}
	.rare{
		color: #969696;
		width: 95.55rpx;
		height: 34.72rpx;
		text-align: center;
		margin-left: 7rem;
	}
	.rareValue{
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
