<template>
	<view class="content">
	<view class="top">
		<image class="heads" src="../../static/2111.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.top {
		position: absolute;
		width: 100%;
		height: 27.375rem;
		left: 0px;
		top: 0px;
	
		background: linear-gradient(180deg, #FFF7B0 0%, rgba(255, 247, 176, 0) 100%);
		border-radius: 0px 0px 36px 36px;
	}
	
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	
	}
	
	.heads {
			width: 80%;
			margin: 0 auto;
			display: inline-block;
			margin: 1.25rem auto;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
	}
</style>
