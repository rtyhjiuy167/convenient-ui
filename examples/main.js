import Vue from 'vue'
import App from './App.vue'
import MyUI from '../packages'

Vue.config.productionTip = false
Vue.use(MyUI);
new Vue({
  render: h => h(App)
}).$mount('#app')
