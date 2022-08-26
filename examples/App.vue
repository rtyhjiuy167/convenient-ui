<template>
  <div id="app">
    <div class="row">
      <c-button type="primary">按钮</c-button>
      <c-button type="success">按钮</c-button>
      <c-button type="info">按钮</c-button>
      <c-button type="warning">按钮</c-button>
      <c-button type="danger">按钮</c-button>
    </div>
    <div class="row">
      <c-button type="primary" disabled>按钮</c-button>
      <c-button type="success" disabled>按钮</c-button>
      <c-button type="info" disabled>按钮</c-button>
      <c-button type="warning" disabled>按钮</c-button>
      <c-button type="danger" disabled>按钮</c-button>
    </div>
    <div class="row">
      <c-button type="primary" round>按钮</c-button>
      <c-button type="success" round>按钮</c-button>
      <c-button type="info" round>按钮</c-button>
      <c-button type="warning" round>按钮</c-button>
      <c-button type="danger" round>按钮</c-button>
    </div>
    <div class="row">
      <c-button type="primary" circle icon="home"></c-button>
      <c-button type="success" circle icon="select"></c-button>
      <c-button type="info" circle icon="select"></c-button>
      <c-button type="warning" circle icon="select"></c-button>
      <c-button type="danger" circle icon="delete"></c-button>
    </div>
    <c-dialog :visible.sync="visible">
      <template v-slot:title>
        <h3>我是标题</h3>
      </template>
      内容
      <template v-slot:footer>
        <c-button type="primary">确认</c-button>
        <c-button type="danger">关闭</c-button>
      </template>
    </c-dialog>
    <div class="row">
      <c-input placeholder="请输入内容" v-model="input" clearable type="password" size="small"></c-input>
    </div>
    <div class="row">
      <c-input placeholder="请输入内容" v-model="input" clearable type="password"></c-input>
    </div>
    <div class="row">
      <c-input placeholder="请输入内容" v-model="input" clearable type="password" size="large"></c-input>
    </div>

    <div class="row">
      <c-input placeholder="请输入内容" value="ss" center clearable type="password" showPassword disabled></c-input>
    </div>
    <div class="row">
      <c-input placeholder="请输入内容" v-model="input" type="textarea" size="large"></c-input>
    </div>
    <div class="row">
      <c-switch v-model="isChecked"></c-switch>
    </div>
    <div class="row">
      <c-radio label="1" v-model="gender"></c-radio>
      <c-radio label="2" v-model="gender"></c-radio>
    </div>
    <div class="row">
      <c-radio-group v-model="groupGender">
        <c-radio label="1"></c-radio>
        <c-radio label="2"></c-radio>
      </c-radio-group>
    </div>
    <div class="row">
      <c-checkbox v-model="active">dd</c-checkbox>
    </div>
    <div class="row">
      <c-checkbox-group v-model="index">
        <c-checkbox label="1"></c-checkbox>
        <c-checkbox label="2"></c-checkbox>
      </c-checkbox-group>
    </div>
    <div class="row">
      <c-icon name="close"></c-icon>
    </div>

  </div>
</template>

<script>




export default {
  name: "App",
  data() {
    return {
      visible: false,
      input: "",
      isChecked: false,
      gender: "1",
      groupGender: "1",
      active: false,
      index: ["1"]
    };
  },
  methods: {},

}
</script>

<style lang="scss" scoped>
.row {
  margin-bottom: 20px;

  .convenient-button {
    margin-right: 20px;
  }
}
</style>
