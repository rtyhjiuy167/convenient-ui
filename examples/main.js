import Vue from 'vue'
import App from './App.vue'
import convenientUI from '../packages'
// import { CButton } from '../packages'

Vue.config.productionTip = false

Vue.use(convenientUI);

// Vue.use(convenientUI, {
//   components: ["CButton"]
// });

// Vue.use(CButton);

new Vue({
  render: h => h(App)
}).$mount('#app')
