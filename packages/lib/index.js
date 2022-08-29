
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
  CCarouselItem
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