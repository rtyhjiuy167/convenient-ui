import Magnifier from './src/index.vue'

Magnifier.install = function (Vue) {
  Vue.component(Magnifier.name, Magnifier);
}
export default Magnifier;