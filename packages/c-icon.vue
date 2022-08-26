<template>
<div>
    <svg class="icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
 
</div>
</template>

<script>
import './icon/iconfont.js'
export default {
  name: "c-icon",
  props: {
    name: {
      type: String,
      defalut: ''
    }
  },
  computed: {
    iconName() {
      return `#convenient-icon-${this.name}`
    }
  }
}
</script>

<style scoped lang='scss'>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>