import Vue from 'vue'

// import Vant from 'vant'
// import 'vant/lib/index.css'

import App from '@/App.vue'
import router from '@/router'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element)


// import Components from '@/components'
// Vue.use(Components)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

