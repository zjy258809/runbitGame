<template>
	<view class="content">
		<view class="top">
			<view class="uni-flex uni-row head">
				<img class="logo1" @tap="back" src="../../static/Group115822.png" />
			</view>
			<view class="uni-flex uni-row userHead">
				<img class="logo2" src="../../static/heard.png" />
				<view class="uni-flex uni-column">
					<view class="userName">runbiter</view>
					<view class="useremail">runbiter@email.com</view>
				</view>
			</view>

			<view class="uni-flex uni-row linheigh" @tap="openInivter">
				<view class="lin1">推薦人</view>
				<view class="lin2">{{inviter}}</view>
				<img class="backIcon" src="../../static/Group11596.png" />
			</view>



			<view class="uni-flex uni-row linheigh" style="margin-top: 0.625rem;">
				<view class="lin1">总距离</view>
				<view class="lin2">{{distance}}km</view>
				<!-- <img class="backIcon" src="../../static/Group11596.png" /> -->
			</view>

			<view class="uni-flex uni-row linheigh" style="margin-top: 0.625rem;">
				<view class="lin1">级别</view>
				
			<view class="lin2">LV{{level}}</view>
			<!-- <img class="backIcon" src="../../static/Group11596.png" /> -->
			</view>

			<view class="uni-flex uni-row linheigh" style="margin-top: 0.625rem;">
				<view class="lin1">區塊鏈</view>
				<view class="lin2">polygon</view>
				<!-- <img class="backIcon" src="../../static/Group11596.png" /> -->
			</view>
			<view class="uni-flex uni-row linheigh" style="margin-top: 0.625rem;">
				<view class="lin1">版本號</view>
				<view class="lin2">1.0</view>
			</view>
			<view class="uni-flex uni-row linheigh" @click="openHelp" style="margin-top: 0.625rem;">
				
				<view class="lin1">帮助</view>
				<view class="lin2"></view>
				<img class="backIcon" src="../../static/Group11596.png" />
			</view>


		</view>
	</view>
</template>

<script>
	import {
		hideBankCards
	} from '../../contract/useContract.js'
	export default {
		data() {
			return {
				inviter: 0,
				distance:0,
				level:0,
			}
		},
		onLoad() {
			this.getLevel();
			var values =uni.getStorageSync('inviter');
			var setp =uni.getStorageSync('Steps');
			
			if(values)
				this.inviter=hideBankCards(values);
				if(setp)
				this.distance=this.getFix2(setp*0.7/1000);
			
			
		},
		methods: {
			openHelp()
			{
				uni.navigateTo({
					url: '../userHelp/userHelp'
				});
			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			openInivter() {
				uni.navigateTo({
					url: '../invite/invite'
				});
			},
			getFix2(num) {
				var value = Math.floor(num * 100) / 100
				return value
			},
			//获取最新等级
			getLevel() {
				//从接口获取最新步数
					//todo 设置baseurl
				
					var addr =getApp().globalData.userAccount;
					this.baseurl = 'https://gapi.runbit.lol/api/v1/'
					uni.request({
						url: this.baseurl + 'game/getClassLevel',
						data: {
							addr: addr
						},
						method: "GET",
						success: res => {
							if (res.data.code === 0) {
								this.level =res.data.data;
								console.log(res.data.data);
							}
						}
					})
			},
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

	.lin1 {
		height: 3.25rem;
		line-height: 3.2rem;
		margin-left: 1.625rem;
		color: #8B8B8B;
	}

	.lin2 {
		height: 3.25rem;
		line-height: 3.2rem;
		margin-left: 1.625rem;
		position: absolute;
		right: 2.5rem;
		font-weight: bold;

	}

	.linheigh {
		margin-top: 2.25rem;
		height: 3.25rem;
	}

	.backIcon {
		width: 0.5rem;
		height: 0.8rem;
		position: absolute;
		right: 1.625rem;
		margin-top: 38.94rpx;
		
		
	}
	.star {
		margin-left: 6.94rpx;
		width: 1rem;
		height: 1rem;
		margin-top: 1.3rem;
	}

	.userName {
		margin-left: 0.625rem;
		text-align: left;
		margin-top: 0.625rem;
		font-size: 1.125rem;
		size: 1.125rem;
		font-weight: bold;

	}

	.useremail {
		margin-left: 0.625rem;
		color: #8B8B8B;
	}

	.userHead {
		text-align: center;
		margin-top: 5.25rem;
		height: 4rem;
		width: 100%;
	}

	.head {
		width: 100%;
		height: 5.25rem;
		position: absolute;
	}

	.top {
		position: absolute;
		width: 100%;
		height: 27.375rem;
		left: 0px;
		top: 0px;

		background: linear-gradient(180deg, #F3F3F3 0%, rgba(255, 177, 20, 0.0) 100%);
		border-radius: 0px 0px 36px 36px;
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
		width: 4rem;
		height: 4rem;
		margin-left: 1.625rem;
		top: 20%;
	}
</style>
