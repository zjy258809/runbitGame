<template>
	<view class="content">
		<view class="top">
			<scroll-view>
				<img class="logo1" @tap="back" src="../../static/Group115822.png" />
				<image class="heads" src="../../static/2111.png"></image>

				<view style="width: 100%; text-align: center; font-size: 54.72rpx;font-weight: bold;">游戏说明</view>
				<view class="title">游戏规则</view>
				<view class="desc">玩家通过购买运动装备来解锁卡槽，通过购买属性卡来获得属性，在完成跑步任务后即可获得游戏奖励。</view>
				<view class="title">游戏装备</view>
				<view class="desc">
					目前有三种游戏装备，分别是：鞋子、裤子、上衣。每件装备有3个属性卡槽，每个属性卡槽可以添加一张属性卡。每种装备共有5个级别，低级别装备不能安装高级别的属性卡。相同级别的装备可以合成为更高级别的装备，合成需要花费一定的游戏代币。
				</view>

				<view class="title">属性卡</view>
				<view class="desc">每张属性卡都有4种属性，分别是：耐久性、功能性、美观性、舒适性。每使用1天消耗100耐久性值；一个功能性值一天可以获得0.0001
					RB；一个美观性值一天可获得0.00008 RB，有一定概率获得装备掉落；1个舒适性一天可获得0.00008 RB，该收益不会因跑道拥挤而损失。

					属性卡共有5个级别，高级别的属性卡具有更高的年华收益率。</view>


				<view class="title">跑道</view>
				<view class="desc">
					共有三种跑道，分别是：石子路、烈日沙滩、芳草地。石子路需要装备有鞋子才能选择，芳草地需要装备有裤子才能选择，烈日沙滩需要装备有上衣才能选择。玩家可以修改跑道，跑道修改次日生效，不同的跑道选择收益可能不同。如果跑道与装配不匹配，则装备的收益会减少10%，如果跑道超过载量，该跑道上的玩家收益也会下降。
				</view>
				
				
				
				
				
				
				<view style="width: 100%; text-align: center; font-size: 54.72rpx; font-weight: bold;">经济模型</view>
				<view class="title">跑步收益</view>
				<view class="desc">玩家使用的属性卡决定了玩家的基本收益，属性卡的每个属性值可获得的收益为功能性值：0.0001 RB/天，美观性值：0.00008 RB/天，舒适性：0.00008 RB/天。</br></br>用户需完成5000步才会有完整收益，没少100步，收益减少1.4%，最多减少70%。当满5000步后玩家可以更换装备继续跑，每套装备会进行单独计步。</br></br>如果跑道与装备不匹配，装备收益会减少10%，如果跑道超过载量（10000），每多1000载量，收益减少1%，最多减少40%，舒适性值的收益不受衰减影响。一个n级属性卡，其载量为n。</view>
				<view class="title">游戏装备</view>
				<view class="desc">
					目前有三种游戏装备，分别是：鞋子、裤子、上衣。每件装备有3个属性卡槽，每个属性卡槽可以添加一张属性卡。每种装备共有5个级别，低级别装备不能安装高级别的属性卡。相同级别的装备可以合成为更高级别的装备，合成需要花费一定的游戏代币。
				</view>
				
				<view class="title">抽奖</view>
				<view class="desc">如果玩家使用的属性卡中有美观性值，则可以参与抽奖，中奖概率与美观性值成正比，奖品包括属性卡碎片、装备碎片及RB等。抽奖每天进行一次。。</view>
				
				
				<view style="width: 100%; text-align: center; font-size: 54.72rpx;font-weight: bold;">限制条件</view>
				<view class="desc">
					1.装备、属性卡为NFT，可以在游戏外转账
				</view>
				<view class="desc">
					2.当装备开始计步时，该天该装备无法绑定至其它玩家，即使该装备可能已转给其它玩家
				</view>
				<view class="desc">
					3.当装备开始计步时，该天装备无法更换属性卡，即使该属性卡已转给其它玩家，该属性卡收益仍然属于计步时的玩家
				</view>
				<view class="desc">
					4.开始计步时，合约会检查用户的绑定设备、属性卡是否全部属于该用户，如果不属于，会撤下对应的装备、属性卡
				</view>
</scroll-view>
		</view>
		
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
back() {
				uni.navigateBack({
					delta: 1
				});
			},
		}
	}
</script>

<style>
	.logo1 {
		width: 1.5625rem;
		height: 1.5625rem;
		position: absolute;
		left: 1.625rem;
		top: 2%;
	}
	.desc {
		margin: 20.88rpx;

		margin-left: 10%;
		width: 80%;
		text-align: center;
		font-size: 20.36rpx;
	}

	.title {
		margin-top: 30.83rpx;
		width: 100%;
		text-align: center;
		font-size: 37.36rpx;
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
