// 整个包的入口
import CButton from './c-button'
import CDialog from './c-dialog'
import CInput from './c-input'
import CSwitch from './c-switch'
import CRadio from './c-radio'
import CRadioGroup from './c-radio-group'
import CCheckbox from './c-checkbox'
import CCheckboxGroup from './c-checkbox-group'
import './icon/iconfont.css'

const components = [
  CButton,
  CDialog,
  CInput,
  CSwitch,
  CRadio,
  CRadioGroup,
  CCheckbox,
  CCheckboxGroup
]
const install = function (Vue) {
  components.forEach(i => {
    Vue.component(i.name, i)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install
};