<template>
	<view>
		<view class="top">
			<view class="uni-flex uni-row head">
				<img class="logo1" @tap="back" src="../../static/Group115822.png" />
				<view class="logoTx">邀請碼</view>
			</view>
			
			<uni-card title="" extra=""
				style="width: 90%; text-align: center; border-radius: 0.825rem; background-color:#FFF ; margin: 0 auto; margin-top: 5rem; margin-bottom: 2rem;">
			
			
				<view class="curId ">
					<view style="margin: 0.5rem;">我的邀请码</view>
					<view class="logoTx">1231231..58456411</view>
					<img class="fontImg" src="../../static/Grou152.png" />
				</view>
			
			
			</uni-card>
			

				<view  class="recordList">邀請記錄</view>

			<view v-if="curList==0">
				<view style="" class="text" v-for="(item,index) in data" :key="index">
					<uni-card title="" extra=""
						style="width: 90%; border-radius: 0.825rem; background-color:#FFF ; margin: 0.35rem auto;">


						<view class="curId uni-flex uni-row">
							<view class="level2">{{item.lable}}</view>
							<view class="level4">{{item.time}}</view>
						</view>




					</uni-card>
				</view>
			</view>
			


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				data2: [],
				curList: 0,
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			recordList(index) {
				this.curList = index;
			},
		}
	}
</script>

<style>
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

	.fontImg {
		width: 40%;
		display: inline-block;
		margin: 15 auto;
		margin-top: 1rem;
	}

	.fontz {
		margin-top: 0.625rem;
		color: #000000;
	}

	.accept {
		width: 33%;
		text-align: center;
	}

	.head {
		width: 100%;
		height: 5.25rem;
		position: absolute;
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

	.gp5 {
		display: inline-block;
		margin: 0 auto;
		margin-top: 6rem;
		width: 15%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.gp5-txt {
		margin-bottom: 2.0625rem;
		margin-top: 0.5rem;
		font-size: 1.5rem;
		text-align: center;
		color: #000000;
		font-weight: bold;
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
		width: 160.55rpx;
		height: 50.72rpx;
		font-size: 0.875rem;
		line-height: 50rpx;
		position: absolute;
		right: 1.25rem;



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
	}
	
	.logoTx {
		font-size: 1rem;
		color: #000000;
		font-weight: bold;
		font-size: 1.0625rem;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;


	}
</style>
