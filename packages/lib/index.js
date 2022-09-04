
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
import Carousel from './Carousel'
import CCarouselItem from './CarouselItem'
import CMagnifier from './Magnifier'
import CImage from './Image'
import CFormItem from './FormItem'
import CForm from './Form'
import CInput from './Input'
import '../iconfont.css'

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
  Icon,
  Carousel,
  CCarouselItem,
  CMagnifier,
  CImage,
  CFormItem,
  CForm,
  CInput
];
const optionsComponentsName = (optionsComponents) => {
  let map = {};
  optionsComponents.forEach(i => {
    map[i] = 1;
  })
  return map
};

const install = function (Vue, options) {
  if (install.installed) return
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