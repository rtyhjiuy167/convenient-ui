<template>

    <div class="convenient-form-item" :class="[

    form.labelPosition,
    {
        'is-required':  required || isRequired,
        'is-inline': form.inline
        }
    ]">
        <div class="convenient-form-item__label" :style="{ width: form.labelWidth }">
            <label class="convenient-form-item__label__inner" :style="{ width: form.labelWidth }">{{
            label
            }}</label>
        </div>
        <div class="convenient-form-item__content">
            <slot />
            <transition name="error-info">
                <slot v-if="validateState === 'error'" name="error" :error="validateMessage">
                    <div class="convenient-form-item__error">
                        {{validateMessage}}
                    </div>
                </slot>
            </transition>
        </div>
    </div>
</template>

<script>
import AsyncValidator from 'async-validator';
import Vue from 'vue';

export default {
    name: "CFormItem",
    inject: {
        form: {
            default: {
                labelPosition: 'top',
                labelWidth: '80px',
                inline:false
            }
        }
    },
    provide(){
        return {
            formItem:this
        };
    },
    props: {
        label: String,
        prop: String,
        required: {
            type: Boolean,
            defalut: false
        }
    },
    data() {
        return {
            validateDisabled: false,
            validateState: '',
            validateMessage: '',
        }
    },
    computed: {
        fieldValue() {
            const model = this.form.model;
            if (!model || !this.prop) return;
            return model[this.prop];
        },
        isRequired() {
            let rules = this.getRules();
            return rules && rules.length && rules.some(rule=> rule.required);
      },
    },
    methods: {
        resetField() {
            let model = this.form.model;
            if(this.prop)model[this.prop] = this.initialValue;
            Vue.nextTick(()=>{
                this.validateState = '';
                this.validateMessage = '';
            })
        },
        getRules() {
            let formRules = this.form.rules;
            formRules = formRules ? formRules[this.prop] ? formRules[this.prop] : []: [];
            const requiredRule = this.required ? { required: this.required } : [];
            
            return [].concat(formRules).concat(requiredRule);
        },
        getFilteredRule(trigger) {
            const rules = this.getRules();
            return rules.filter(rule => {
                if (!rule.trigger || !trigger) return true;
                if (Array.isArray(rule.trigger)) {
                    return rule.trigger.indexOf(trigger) != -1;
                } else {
                    return rule.trigger === trigger;
                }
            }).map(rule=> Object.assign({},rule))
        },
        validate(trigger,callback=()=>{}) {

            const rules = this.getFilteredRule(trigger);
    

            if ((!rules || rules.length === 0) && !this.required) {
                return true;
            }
            const descriptor = {};
            descriptor[this.prop] = rules;
            const validator = new AsyncValidator(descriptor);
            const model = {};
            model[this.prop] = this.fieldValue;
            validator.validate(model, {
                first: false, // 是否在第一个规则验证错误时调用回调，不再处理其他验证规则
                firstFields: true // 是否在指定字段的第一个规则验证错误时调用回调，不再处理相同字段的验证规则，true代表所有字段
            }, (errors, invalidFields) => {
                this.validateState = !errors ? 'success' : 'error';
                this.validateMessage = errors ? errors[0].message : '';
                // 手动调用触发
                callback(this.validateMessage, invalidFields);
                // 改变 value 、焦点失去触发
                this.form && this.form.$emit('validate', this.prop, !errors, this.validateMessage || null);
            })
        },
        onFieldChange() {
            this.validate('change');
        },
        onFieldBlur() {
            this.validate('blur');
      },
   
    },
    mounted() {
        if(this.prop){
            this.form.$emit('c.form.addField', this);

            let initialValue = this.fieldValue;
            if (Array.isArray(initialValue)) {
                initialValue = [].concat(initialValue);
            }
            Object.defineProperty(this, 'initialValue', {
                value: initialValue
            });
        }
    },
    beforeDestroy() {
        this.form.$emit('c.form.removeField', this);
    }
}
</script>

<style scoped lang='scss'>
@keyframes fade {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.error-info-enter-active {
    animation: fade .3s;
}

.convenient-form-item {
    width: 100%;
    margin: 5px;

    &.is-inline {
        display: inline-block !important;
        width: fit-content;

        .convenient-form-item__content {
            width: 200px;
        }
    }

    &.is-required {
        .convenient-form-item__label__inner::before {
            content: '*';
            color: #F56C6C;
            margin-right: 4px;
            font-size: 14px;
        }
    }

    &.top {
        height: 100px;

        .convenient-form-item__content {
            display: block;
        }
    }


    &__label {
        padding-right: 12px;

        &__inner {
            line-height: 40px;
            height: 40px;
            font-size: 17px;
        }

    }

    &__content {
        position: relative;
        height: 40px;
        line-height: 40px;
    }


    &__error {
        position: absolute;
        height: 20px;
        line-height: 20px;
        color: red;
        font-size: 14px;
    }
}




.right {
    height: 60px;
    display: flex;

    .convenient-form-item__content {
        display: inline-block;
        flex: 1;
    }

    .convenient-form-item__label {
        text-align: right !important;
        display: inline-block;

        .convenient-form-item__label__inner {
            text-align: right !important;
        }
    }
}

.left {
    height: 60px;
    display: flex;

    .convenient-form-item__content {
        display: inline-block;
        flex: 1;
    }

    .convenient-form-item__label {
        display: inline-block;
        text-align: left !important;

        .convenient-form-item__label__inner {
            text-align: left !important;
        }
    }
}
</style>