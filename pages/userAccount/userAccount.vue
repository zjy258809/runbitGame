<template>
	<view class="content">
		<view class="top">
			<view class="uni-flex uni-row head">
				<img class="logo1" @tap="back" src="../../static/Group115822.png" />
				<view class="logoTx">賬戶</view>
				<img @tap="setting"  class="logo2" src="../../static/Group12016.png" />
			</view>

			<view style="margin-top: 180rpx; height:69.44rpx ; width: 90%; margin-left: 5%; ">
				<u-subsection activeColor="#FFEB34" font-size="15" :list="list" mode="subsection" :current="curNow"
					@change="sectionChange"></u-subsection>
				<view>
					<view v-if="curNow === 0">
						<uni-card title="" extra=""
							style="width: 90%; border:2px solid black; border-radius: 0.825rem; background-color:#FFF ; margin: 2rem auto;">


							<view @tap="openRb" class="curId uni-flex uni-row">
								<image class="smicon " src="../../static/Group120121.png"></image>
								<view class="level ">RB</view>
								<view class="rare">20000</view>
							</view>
							<view
								style="width: 100%;height: 0.0625rem;background-color: #000000; margin-top: 0.5rem; margin-bottom: 1rem;">
							</view>

							<view class="curId uni-flex uni-row">
								<image class="smicon " src="../../static/Group120122.png"></image>
								<view class="level">属性卡碎片</view>
								<view class="rare">20</view>
							</view>
							<view
								style="width: 100%;height: 0.0625rem;background-color: #000000; margin-top: 0.5rem; margin-bottom: 1rem;">
							</view>

							<view class="curId uni-flex uni-row">
								<image class="smicon " src="../../static/Group120671.png"></image>
								<view class="level ">裝備碎片</view>
								<view class="rare">20</view>
							</view>


						</uni-card>

						<view class="uni-flex uni-row" style="margin-bottom: 1rem;">
							<view @tap="recordList(0)" :class="curList==0?'recordList':'recordList2' ">未完成</view>
							<view @tap="recordList(1)" :class="curList==1?'recordList':'recordList2' ">歷史記錄</view>
						</view>
						<view v-if="curList==0">
							<view style="" class="text" v-for="(item,index) in data" :key="index">
								<uni-card title="" extra=""
									style="width: 90%; border-radius: 0.825rem; background-color:#FFF ; margin: 0.35rem auto;">


									<view class="curId uni-flex uni-row">
										<view class="level2">{{item.lable}}</view>
										<view class="level3">{{item.num}}</view>
										<view class="level4">{{item.time}}</view>
									</view>




								</uni-card>
							</view>
								<img class="nocard" v-show="data.length==0" src="../../static/Group12015.png" />
						</view>
						<view v-if="curList==1">
							<view style="" v-show="data2.length>0" class="text" v-for="(item,index) in data2" :key="index">
								<uni-card title="" extra=""
									style="width: 90%; border-radius: 0.825rem; background-color:#FFF ; margin: 0.35rem auto;">


									<view class="curId uni-flex uni-row">
										<view class="level2">{{item.lable}}</view>
										<view class="level3">{{item.num}}</view>
										<view class="level4">{{item.time}}</view>
									</view>




								</uni-card>
							</view>
							<img class="nocard" v-show="data2.length==0" src="../../static/Group12015.png" />
						</view>
						
						

					</view>
					<view v-if="curNow === 1">
<uni-card title="" extra=""
							style="width: 90%; border:2px solid black; border-radius: 0.825rem; background-color:#FFF ; margin: 2rem auto;">


							<view class="curId uni-flex uni-row">
								<view class="level ">未領取收益</view>
								<view class="rare" style="color: #FF5C00;">20000 RB</view>
							</view>
							<view
								style="width: 100%;height: 0.0625rem;background-color: #000000; margin-top: 0.5rem; margin-bottom: 1rem;">
							</view>

							<view class="curId uni-flex uni-row">
								<view class="level ">已領取收益</view>
								<view class="rare">20 RB</view>
							</view>
							<view
								style="width: 100%;height: 0.0625rem;background-color: #000000; margin-top: 0.5rem; margin-bottom: 1rem;">
							</view>

						


						</uni-card>
						<img class="gp5" @tap="inputDialogToggle()" src="../../static/Group11571.png" />

							<view @tap="recordList(0)" class="recordList">獲獎記錄</view>
							<view style="" class="text" v-for="(item,index) in data" :key="index">
								<uni-card title="" extra=""
									style="width: 90%; border-radius: 0.825rem; background-color:#FFF ; margin: 0.35rem auto;">


									<view class="curId uni-flex uni-row">
										<view class="level4">{{item.time}}</view>
										<view class="level3">{{item.num}}</view>
										<img class="leLogo" :src="index%2==0?'../../static/Group15-1.png':'../../static/Group15.png'" />
									</view>




								</uni-card>
							</view>

					</view>
					<view v-if="curNow === 2">
