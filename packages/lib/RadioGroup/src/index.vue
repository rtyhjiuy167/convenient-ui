<template>
    <div class="convenient-radio-group">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'CRadioGroup',
    provide() {
        return {
            RadioGroup: this
        }
    },
    props: {
        value: null
    },
    
}
</script>
<style></style>