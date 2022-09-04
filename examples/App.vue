<template>
  <div>
      <c-form :model="form" :rules="rules" label-position="right" ref="form">
        <c-form-item label="手机号" prop="phone">
          <c-input v-model="form.phone"></c-input>
        </c-form-item>
        <c-form-item label="其它" prop="str">
          <c-input v-model="form.str"></c-input>
        </c-form-item>
        <c-form-item>
        <c-button type="primary" @click="submitForm">立即创建</c-button>
        <c-button @click="resetForm">重置</c-button>
  </c-form-item>
      </c-form>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      form: {
        phone: '',
        str: ''
      },
      rules: {
         phone: [
            {required: true, pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号', trigger: 'change' },
          ],
         str: [
            { required: true, message: '不能为空', trigger: 'blur' },
            {  max: 5, message: '最多只能输入 5 个字符', trigger: 'change' }
          ],
      }
    }
  },
  methods: {
      submitForm() {
        this.$refs.form.validate((valid,invalidFields) => {
          console.log(invalidFields)
          if (valid) {
            return true
          } else {
            return false
          }
        });
      },
      resetForm() {
        this.$refs.form.resetFields();
      }
    }
}
</script>