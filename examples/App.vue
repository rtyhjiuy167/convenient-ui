<template>
  <div id="app" style="margin-left:400px">
    <div class="row">
      <c-button type="primary">按钮</c-button>
      <c-button type="success">按钮</c-button>
      <c-button type="info">按钮</c-button>
      <c-button type="warning">按钮</c-button>
      <c-button type="danger">按钮</c-button>
    </div>
    <c-carousel style="width: 300px;height:300px">
      <c-carousel-item :key="1">
        <img src="./assets/12.png" style="width: 300px;height:300px" />
      </c-carousel-item>
      <c-carousel-item :key="2">
        <img src="./assets/logo.png" style="width: 300px;height:300px" />
      </c-carousel-item>
      <c-carousel-item :key="3">
        <img src="./assets/2.jpg" style="width: 300px;height:300px" />
      </c-carousel-item>
    </c-carousel>
    c
    <!-- <c-dialog :visible="visible"></c-dialog> -->
  </div>
</template>

<script>




export default {
  name: "App",

  data() {
    return {
      visible: true,
      input: "",
      isChecked: false,
      gender: "1",
      groupGender: "1",
      radioButton: 'a',
      active: false,
      index: ["1"],
      slideData: [
        {
          id: 1,
          title: '图片1',
          bg: '#ff9900'
        },
        {
          id: 2,
          title: '图片2',
          bg: '#ff8899'
        },
        {
          id: 3,
          title: '图片3',
          bg: '#dddddd'
        }
      ]
    };
  },
  methods: {
    handleClick(val) {
      console.log(val)

    }
  },

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
