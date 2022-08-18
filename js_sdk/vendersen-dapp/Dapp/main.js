import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import cuCustom from '@/colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)


import inputSearch from '@/components/p-inputSearch/inputSearch.vue'
Vue.component('cu-search',inputSearch)

//封装Toast 和 Loading
import tips from 'common/js/fun.js'
Vue.prototype.$tips = tips


//引入web3.js SDK
import web3js from '@/common/web3js/index.js'
Vue.prototype.$web3 = web3js
//引入智能合约ABI
import abi from '@/common/abi_json/abi.json'
Vue.prototype.$abi = abi


//按钮
import CcButton from '@/components/cc-button/cc-button.vue' 
Vue.component('cu-CcButton',CcButton)

App.mpType = 'app'

const app = new Vue({ 
    ...App
})
app.$mount()
