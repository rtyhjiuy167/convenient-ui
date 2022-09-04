<template>
  <div>
    <c-radio-group v-model="labelPosition" size="small">
      <c-radio-button label="left">左对齐</c-radio-button>c
      <c-radio-button label="right">右对齐</c-radio-button>
      <c-radio-button label="top">顶部对齐</c-radio-button>
    </c-radio-group>
    <div style="margin: 20px;">
      <c-form :model="form"  :label-position="labelPosition" label-width="100px">
        <c-form-item label="待填项一" prop="str1">
          <c-input v-model="form.str1"></c-input>
        </c-form-item>
        <c-form-item label="待填项二" prop="str2">
          <c-input v-model="form.str2"></c-input>
        </c-form-item>
        <c-form-item label="其它" prop="str3">
          <c-input v-model="form.str3"></c-input>
        </c-form-item>
      </c-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      labelPosition: 'right',
      form: {
        str1: '',
        str2: '',
        str3: ''
      },
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
