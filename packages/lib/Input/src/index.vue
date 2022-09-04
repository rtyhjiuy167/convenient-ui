<template>
  <div class="convenient-input" :class="{
    'convenient-input--append': $slots.append,
    'convenient-input--prepend': $slots.prepend,
    'convenient-input--prefix': $slots.prefix || prefixIcon,
    'convenient-input--suffix': $slots.suffix || suffixIcon,
    [`is-${this.size}`]: this.size
  }">
    <div class="convenient-input__prepend" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>
    <span class="convenient-input__prefix" v-if="$slots.prefix || prefixIcon" ref="prefix">
      <slot name="prefix"></slot>
      <i class="convenient-input__icon iconfont" :class="prefixIconName" v-if="prefixIcon">
      </i>
    </span>
    <input class="convenient-input__inner" :value="value" @input="handleInput" :placeholder="placeholder"
      :maxlength="maxlength" :disabled="disabled" :class="{
        'is-disabled': this.disabled,
        'is-center': this.center,
      }" :type="showPassword ? (passwordVisible ? 'text' : 'password') : type" @blur="handleBlur"
      @change="handleChange" ref="input">
    <span class="convenient-input__suffix" v-if="$slots.suffix || suffixIcon || showPassword || this.clearable"
      ref="suffix">
      <slot name="suffix"></slot>
      <i class="iconfont" :class="suffixIconName" v-if="suffixIcon"></i>
      <i class="iconfont convenient-icon-error" v-show="showClearIcon" @click="clear"></i>
      <i class="iconfont" :class="passwordVisible ? 'convenient-icon-browse' : 'convenient-icon-hide'"
        v-if="showPassword && type == 'password'" @click="handlePassword"></i>
      <span v-if="showEordLimit" class="convenient-input__length">{{ value.length }} / {{ parseInt(maxlength)
      }}</span>
    </span>
    <div class="convenient-input__append" v-if="$slots.append" ref="append" style="display: flex;">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'CInput',
  inject: {
      form: {
        default: ''
      },
      formItem: {
        default: ''
      }
    },
  props: {
    prefixIcon: String,
    suffixIcon: String,
    placeholder: String,
    name: String,
    maxlength: [String, Number],
    contentWidth: {
      type: Number,
      default: 150
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
    center: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showEordLimit: {
      type: Boolean,
      default: false
    },
    validateEvent: {
        type: Boolean,
        default: true
      },
    type: {
      type: String,
      default: 'text',
      validator: v => {
        return ['text', 'textarea', 'password'].includes(v);
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator: v => {
        return ['large', 'medium', 'small'].includes(v);
      }
    },
  },
  data() {
    return {
      passwordVisible: false,
      currentLength: 0,
    }
  },
  computed: {
    prefixIconName() {
      return `convenient-icon-${this.prefixIcon}`
    },
    suffixIconName() {
      return `convenient-icon-${this.suffixIcon}`
    },
    showClearIcon(){
        return this.clearable && this.value && !this.disabled
    },
    validateState() {
        return this.formItem ? this.formItem.validateState : '';
      },
  },
  mounted() {
    if (this.$slots.prefix || this.prefixIcon) {
      this.$refs.input.style.paddingLeft = this.$refs.prefix.offsetWidth + 'px';
      this.$refs.input.style.marginLeft = -this.$refs.prefix.offsetWidth + 'px';
    }
    if (this.$slots.suffix || this.suffixIcon || this.showPassword || this.clearable || this.showEordLimit) {
      this.$refs.input.style.paddingRight = this.$refs.suffix.offsetWidth + 'px';
      this.$refs.input.style.marginRight = -this.$refs.suffix.offsetWidth + 'px';
    }
  },
  watch: {
    showClearIcon() {
      if (this.clearable) {
        this.changeInputShap()
      }
    },
    value() {
      if (this.showEordLimit) {
        this.changeInputShap()
      }
      if (this.validateEvent && this.formItem) {
          this.formItem.onFieldChange();
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
    },
    changeInputShap() {
      Vue.nextTick(() => {
        this.$refs.input.style.paddingRight = this.$refs.suffix.offsetWidth + 'px';
        this.$refs.input.style.marginRight = -this.$refs.suffix.offsetWidth + 'px';
      })
    },
    handleBlur(event) {
        this.focused = false;
        this.$emit('blur', event);
        if (this.validateEvent && this.formItem) {
          this.formItem.onFieldBlur()
        }
      },
    handleChange(event) {
        this.$emit('change', event.target.value);
      },
  }
}
</script>

<style scoped lang='scss'>
.convenient-input {

  &.is-small {
    .convenient-input__inner {
      font-size: 13px;
      height: 30px;
      line-height: 30px;
    }

    .convenient-input__prepend {
      font-size: 13px;
      height: 30px;
      line-height: 30px;
    }

    .convenient-input__append {
      font-size: 13px;
      height: 30px;
      line-height: 30px;
    }
  }

  &.is-medium {
    .convenient-input__inner {
      font-size: 15px;
      height: 35px;
      line-height: 35px;
    }

    .convenient-input__prepend {
      font-size: 15px;
      height: 35px;
      line-height: 35px;
    }

    .convenient-input__append {
      font-size: 15px;
      height: 35px;
      line-height: 35px;
    }
  }

  &.is-large {
    .convenient-input__inner {
      font-size: 17px;
      height: 40px;
      line-height: 40px;
    }

    .convenient-input__prepend {
      font-size: 17px;
      height: 40px;
      line-height: 40px;
    }

    .convenient-input__append {
      font-size: 17px;
      height: 40px;
      line-height: 40px;
    }
  }

}

.convenient-input {
  width: 100%;
  display: inline-flex !important;
  background-color: #fff;
  align-items: center;
  border-radius: 4px;

  .convenient-input__prefix,
  .convenient-input__suffix {
    color: #c0c4cc;
    display: flex;
    height: 100%;
    line-height: 100%;
    align-items: center;

    i {
      font-size: 14px;
      cursor: pointer;
    }
  }

  .convenient-input__inner {
    flex: 1;
    width: 100%;
    display: inline-block;
    font-size: inherit;
    outline: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    background-image: none;
    color: #606266;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: rgba($color: #409eff, $alpha: 0.5);
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



  }

  .convenient-input__prepend {
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    background-color: #f5f7fa;
    border: 1px solid #ccc;
    border-right: none;
    border-radius: 4px 0 0 4px;
  }

  .convenient-input__append {
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    background-color: #f5f7fa;
    border: 1px solid #ccc;
    border-left: none;
    border-radius: 0 4px 4px 0;
  }

  .convenient-input__prefix,
  .convenient-input__suffix {
    position: relative;
    padding: 0 2px;
    text-align: center;
  }

  .convenient-input__length {
    display: inline-block;
    margin-left: 2px;
    font-size: 12px;
  }
}

.convenient-input--append {
  .convenient-input__inner {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.convenient-input--prepend {
  .convenient-input__inner {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

}

.convenient-icon-browse,
.convenient-icon-hide {
  display: flex;
  align-items: center;
}
</style>