<template>
  <transition :name="'carousel-slide-' + direction + '-' + slideDir" carousel-slide>
    <div class="convenient-carousel-item" v-show="selfIndex == activeIndex">
      <slot />
    </div>
  </transition>
</template>
<script>
export default {
  name: 'CCarouselItem',
  data() {
    return {
      selfIndex: -1,
      direction: this.$parent.direction
    }
  },
  computed: {
    slideDir() {
      return this.$parent.slideDir
    },
    activeIndex() {
      return this.$parent.activeIndex
    }
  },
  methods: {
    setSelfIdx(selfIndex) {
      this.selfIndex = selfIndex
    }
  },
}
</script>
<style scoped lang='scss'>
.convenient-carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.carousel-slide {
  &-horizontal {
    &-right {
      &-enter-active {
        animation: enterR2L .3s;
      }

      &-leave-active {
        animation: leaveR2L .3s;
      }
    }

    &-left {
      &-enter-active {
        animation: enterL2R .3s;
      }

      &-leave-active {
        animation: leaveL2R .3s;
      }
    }

  }

  &-vertical {
    &-right {
      &-enter-active {
        animation: enterB2T .3s;
      }

      &-leave-active {
        animation: leaveB2T .3s;
      }
    }

    &-left {
      &-enter-active {
        animation: enterT2B .3s;
      }

      &-leave-active {
        animation: leaveT2B .3s;
      }
    }
  }
}


@keyframes enterL2R {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes leaveL2R {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(100%);
  }
}

@keyframes enterR2L {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}
@keyframes leaveR2L {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}



@keyframes enterT2B {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes leaveT2B {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(100%);
  }
}

@keyframes enterB2T {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes leaveB2T {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-100%);
  }
}
</style>