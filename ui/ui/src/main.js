import Vue from 'vue'
import App from './App.vue'
import { store } from './store/index'
import router from './router/router'

import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css";
Vue.config.productionTip = false
const options = {
  // You can set your default options here
  position: 'bottom-right'
}
Vue.use(require('vue-shortkey'))
Vue.use(Toast, options)
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
