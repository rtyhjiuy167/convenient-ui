import Vue from 'vue'
import App from './App.vue'
import convenientUI from '../packages'

Vue.config.productionTip = false
Vue.use(convenientUI);
new Vue({
  render: h => h(App)
}).$mount('#app')
