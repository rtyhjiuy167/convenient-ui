<template>
    <div class="convenient-radio-group">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'c-radio-group',
    provide() {
        return {
            RadioGroup: this
        }
    },
    props: {
        value: null
    }
}
</script>
