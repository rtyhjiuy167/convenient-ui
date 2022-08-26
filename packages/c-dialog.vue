<template>
    <transition name="dialog-fade">
        <div class="convenient-dialog__wrapper" v-show="visible" @click.self="handleClose">
            <div class="convenient-dialog" :style="{ width, marginTop: top }">
                <div class="convenient-dialog__header">
                    <slot name="title">
                        <span class="convenient-dialog__title">
                            {{ title }}
                        </span>
                    </slot>
                    <button class="convenient-dialog__headerbtn" @click="handleClose">
                        <i class="iconfont convenient-icon-close"></i>
                    </button>
                </div>
                <div class="convenient-dialog__body">
                    <slot></slot>
                </div>
                <div class="convenient-dialog__footer" v-if="$slots.footer">
                    <slot name="footer">
                    </slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "c-dialog",
    props: {
        title: {
            type: String,
            defalut: ''
        },
        width: {
            type: String,
            defalut: '50%'
        },
        top: {
            type: String,
            defalut: '15vh'
        },
        visible: {
            type: Boolean,
            defalut: false
        }
    },
    methods: {
        handleClose() {
            // update:visible 支持 asyc 语法糖
            this.$emit('update:visible', false);
        }
    }
}
</script>

<style scoped lang='scss'>
.dialog-fade-enter-active {
    animation: fade .3s;
}

.dialog-fade-leave-active {
    animation: fade .3s reverse;
}

@keyframes fade {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.convenient-dialog__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 2001;
    background-color: rgba(0, 0, 0, 0.5);

    .convenient-dialog {
        position: relative;
        margin: 15vh auto 50px;
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        box-sizing: border-box;
        width: 30%;

        &__header {
            padding: 20px 20px 10px;

            .convenient-dialog__title {
                line-height: 24px;
                font-size: 18px;
                color: #303133;
            }

            .convenient-dialog__headerbtn {
                position: absolute;
                top: 20px;
                right: 20px;
                padding: 0;
                background: transparent;
                border: none;
                outline: none;
                cursor: pointer;
                font-size: 16px;

                .my-icon-close {
                    color: 909399
                }
            }
        }

        &__body {
            padding: 30px 20px;
            color: #606266;
            font-size: 14px;
            word-break: break-all;
        }

        &__footer {
            padding: 10px 20px 20px;
            text-align: right;
            box-sizing: border-box;

            // ::v-deep .my-button:first-child
            :deep(.my-button) :first-child {
                margin-right: 20px;
            }
        }
    }
}
</style>