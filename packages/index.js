// 整个包的入口
import Button from './Button'
import Dialog from './Dialog'
import Input from './Input'
import Switch from './Switch'
import Radio from './Radio'
import RadioButton from './RadioButton'
import RadioGroup from './RadioGroup'
import Checkbox from './Checkbox'
import CheckboxGroup from './CheckboxGroup'
import Icon from './Icon'
import './iconfont.css'

const components = [
  Button,
  Dialog,
  Input,
  Switch,
  Radio,
  RadioButton,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Icon
];

export const CButton = { install: Vue => Vue.component(Button.name, Button) }
export const CDialog = { install: Vue => Vue.component(Dialog.name, Dialog) }
export const CInput = { install: Vue => Vue.component(Input.name, Input) }
export const CSwitch = { install: Vue => Vue.component(Switch.name, Switch) }
export const CRadio = { install: Vue => Vue.component(Radio.name, Radio) }
export const CRadioButton = { install: Vue => Vue.component(RadioButton.name, RadioButton) }
export const CRadioGroup = { install: Vue => Vue.component(RadioGroup.name, RadioGroup) }
export const CCheckbox = { install: Vue => Vue.component(Checkbox.name, Checkbox) }
export const CCheckboxGroup = { install: Vue => Vue.component(CheckboxGroup.name, CheckboxGroup) }
export const CIcon = { install: Vue => Vue.component(Icon.name, Icon) }

const optionsComponentsName = (optionsComponents) => {
  let map = {};
  optionsComponents.forEach(i => {
    map[i] = 1;
  })
  return map
};

const install = function (Vue, options) {
  if (options && options.components) {
    let map = optionsComponentsName(options.components);
    components.forEach(i => {
      if (map[i.name]) {
        Vue.component(i.name, i)
      }
    })
  } else {
    components.forEach(i => {
      Vue.component(i.name, i)
    })
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
};