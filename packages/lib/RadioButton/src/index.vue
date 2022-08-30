<template>
  <button class="convenient-radio-button" @click="handleClick" :class="[
  `convenient-radio-button--${type}`,
  { 'is-plain': plain },
  { 'is-round': round },
  { 'is-circle': circle },
  { 'is-active': active },
  { 'is-disabled': disabled }]" ref="button">

    <i v-if="icon" :class="`iconfont convenient-icon-${icon}`"></i>
    <span v-if="$slots.default">
      <slot />
    </span>
    <template v-else>
      {{  label  }}
    </template>
  </button>
</template>
<script>


export default {
  name: 'CRadioButton',
  props: {
    label: {
      type: [Number, Boolean, String],
      required: true,
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      default: null
    },
    type: {
      type: String,
      default: 'default',

    },
    icon: {
      type: String,
      default: ''
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    },

  },
  inject: {
    RadioGroup: {
      default: ''
    }
  },
  data() {
    return {
      orginalActiveColor: '',
      orginalInActiveColor: ''
    }
  },
  computed: {
    model: {
      get() {
        return this.isGroup ? this.RadioGroup.value : this.value
      }
    },
    active() {
      return this.model == this.label
    },
    isGroup() {
      return !!this.RadioGroup
    }
  },
  methods: {
    handleClick() {
      this.isGroup ? this.RadioGroup.$emit('input', this.label) : this.$emit('input', this.label);
      this.isGroup ? this.RadioGroup.$emit('click', this.model) : this.$emit('click', this.model);
    },
    setSelfColor() {
      if (this.activeColor || this.inactiveColor) {
        if (this.active) {
          if (this.activeColor) {
            this.$refs.button.style.borderColor = this.activeColor;
            this.$refs.button.style.backgroundColor = this.activeColor;
          } else {
            this.$refs.button.style.borderColor = this.orginalActiveColor;
            this.$refs.button.style.backgroundColor = this.orginalActiveColor;
          }
        } else {
          if (this.inactiveColor) {
            this.$refs.button.style.borderColor = this.inactiveColor;
            this.$refs.button.style.backgroundColor = this.inactiveColor;
          } else {
            this.$refs.button.style.borderColor = this.orginalInActiveColor;
            this.$refs.button.style.backgroundColor = this.orginalInActiveColor;
          }
        }

      }


    }
  },
  mounted() {
    this.setSelfColor()
  },

  watch: {
    activeColor(newVal) {
      this.orginalActiveColor = newVal;
    },
    inactiveColor(newVal) {
      this.orginalInActiveColor = newVal;
    },
    model() {
      this.setSelfColor()
    }
  }
}
</script>

<style scoped lang='scss'>
$primary-color: #409eff;
$primary-active-color: #66b1ff;
$info-color: #909399;
$info-active-color: #a6a9ad;
$success-color: #67c23a;
$success-active-color: #85ce61;
$danger-color: #f56c6c;
$danger-active-color: #f78989;


.convenient-radio-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  // 禁止文字被选中
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;

  &:hover,
  &.is-active {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }


  .convenient-radio__original {
    opacity: 0;
    outline: none;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
  }

}

.convenient-radio-button--primary {
  color: #fff;
  background-color: $primary-color;
  border-color: $primary-color;

  &:hover,
  &.is-active {
    background: $primary-active-color;
    background-color: $primary-active-color;
    color: #fff;
  }
}

.convenient-radio-button--success {
  color: #fff;
  background-color: $success-color;
  border-color: $success-color;

  &:hover,
  &.is-active {
    background: $success-active-color;
    background-color: $success-active-color;
    color: #fff;
  }
}

.convenient-radio-button--info {
  color: #fff;
  background-color: $info-color;
  border-color: $info-color;

  &:hover,
  &.is-active {
    background: $info-active-color;
    background-color: $info-active-color;
    color: #fff;
  }
}

.convenient-radio-button--warning {

  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;

  &:hover,
  &.is-active {
    background: #ebb563;
    background-color: #ebb563;
    color: #fff;
  }

}

.convenient-radio-button--danger {
  color: #fff;
  background-color: $danger-color;
  border-color: $danger-color;

  &:hover,
  &.is-active {
    background: $danger-active-color;
    background-color: $danger-active-color;
    color: #fff;
  }
}

.convenient-radio-button.is-plain {

  &:hover,
  &.is-active {
    background: #fff;
    border-color: #489eff;
    color: #409eff;
  }
}

.convenient-radio-button--primary.is-plain {

  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;

  &:hover,
  &.is-active {
    background: #409eff;
    border-color: #409eff;
    color: #fff;
  }
}

.convenient-radio-button--success.is-plain {
  color: #67c23a;
  background: #c2e7b0;
  border-color: #c2e7b0;

  &:hover,
  &.is-active {
    background: #67c23a;
    border-color: #67c23a;
    color: #fff;
  }
}

.convenient-radio-button--info.is-plain {
  color: #909399;
  background: #f4f4f5;
  border-color: #d3d4d6;

  &:hover,
  &.is-active {
    background: #909399;
    border-color: #909399;
    color: #fff;
  }
}

.convenient-radio-button--warning.is-plain {
  color: #e6a23c;
  background: #fdf6ec;
  border-color: #f5dab1;

  &:hover,
  &.is-active {
    background: #e6a23c;
    border-color: #e6a23c;
    color: #fff;
  }
}

.convenient-radio-button--danger.is-plain {

  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;

  &:hover,
  &.is-active {
    background: #f56c6c;
    border-color: #f56c6c;
    color: #fff;
  }
}

.convenient-radio-button.is-round {
  border-radius: 20px;
  padding: 12px 23px;
}

.convenient-radio-button.is-circle {
  border-radius: 50%;
  padding: 12px;
}

.convenient-radio-button.is-disabled {
  cursor: no-drop;
  background-color: rgba(148, 146, 146, 0.39);
}
</style>