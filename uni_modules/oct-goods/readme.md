# 十月的商城列表

## 使用说明
> 1. 点击使用HBuilderX导入
> 2. 在页面中插入

## 组件功能
> 1. 实现简单的商品列表
> 2. 配置货币标识
> 3. 使用结构化数据格式
> 4. 点击返回商品触发onGoods，返回值为点击项，用于实现商品转跳逻辑

## 示例代码
`
	// template
	<oct-goods
		:lists="goodsArr"
		price-type="$"
		@onGoods="onGoods"
	/>
	
	// data
	goodsArr: [
		{
			goods_id	: "",
			cover		: "https://yanxuan-item.nosdn.127.net/6d48e6ea51a06b1356ccda21497fdb14.png",
			name		: "茅台王子酒 金王子 53度 500毫升",
			price		: {
				price_min: 275
			}
		},{
			goods_id	: "",
			cover		: "https://yanxuan-item.nosdn.127.net/87357968bc1d8d8334557148d15296da.png",
			name		: "飞天53%vol 500ml贵州茅台酒（带杯）",
			price		: {
				price_min: 1499
			}
		}
	]
`

## 列表数据说明

| 参数 		| 参数类型 	| 说明 | 
|:-----		| :----:	| :----|
|goods_id	| String 	| 商品id|
|cover		| String 	| 封面图|
|name		| String 	| 商品名称|
|price		| Object 	| 价格信息，obj中至少包含最低价「price_min」|

## 参数说明

| 参数 		| 参数类型 	| 必要参数 	| 默认值 | 说明	|
|:-----		| :----:	| :----: 	| :----:| :---- |
|lists		| Array 	| true 		| []	| 列表数据，具体列表参数参考列表参数说明 |
|price-type | String 	| false 	| ￥		| 商品价值货币符，传入即可 |

## 点击事件

| 参数 		| 返回数据类型 	| 说明 | 
|:-----		| :----:		| :----|
|onGoods	| Object 		| 点击商品块返回对应商品Obj数据，用于处理转跳逻辑|
