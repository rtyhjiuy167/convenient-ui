<template>
  <button class="convenient-button" :class="[
    `convenient-button--${type}`,
    { 'is-plain': plain },
    { 'is-round': round },
    { 'is-circle': circle },
    { 'is-disabled': disabled }
  ]" @click="handleClick" :disabled="disabled">
    <i v-if="icon" :class="`iconfont convenient-icon-${icon}`"></i>
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: 'CButton',
  props: {
    type: {
      type: String,
      default: 'default'
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
    }
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
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

.convenient-button {
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

  &:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }

}

.convenient-button--primary {
  color: #fff;
  background-color: $primary-color;
  border-color: $primary-color;

  &:hover {
    background: $primary-active-color;
    background-color: $primary-active-color;
    color: #fff;
  }
}

.convenient-button--success {
  color: #fff;
  background-color: $success-color;
  border-color: $success-color;

  &:hover{
    background: $success-active-color;
    background-color: $success-active-color;
    color: #fff;
  }
}

.convenient-button--info {
  color: #fff;
  background-color: $info-color;
  border-color: $info-color;

  &:hover{
    background: $info-active-color;
    background-color: $info-active-color;
    color: #fff;
  }
}

.convenient-button--warning {

  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;

  &:hover {
    background: #ebb563;
    background-color: #ebb563;
    color: #fff;
  }

}

.convenient-button--danger {
  color: #fff;
  background-color: $danger-color;
  border-color: $danger-color;

  &:hover{
    background: $danger-active-color;
    background-color: $danger-active-color;
    color: #fff;
  }
}

.convenient-button.is-plain {

  &:hover {
    background: #fff;
    border-color: #489eff;
    color: #409eff;
  }
}

.convenient-button--primary.is-plain {

  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;

  &:hover {
    background: #409eff;
    border-color: #409eff;
    color: #fff;
  }
}

.convenient-button--success.is-plain {
  color: #67c23a;
  background: #c2e7b0;
  border-color: #c2e7b0;

  &:hover{
    background: #67c23a;
    border-color: #67c23a;
    color: #fff;
  }
}

.convenient-button--info.is-plain {
  color: #909399;
  background: #f4f4f5;
  border-color: #d3d4d6;

  &:hover{
    background: #909399;
    border-color: #909399;
    color: #fff;
  }
}

.convenient-button--warning.is-plain {
  color: #e6a23c;
  background: #fdf6ec;
  border-color: #f5dab1;

  &:hover {
    background: #e6a23c;
    border-color: #e6a23c;
    color: #fff;
  }
}

.convenient-button--danger.is-plain {

  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;

  &:hover {
    background: #f56c6c;
    border-color: #f56c6c;
    color: #fff;
  }
}

.convenient-button.is-round {
  border-radius: 20px;
  padding: 12px 23px;
}

.convenient-button.is-circle {
  border-radius: 50%;
  padding: 12px;
}

.convenient-button.is-disabled {
  cursor: no-drop;
  background-color: rgba(148, 146, 146, 0.39);
}
</style>