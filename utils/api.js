//功能：暴露接口

const BASE_URL = 'https://gapi.runbit.org/api/v1/' //域名或选取所有接口不变的那一部分
export const myRequest = (options) => { //暴露一个function：myRequest，使用options接收页面传过来的参数
        return new Promise((resolve, reject) => { //异步封装接口，使用Promise处理异步请求
            uni.request({ //发送请求
                url: BASE_URL + options.url, //接收请求的API
                method: options.method || 'GET', //接收请求的方式,如果不传默认为GET
                data: options.data || {}, //接收请求的data,不传默认为空
                success: (res) => { //数据获取成功
                    if (res.data.code !== 0) { //因为0是返回成功的状态码，如果不等于0,则代表获取失败,
                        return uni.showToast({
                            title: "数据获取失败！"
                        })
                    }
                    resolve(res.data.data) //成功,将数据返回
                },
                fail: (err) => { //失败操作
                    uni.showToast({
                        title: "请求接口失败！"
                    })
                    reject(err)
                }
            })
        })
    }

/*下面代码不作用途：仅参照演示，模仿页面调用函数，将实参传进myRequest，也就是上面myRequest使用(options)接收。
myRequest({
    url: '/getInfo',
    method: 'POST',
})
*/