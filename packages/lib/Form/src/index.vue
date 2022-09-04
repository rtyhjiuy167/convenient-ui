<template>
    <div class="convenient-form">
        <slot />
    </div>
</template>

<script>
export default {
    name: "CForm",
    provide() {
        return {
            form: this
        };
    },
    props: {
        model: Object,
        rules: Object,
        inline: {
            type: Boolean,
            default: false
        },
        labelWidth: {
            type: String,
            default: '80px'
        },
        labelPosition: {
            type: String,
            default: 'top',
            validator: v => {
                return ['left', 'right', 'top'].includes(v);
            }
        },
    },
    data() {
        return {
            fields: [],
        }
    },
    created() {
        this.$on('c.form.addField', (field) => {
            if (field) {
                this.fields.push(field);
            }
        });
        this.$on('c.form.removeField', (field) => {
            if (field.prop) {
                this.fields.splice(this.fields.indexOf(field), 1);
            }
        });
        // this.$on('validate', (prop, vaild, message) => {
        //    console.log(prop);
        //    console.log(vaild);
        //    console.log(message);
        // });
    },
    methods: {
        resetFields() {
            if (!this.model) {
                console.warn('model is required for resetFields to work.');
                return;
            }
            this.fields.forEach(field => {
                field.resetField();
            });
        },
        validate(callback) {
            if (!this.model) {
                console.warn('model is required for validate to work!');
                return;
            }
            if (this.fields.length === 0 && callback) {
                callback(true);
            }
            let invalidFields = {};
            let valid = true;
            this.fields.forEach(field => {
                field.validate('',(message, field) => {
                    if (message) {
                        valid = false;
                    }
                    invalidFields = Object.assign(invalidFields, field);
                })
            })
            callback(valid, invalidFields);
        },
    },

}
</script>

<style scoped lang='scss'>
</style>