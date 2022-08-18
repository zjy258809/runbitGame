	methods: {
			//用户点击获取的数据
			handleChange(data) {
				this.game = data.address
				// console.log(this.game)
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			InputEvent(e) {
				this.Contract.name = e.detail.value
			},
			GameInputEvent(e) {
				this.Contract.address = e.detail.value
			},
			ChangeType() {
				this.lock = !this.lock
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
							this.Contract.logo = this.imgList
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '温馨提示',
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			//初始化
			init() {
				this.GetWeb3Version()
				//调用Dapp授权
				let result = this.$web3.DappAuth()
				if (result) {
					this.GetNowAccount()
					this.getGasPrice()
					this.InitContract()
					this.GetGamesJson()
					this.GetERC20Banlance()
				}
			},
			//获取Web3版本
			GetWeb3Version() {
				// console.log(this.$Web3Client.version)
			},
			//更改节点RPC连接
			ChangeNode() {
				this.$web3.ChangeClient("https://http-mainnet-node.huobichain.com").then((res) => {
					// console.log(res)
				}).catch((err) => {
					// console.log(err)
				})
			},
			//获取当前Gas单价
			getGasPrice() {
				this.$web3.GetBlockNumber().then((res) => {
					// console.log(res.toString())
					this.gasPrice = res.toString()
				}).catch((err) => {
					// console.log(err)
				})
			},
			//获取当前连接地址
			GetNowAccount() {
				this.$web3.GetNowAccount().then((res) => {
					// console.log(res)
					this.address = res
					//设置默认账户
					this.$web3.SetDefaultAccount(this.address).then((res) => {
						// console.log(res)
					})
				}).catch((err) => {
					alert(err)
				})
			},
			//初始化一个合约对象
			InitContract() {
				this.$web3.GetContract(this.$abi, "合约地址").then((res) => {
					res ? console.log("实例化合约对象成功") : console.log("实例化合约对象失败")
				}).catch((err) => {
					// console.log(err)
				})
			},
			//获取已支持的游戏合约
			GetGamesJson() {
				collection.get().then((res) => {
					// console.log(res.result.data)
					this.dataSource = res.result.data
					this.$forceUpdate()
				})

			},
			//获取当前地址代币余额
			GetERC20Banlance() {
				
				setInterval(() => {
					this.$web3.ReadContractFunc("balanceOf", "0xE5c4630C9EbC022b2671aca9Cf6821E4e54c5C5D").then((
						res) => {
						console.log(res)
					}).catch((err) => {
						console.log(err)
					})
				}, 2000)

			},
			//领取空投
			JoinGames() {
				uni.showActionSheet({
					itemList: ['立即加入'],
					success: ((res) => {
						let options = {
							value: 10000000000000000,
							from: this.address,
							gasPrice: 24000000000,
							gas: 500000
						}
						// console.log(options)
						this.$tips.showLoading()
						this.$web3.SetContractFunc("JoinToken", options).then((res) => {
							// console.log(res)
							this.$tips.hideLoading()
						}).catch((err) => {
							// console.log(err)
							this.$tips.hideLoading()
						})
					}),
					fail: ((err) => {
						// console.log(err)
					})
				});
			},
			//充值积分
			GameLock() {
				let options = {
					from: this.address,
					gasPrice: 24000000000,
					gas: 500000
				}
				this.$tips.showLoading()
				this.$web3.SetContractFunc("GameLock", options, this.game, this.value * 100).then((res) => {
					// console.log(res)
					this.$tips.hideLoading()
				}).catch((err) => {
					// console.log(err)
					this.$tips.hideLoading()
					uni.showToast({
						title: '交易发生错误',
						mask: true,
						icon: 'none'
					})
				})
			},
			//提取积分
			GameUnLock() {
				this.$tips.showLoading()
				let options = {
					from: this.address,
					gasPrice: 24000000000,
					gas: 500000
				}
				this.$web3.SetContractFunc("GameUnLock", options, this.game, this.value * 100).then((res) => {
					// console.log(res)
					this.$tips.hideLoading()
				}).catch((err) => {
					// console.log(err)
					this.$tips.hideLoading()
					uni.showToast({
						title: '交易发生错误',
						mask: true,
						icon: 'none'
					})
				})
			},
			//添加合约
			AddGame() {
				this.$tips.showLoading()
				let that = this
				uniCloud.uploadFile({
					filePath: this.imgList[0],
					cloudPath: (((1 + Math.random()) * 100) | 0).toString(16),
					onUploadProgress: function(progressEvent) {
						// console.log(progressEvent);
						var percentCompleted = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total
						);
					},
					success(e) {
						that.Contract.logo = e.fileID
					},
					fail() {},
					complete() {}
				});
				let newGame = {
					"logo": this.Contract.logo.toString(),
					"name": this.Contract.name.toString(),
					"address": this.Contract.address.toString()
				}
				let options = {
					value: 500000000000000000,
					from: this.address,
					gasPrice: 24000000000,
					gas: 500000
				}
				this.$web3.SetContractFunc("AddGameContract", options, this.Contract.address).then((res) => {
					// console.log(res)
					this.$tips.hideLoading()
					collection.add({
						logo: this.Contract.logo.toString(), //data传过来的name
						name: this.Contract.name.toString(),
						address: this.Contract.address.toString()
					})

				}).catch((err) => {
					// console.log(err)
					uni.showToast({
						title: '交易发生错误',
						mask: true,
						icon: 'none'
					})
				})
			},
			RmGame() {

				uni.showModal({
					title: '温馨提示',
					content: '确定要移除这份积分合约吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							//RemoveGameContract
							this.$tips.showLoading()
							// console.log("移除")
							let options = {
								from: this.address,
								gasPrice: 24000000000,
								gas: 500000
							}
							this.$web3.SetContractFunc("RemoveGameContract", options, this.Contract.address)
								.then((res) => {
									uniCloud.deleteFile({
										fileList: [Contract[0].logo],
										success(e) {
											console.log(e)
										}
									})
									collection.where({
										address: this.Contract.address
									}).get().then((res) => {
										this.$tips.hideLoading()
										let Contract = []
										Contract = res.result.data
										collection.doc(Contract[0]._id).remove().then((res) => {
											this.GetGamesJson();
											uni.showToast({
												title: '移除成功',
												mask: true,
												icon: 'none'
											})

										})
									})
								}).catch((err) => {
									this.$tips.hideLoading()
									// console.log(err)
									uni.showToast({
										title: '交易发生错误',
										mask: true,
										icon: 'none'
									})
								})
						}
					}
				})
			},

		}
	