<uni-card title="" extra=""
							style="width: 90%; border:2px solid black; border-radius: 0.825rem; background-color:#FFF ; margin: 2rem auto;">


							<view @tap="openRb" class="curId uni-flex uni-row">
								<image class="smicon " src="../../static/Group120121.png"></image>
								<view class="level ">RB</view>
								<view class="rare">20000</view>
							</view>
							<view
								style="width: 100%;height: 0.0625rem;background-color: #000000; margin-top: 0.5rem; margin-bottom: 1rem;">
							</view>

							<view class="curId uni-flex uni-row">
								<image class="smicon " src="../../static/Group120122.png"></image>
								<view class="level ">属性卡碎片</view>
								<view class="rare">20</view>
							</view>
							<view
								style="width: 100%;height: 0.0625rem;background-color: #000000; margin-top: 0.5rem; margin-bottom: 1rem;">
							</view>

							<view class="curId uni-flex uni-row">
								<image class="smicon " src="../../static/Group120671.png"></image>
								<view class="level ">裝備碎片</view>
								<view class="rare">20</view>
							</view>


						</uni-card>
						
						<view @tap="recordList(0)" class="recordList">獲獎記錄</view>
						<view style="" class="text" v-for="(item,index) in data" @tap="winClick" :key="index">
							<uni-card title="" extra=""
								style="width: 90%; border-radius: 0.825rem; background-color:#FFF ; margin: 0.35rem auto;">
						
						
								<view class="curId uni-flex uni-row">
									<view class="level4">{{item.time}}</view>
									
									<img class="leLogo2" :src="index%2==0?'../../static/Group15-1.png':'../../static/Group15.png'" />
								</view>
								
								<view class="uni-flex uni-row">
									<view class="level4 uni-flex uni-row">
											<image class="smicon " src="../../static/Group120121.png"></image>
											<view style="margin-left: 0.325rem;">3000</view>
									</view>
									<view class="level3-2 uni-flex uni-row">
											<image class="smicon " src="../../static/Group120122.png"></image>
											<view style="margin-left: 0.325rem;">3000</view>
									</view>
									
									<view class="level4 uni-flex uni-row">
											<image class="smicon " src="../../static/Group120671.png"></image>
											<view style="margin-left: 0.325rem;">3000</view>
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
					title="通知" value="对话框预置提示内容!" placeholder="請輸入內容" @confirm="dialogInputConfirm2">
					<view>
		
		
						<view  style="width: 100%; margin: 10px auto;">
							<view class="id4">恭喜中獎！本次獲得</view>
							<view class="uni-flex uni-row">
									<view class="win1 ">
										<image class="smicon win1Logo" src="../../static/Group120121.png"></image>
										<view style="margin-left: 0.325rem;">3000</view>
									</view>
									<view class="win1 ">
										<image class="smicon win1Logo" src="../../static/Group120122.png"></image>
										<view style="margin-left: 0.325rem;">3000</view>
									</view>
									<view class="win1 ">
										<image class="smicon win1Logo" src="../../static/Group120671.png"></image>
										<view style="margin-left: 0.325rem;">3000</view>
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
	export default {
		data() {
			return {
				curList: 0,
				curNow: 0,
				data: [{
						lable: '0x14..SD12',
						num: '1000 RB',
						time: '2022-08-17'
					},
					{
						lable: '0x14..SD14',
						num: '2000 RB',
						time: '2022-08-17'
					},
					{
						lable: '0x14..7D14',
						num: '1000 RB',
						time: '2022-08-17'
					},
					{
						lable: '0x14..SD24',
						num: '5000 RB',
						time: '2022-08-17'
					},
				],

				data2: [{
						lable: '0x14..SD12',
						num: '1000 RB',
						time: '2022-08-17'
					},
					{
						lable: '0x14..SD14',
						num: '2000 RB',
						time: '2022-08-17'
					},
					{
						lable: '0x14..7D14',
						num: '1000 RB',
						time: '2022-08-17'
					},

				],

				list: ['錢包', '收益', '抽獎'],
			}
		},
		methods: {
			sectionChange(index) {
				this.curNow = index;

			},
			recordList(index) {
				this.curList = index;
			},
			back()
			{
				uni.navigateBack({
					delta: 1
				});
			},
			openRb()
			{
				uni.navigateTo({
					url: '../userRb/userRb'
				});
			},
			setting()
			{
				uni.navigateTo({
					url: '../userSetting/userSetting'
				});
			},
			winClick()
			{
				this.$refs.inputDialog2.open()
			}
		}
	}
</script>

<style>
	
	.id4{
		margin-top: 0.625rem;
		width: 100%;
		text-align: center;
		color: #000000;
		font-size: 0.9375rem;
		font-weight: bold;
	}
	.win1Logo{
		margin-top: 0.9375rem;
	}
	.win1{
		margin: 0.625rem;
		text-align: center;
		background-color: #F4F5F6;
		height: 4.5rem;
		width: 4.5rem;
		border-radius: 1rem;
	}
	.nocard{
		display: inline-block;
		margin: 0 auto;
		margin-top: 6rem;
		width: 35%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.leLogo{
		width: 3.125rem;
	}
	.leLogo2{
		width: 3.125rem;
		position: absolute;
		right: 1.25rem;
	}
	.head {
		width: 100%;
		height: 5.25rem;
		position: absolute;
	}
	.gp5{
		display: inline-block;
		margin: 1.25rem auto;
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
		width: 180.55rpx;
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
		width: 180.55rpx;
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
