import Vue from 'vue'
import App from './App'
import Web3 from 'web3'
import uView from '@/uni_modules/uview-ui'

Vue.config.productionTip = false
Vue.prototype.Web3 = Web3
//自定义的属性
Vue.prototype.RBPRICE=1;
App.mpType = 'app'
Vue.use(uView)


const app = new Vue({
    ...App
})
app.$mount()
