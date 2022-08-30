<template>
  <div class="convenient-input" :class="{ 'convenient-input--suffix': showSuffix }">
    <template v-if="type == 'textarea'">
      <textarea class="convenient-textarea__inner" :class="styleClass" :placeholder="placeholder" :name="name"
        :disabled="disabled" :value="value" @input="handleInput" />
    </template>
    <template v-else>
      <input class="convenient-input__inner" :class="styleClass" :placeholder="placeholder"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type" :name="name" :disabled="disabled"
        :value="value" @input="handleInput">
      <span class="convenient-input__suffix" v-if="showSuffix">
        <i class="convenient-input__icon iconfont convenient-icon-error" v-if="clearable && value && !disabled"
          @click="clear"></i>
        <i class="convenient-input__icon iconfont"
          :class="passwordVisible ?   'convenient-icon-browse':'convenient-icon-hide'"
          v-if="showPassword && type == 'password'" @click="handlePassword"></i>
      </span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'CInput',
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
    size: {
      type: String,
      default: 'medium',
      validator: v => {
        return ['large', 'medium', 'small'].includes(v);
      }
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      passwordVisible: false,
    }
  },
  computed: {
    showSuffix() {
      return this.clearable || this.showPassword
    },
    styleClass() {
      return {
        [`is-${this.size}`]: this.size,
        "is-disabled": this.disabled,
        "is-center": this.center,
      }
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
  display: inline-block;

  .convenient-input__inner,
  .convenient-textarea__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    outline: none;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;

    padding: 0 15px;

    &:focus {
      outline: none;
      border-color: #409eff;
    }

    &.is-center {
      text-align: center;
    }

    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.is-small {
      font-size: 12px !important;
      height: 35px;
      line-height: 37px;
      min-height: 35px;
      min-width: 100%;
      max-width: 100%;
    }

    &.is-medium {
      font-size: 14px !important;
      height: 43px;
      line-height: 42px;
      min-height: 43px;
      max-width: 100%;
      min-width: 100%;
    }

    &.is-large {
      font-size: 15px !important;
      height: 45px;
      line-height: 43px;
      min-height: 45px;
      max-width: 100%;
      min-width: 100%;
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