<template>
  <div id="app" style="margin:400px 0 0 200px;">
    <c-magnifier>
      ddd
    </c-magnifier>
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
