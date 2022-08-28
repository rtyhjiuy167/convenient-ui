<template>
    <div class="c-checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'CCheckboxGroup',
    provide() {
        return {
            CheckboxGroup: this
        }
    },
    props: {
        value: {
            type: Array
        }
    }
}
</script>
