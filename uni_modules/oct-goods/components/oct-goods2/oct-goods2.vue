<template>
	<view>
		<view class="goods--box">
			<view class="goods--item" v-for="(item, index) in lists"  :key="index" @click="onGoods(item,index)">
				<image  :class="currentIndex== index?'active':'active2'"   :src="item.img"  />
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
				currentIndex:-1,
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
		border-radius: 34.83rpx;
		width: 220.44rpx;
		height: 220.44rpx;
		margin-left: 3.94rpx;
	}
	.active2 {
		border: 1px solid black !important;
		border-radius: 34.83rpx;
		width: 220.44rpx;
		height: 220.44rpx;
		margin-left: 3.94rpx;
	}
	
	.goods--box{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		.goods--item{
			width: 40%;
			height: 220.44rpx;
			border-radius: $radius;
			margin: 5.88rpx;
			padding-left: 5%;
		}
	}
</style>
