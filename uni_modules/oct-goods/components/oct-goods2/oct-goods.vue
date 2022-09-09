<template>
	<view>
		<view class="goods--box">
			<view class="goods--item" v-for="(item, index) in lists" :key="index" @click="$emit('onGoods', item)">
				<image   :src="item.cover"  />
				<!-- <view class="item--content">
					<view class="title">{{item.name}}</view>
					<view class="price"><text>{{priceType}}</text>{{item.price.price_min || '0'}}</view>
				</view> -->
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		props:{
			lists: {
				type	: Array,
				required: true,
				default : () => {
					return []
				}
			},
			priceType: {
				type	: String,
				required: false,
				default : "￥"
			}
		},
		mounted() {
		}
	}
</script>
<style lang="scss" scoped>
	$padding: 30rpx;
	$margin: 10rpx;
	$radius: 20rpx;
	
	.ellipsis-1 {
	    max-width: 100%;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	}
	
	.ellipsis-2{
		max-width: 100%;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
	.goods--box{
		display: flex;
		flex-wrap: wrap;
		padding: $padding/3;
		.goods--item{
			background: white;
			width: calc(50% - #{$margin*2});
			background: white;
			border-radius: $radius;
			overflow: hidden;
			margin: $margin;
			.item--cover{
				width: 100%;
				padding-top: 100%;
				background-position: center;
				background-size: cover;
			}
			.item--content{
				padding: $padding - 10;
				& > .title{
					font-size: 28rpx;
					line-height: 40rpx;
					height: 80rpx;
					color: #333;
					@extend .ellipsis-2;
				}
				& > .price{
					padding-top: $padding/2;
					line-height: 40rpx;
					font-weight: bold;
					color: #d4282d;
					font-size: 28rpx;
					@extend .ellipsis-1;
					text{
						margin-right: $margin/2;
						font-size: 80%;
					}
				}
			}
		}
	}
</style>
