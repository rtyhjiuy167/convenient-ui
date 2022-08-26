<template>
    <label class="convenient-radio" :class="{ 'is-checked': label == model }">
        <span class="convenient-radio__input">
            <span class="convenient-radio__inner"></span>
            <!-- 
                如果只有 v-model ，则在修改 model 值时，父组件传递的值会修改，value 值也会修改，会造成使用该值得 radio 全部一起选中或取消
                如果只有 :value ，则由于单向数据流问题，无法进行修改
                两者都有，则 :value 用于确定值，v-model 用于判断是否选中，同时修改父组件传递的值
            -->
            <input type="radio" class="convenient-radio__original" :value="label" v-model="model">
        </span>
        <span class="convenient-radio__label">
            <slot>
                {{ label }}
            </slot>
        </span>
    </label>
</template>

<script>
export default {
    name: 'c-radio',
    props: {
        label: {
            type: [String, Number, Boolean],
            defualt: ''
        },
        value: null,
        name: {
            type: String,
            defualt: ''
        }
    },
    inject: {
        RadioGroup: {
            default: ''
        }
    },
    computed: {
        model: {
            get() {
                return this.isGroup ? this.RadioGroup.value : this.value
            },
            set(value) {
                this.isGroup ? this.RadioGroup.$emit('input', value) : this.$emit('input', value)
            }
        },
        isGroup() {
            return !!this.RadioGroup
        }
    },

}
</script>

<style scoped lang='scss'>
.convenient-radio {
    color: #606266;
    font-weight: 500;
    line-height: 1;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    outline: none;
    font-size: 14px;
    margin-right: 30px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;

    .convenient-radio__input {
        white-space: nowrap;
        cursor: pointer;
        outline: none;
        display: inline-block;
        line-height: 1;
        position: relative;
        vertical-align: middle;

        .convenient-radio__inner {
            border: 1px solid #dcdfe6;
            border-radius: 100%;
            width: 14px;
            height: 14px;
            background-color: #fff;
            position: relative;
            cursor: pointer;
            display: inline-block;
            box-sizing: border-box;

            &:after {
                width: 4px;
                height: 4px;
                border-radius: 100%;
                background-color: #fff;
                content: "";
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%) scale(0);
                transition: transform .15s ease-in;
            }
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

    .convenient-radio__label {
        font-size: 14px;
        padding-left: 10px;
        ;
    }
}

// 选中的样式
.convenient-radio.is-checked {
    .convenient-radio__input {
        .convenient-radio__inner {
            border-color: #409eff;
            background-color: #409eff;

            &:after {
                transform: translate(-50%, -50%) scale(1);
            }
        }
    }

    .convenient-radio__label {
        color: #409eff;
    }
}
</style>