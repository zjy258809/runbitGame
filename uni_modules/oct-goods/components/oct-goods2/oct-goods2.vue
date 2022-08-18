<template>
	<view>
		<view class="goods--box">
			<view class="goods--item" v-for="(item, index) in lists"  :key="index" @click="onGoods(item,index)">
				<image  :class="currentIndex== index?'active':'active2'"   :src="item.cover"  />
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
		data() {
			return {
				currentIndex:0,
			}
		},
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
		},
		methods:
		{
		onGoods(item,index)
		{
			this.currentIndex =index
			this.$emit('onGoods', item)
			
		},
		
		
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
	.active {
		border: 1px solid red !important;
		border-radius: 20.83rpx;
	}
	.active2 {
		border: 1px solid black !important;
		border-radius: 20.83rpx;
	}
	
	.ellipsis-2{
		max-width: 50%;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		
		
	}
	image{
		width: 182.88rpx;
		height: 182rpx;
	}
	.goods--box{
		display: flex;
		flex-wrap: wrap;
		width: 95%;
		margin-left: 10%;
		.goods--item{
			width: 40%;
			height: 190.44rpx;
			
			
			border-radius: $radius;
			overflow: hidden;
			margin: 5.88rpx;
			
			
			
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
