<template>
  <div class="convenient-input" :class="{ 'convenient-input--suffix': showSuffix }">
    <input class="convenient-input__inner" :class="{ 'is-disabled': disabled }" :placeholder="placeholder"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type" :name="name" :disabled="disabled"
      :value="value" @input="handleInput">
    <span class="convenient-input__suffix" v-if="showSuffix">
      <i class="convenient-input__icon iconfont convenient-icon-error" v-if="clearable && value" @click="clear"></i>
      <i class="convenient-input__icon iconfont" :class="passwordVisible ? 'convenient-icon-hide' : 'convenient-icon-browse'"
        v-if="showPassword && type == 'password'" @click="handlePassword"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'c-input',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      passwordVisible: false,
    }
  },
  computed: {
    showSuffix() {
      return this.clearable || this.showPassword
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
    clear() {
      this.$emit('input', '');
    },
    handlePassword() {
      this.passwordVisible = !this.passwordVisible;
    }
  }

}
</script>

<style scoped lang='scss'>
.convenient-input {
  width: 100%;
  position: relative;
  font-size: 14px;
  display: inline-block;

  .convenient-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;

    &:focus {
      outline: none;
      border-color: #409eff;
    }

    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }

  }
}

.convenient-input--suffix {
  .convenient-input__inner {
    padding-right: 30px;
  }

  .convenient-input__suffix {
    position: absolute;
    right: 10px;
    height: 100%;
    top: 0;
    line-height: 40px;
    text-align: center;
    color: #c0c4cc;
    transition: all .3s;
    z-index: 900;

    i {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      transition: color .2s cubic-bezier(.645, .045, .355, 1);
    }
  }
}
</style>