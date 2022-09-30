<template>
	<view>
		<view class="goods--box">
			<view class="goods--item" v-for="(item, index) in lists" :key="index" @click="$emit('onGoods', index)">
				<view class="imgtop uni-flex uni-row">
					<view class="flex-item">
						<image class="smicon " src="https://gapi.runbit.lol/images/star.png"></image>
						<image v-if="item.equip.level>=2" class="smicon " src="https://gapi.runbit.lol/images/star.png">
						</image>
						<image v-if="item.equip.level>=3" class="smicon " src="https://gapi.runbit.lol/images/star.png">
						</image>
						<image v-if="item.equip.level>=4" class="smicon " src="https://gapi.runbit.lol/images/star.png">
						</image>
						<image v-if="item.equip.level>=5" class="smicon " src="https://gapi.runbit.lol/images/star.png">
						</image>
					</view>
					<view class="smtxt" v-if="item.equip.equip_type==0">鞋子</view>
					<view class="smtxt" v-if="item.equip.equip_type==1">裤子</view>
					<view class="smtxt" v-if="item.equip.equip_type==2">衣服</view>
				</view>

				<image class="logo" :src="item.cover" />
				<view class="itemDesc">{{item.equip.sales}}mint</view>
				<view class="progress-box">
					<progress :percent="item.balance" activeColor="#10AEFF" stroke-width="8" />
				</view>
				<view class="uni-flex uni-row itemdesc-box">
					<image class="itemprice1" src="https://gapi.runbit.lol/images/runbit.png" />
					<view class="itemdesc-boxtxt">{{item.equip.price1}}</view>
					<image class="itemprice1" src="https://gapi.runbit.lol/images/chip.png" />
					<view class="itemdesc-boxtxt">{{item.equip.price0}}</view>
				</view>
				<!-- <view class="item--content">
					<view class="title">{{item.name}}</view>
					<view class="price"><text>{{priceType}}</text>{{item.price.price_min || '0'}}</view>
				</view> -->
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			lists: {
				type: Array,
				required: true,
				default: () => {
					return []
				}
			},
			priceType: {
				type: String,
				required: false,
				default: "￥"
			}
		},
		mounted() {
			console.log(this.lists);
		}
	}
</script>
<style lang="scss" scoped>
	$padding: 30rpx;
	$margin: 10rpx;
	$radius: 30rpx;

	.smtxt {
		margin: 3%;
		font-size: 20.88rpx;
	}

	.flex-item {
		margin-top: 3%;
		text-align: right;
		
	}

	.smicon {
		width: 15.88rpx;
		height: 23.88rpx;
	}

	.itemdesc-boxtxt {
		padding-left: 5.94rpx;
		width: 100.44rpx;
		font-size: 24rpx;
		margin: auto 0;
	}

	.itemdesc-box {
		margin-top: 5rpx;
		padding-left: 40upx;
		padding-right: 40upx;
		display: flex;
		height: 60rpx;
		background-color: #FFFCDC;
	}

	.itemprice1 {
		margin-top: 10rpx;
		width: 40rpx;
		height: 40rpx;
		margin-left: 16.94rpx;
	}

	.itemDesc {
		color: #989898;
		font-size: 14upx;
		text-align: center;
	}

	.imgtop {

		margin: auto auto;
		width: 120px;
		height: 26px;

		font-weight: bold;
		text-align: center;
		font-size: 10rpx;
		background: #F4F5F6;
		border-radius: 0px 0px 15px 15px;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.progress-box {
		border-radius: 10upx;
		margin-left: 40upx;
		margin-right: 40upx;
		display: flex;
		height: 50rpx;

	}

	.ellipsis-1 {
		max-width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.ellipsis-2 {
		max-width: 100%;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.logo {
		width: 60%;
		height: 188.88rpx;
		text-align: true;
		display: inline-block;
		margin: 0.5rem auto;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

	}

	.goods--box {

		padding-bottom: 120.83rpx;

		display: flex;
		flex-wrap: wrap;

		.goods--item {

			background: white;
			width: calc(50% - #{$margin*2});
			background: white;
			border-radius: $radius;
			overflow: hidden;
			margin: $margin;

			.item--cover {
				width: 100%;
				padding-top: 100%;
				background-position: center;
				background-size: cover;
			}

			.item--content {
				padding: $padding - 10;

				&>.title {
					font-size: 28rpx;
					line-height: 40rpx;
					height: 80rpx;
					color: #333;
					@extend .ellipsis-2;
				}

				&>.price {
					padding-top: $padding/2;
					line-height: 40rpx;
					font-weight: bold;
					color: #d4282d;
					font-size: 28rpx;
					@extend .ellipsis-1;

					text {
						margin-right: $margin/2;
						font-size: 80%;
					}
				}
			}
		}
	}
</style>
