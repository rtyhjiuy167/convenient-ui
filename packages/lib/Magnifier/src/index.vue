<template>
  <div v-magnifier class="convenient-magnifier" :style="{
    width: imgWidth + 'px',
    height: imgHeight + 'px'
  }">
    <a class="convenient-magnifier__mag" :href="link" :target="blank ? '_blank' : ''"
      :style="{ width: magWidth + 'px', height: magHeight + 'px' }">
      <template v-if="imgUrl">
        <img class="convenient-magnifier__mag__img" :src="imgUrl" :alt="imgAlt"
          :style="{ width: imgWidth + 'px', height: imgHeight + 'px' }" />
      </template>
      <template v-else>
        <div class="convenient-magnifier__mag__img">
          <slot />
        </div>
      </template>
    </a>
    <a class="convenient-magnifier__lk" :href="link">
      <template v-if="imgUrl">
        <img class="convenient-magnifier__lk__static--img" :src="imgUrl" :alt="imgAlt" />
      </template>
      <template v-else>
        <div class="convenient-magnifier__lk__static--img">
          <slot />
        </div>
      </template>
    </a>
  </div>
</template>

<script>
import { magnifier } from '../../../directives/index'
export default {
  name: 'CMagnifier',
  directives: {
    magnifier
  },
  props: {
    link: {
      type: String,
      default: ''
    },
    blank: {
      type: Boolean,
      default: false
    },
    imgUrl: {
      type: String,
    },
    imgWidth: {
      type: Number,
      default: 300
    },
    imgHeight: {
      type: Number,
      default: 300
    },
    magHeight: {
      type: Number,
      default: 80
    },
    magWidth: {
      type: Number,
      default: 80
    },
    imgAlt: {
      type: String,
      default: ''
    }
  },
}
</script>

<style scoped lang='scss'>
.convenient-magnifier {
  position: relative;
  border: 1px solid #ddd;
  box-shadow: 0 0 5px #999;

  a {
    cursor: default;
    text-decoration: none;
    color: inherit;
  }

  &__mag {
    display: none;
    position: absolute;
    top: 0;
    left: 0;

    background-color: #fff;
    box-shadow: 0 0 3px #ccc;
    cursor: move;
    overflow: hidden;
    z-index: 1;

    &.show {
      display: block;
      transform: scale(1.5);
    }

    &__img {
      position: absolute;
      top: 0;
      left: 0;
    }





  }

  &__lk {
    &__static--img {
      width: 100%;
      height: 100%;
    }


  }
}
</style>