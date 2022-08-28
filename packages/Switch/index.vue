<template>
    <div class="convenient-switch" :class="{ 'is-checked': value }" @click="handleClick">
        <span class="convenient-switch__core" ref="core">
            <span class="convenient-switch__button"></span>
        </span>
        <input type="checkbox" class="convenient-switch__input" ref="input" :name="name">
    </div>
</template>

<script>

export default {
    name: "CSwitch",
    props: {
        value: {
            type: Boolean,
            defualt: false
        },
        activeColor: {
            type: String,
            defualt: ''
        },
        inactiveColor: {
            type: String,
            defualt: ''
        },
        name: {
            type: String,
            defualt: ''
        }
    },
    methods: {
        async handleClick() {
            this.$emit('input', !this.value);
            await this.$nextTick();
            this.setColor();
        },
        setColor() {
            if (this.activeColor || this.inactiveColor) {
                let color = !this.value ? this.activeColor : this.inactiveColor;
                this.$refs.core.style.borderColor = color;
                this.$refs.core.style.backgroundColor = color;
            }
        }
    },
    mounted() {
        this.setColor();
        this.$refs.input.checked = this.value;
    }
}
</script>

<style scoped lang='scss'>
.convenient-switch {
    display: inline-block;
    align-items: center;
    position: relative;
    font-size: 14px;
    line-height: 20px;
    vertical-align: middle;

    .convenient-switch__core {
        margin: 0;
        display: inline-block;
        position: relative;
        width: 40px;
        height: 20px;
        border: 1px solid #dcdfe6;
        outline: none;
        border-radius: 10px;
        box-sizing: border-box;
        background: #dcdfe6;
        cursor: pointer;
        transition: border-color .3s, background-color .3s;
        vertical-align: middle;

        .convenient-switch__button {
            position: absolute;
            top: 1px;
            left: 1px;
            border-radius: 100%;
            transition: all .3s;
            width: 16px;
            height: 16px;
            background-color: #fff;
        }
    }
}

.is-checked {
    .convenient-switch__core {
        border-color: #409eff;
        background-color: #409eff;

        .convenient-switch__button {
            transform: translateX(20px);
        }
    }
}

.convenient-switch__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
}
</style>