<template>
  <div class="convenient-carousel" @mouseenter.stop="handleMouseEnter" @mouseleave.stop="handleMouseLeave">
    <div class="convenient-carousel__inner">
      <template v-if="direction == 'horizontal'">
        <transition v-if="arrowDisplay" name="carousel-arrow-left">
          <button v-show="hover" type="button" class="convenient-carousel__arrow convenient-carousel__arrow--left"
            @click.stop="prevItem">
            <i class="iconfont convenient-icon-arrow-left-bold"></i>
          </button>
        </transition>
        <transition v-if="arrowDisplay" name="carousel-arrow-right">
          <button v-show="hover" type="button" class="convenient-carousel__arrow convenient-carousel__arrow--right"
            @click.stop="nextItem">
            <i class="iconfont convenient-icon-arrow-right-bold"></i>
          </button>
        </transition>
      </template>
      <slot />
    </div>
    <ul :class="['convenient-carousel__dot', 'convenient-carousel__dot__' + direction]" v-if="hasDot" ref="carouselDot">
      <li v-for=" item in items.length" :key="item">
        <a href="javascript:;" :class="'convenient-carousel__dot__' + direction + '__lk'"
          :style="{ backgroundColor: (item - 1) == activeIndex ? activeDotBgColor : inActiveDotBgColor }"
          @click.stop="dotClick(item - 1)"></a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'CCarousel',
  props: {
    autoplay: {
      type: Boolean,
      default: () => true
    },
    interval: {
      type: Number,
      default: () => 3000
    },
    initial: {
      type: Number,
      default: () => 0
    },
    hasDot: {
      type: Boolean,
      default: () => true
    },
    direction: {
      type: String,
      default: () => 'horizontal'// "vertical"
    },
    activeDotBgColor: {
      type: String,
      default: () => 'rgba(255,255,255,0.7)'
    },
    inActiveDotBgColor: {
      type: String,
      default: () => 'rgba(255,255,255,0.3)'
    },
    arrowDisplay: {
      type: Boolean,
      default: () => true
    },
  },
  data() {
    return {
      activeIndex: this.initial,
      items: [],
      hover: false,
      timer: undefined,
      slideDir: 'right'
    }
  },
  methods: {
    updateItems() {
      this.items = this.$children.filter(child => child.$options.name === 'CCarouselItem');
    },
    setAutoplay() {
      this.timer = setInterval(() => {
        this.activeIndex = (this.activeIndex + 1) % this.items.length;
      }, this.interval)
    },
    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    startTimer() {
      if (this.interval <= 0 || !this.autoplay || this.timer) return;
      this.timer = setInterval(this.nextItem, this.interval);
    },
    nextItem() {
      this.slideDir = 'right';
      this.activeIndex = (this.activeIndex + 1) % this.items.length;
    },
    prevItem() {
      this.slideDir = 'left';
      this.activeIndex = (this.activeIndex - 1 + this.items.length) % this.items.length;
    },
    dotClick(activeIndex) {
      if (activeIndex < this.activeIndex) {
        this.slideDir = 'left';
      } else {
        this.slideDir = 'right';
      }
      this.activeIndex = activeIndex;
    },
    handleMouseEnter() {
      this.hover = true;
      this.pauseTimer()
    },
    handleMouseLeave() {
      this.slideDir = 'right';
      this.hover = false;
      this.startTimer();
    },
  },
  mounted() {
    this.updateItems();
    this.$nextTick(() => {
      if (this.hasDot) {
        this.$refs.carouselDot.style.marginTop = '-' + this.$refs.carouselDot.offsetHeight / 2 + 'px'
      }
      if (this.autoplay) {
        this.setAutoplay()
      }
      this.items.forEach((item, index) => {
        item.setSelfIdx(index);
      });
    })
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  watch: {
    activeIndex(val) {
      this.$emit('handleChange', val)
    }
  }
};
</script>
<style scoped lang='scss'>
@keyframes fadeLeft {
  0% {
    opacity: 0;
    transform: translateX(-5px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeRight {
  0% {
    opacity: 0;
    transform: translateX(5px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.carousel-arrow-left-enter-active {
  animation: fadeLeft .2s;

}

.carousel-arrow-left-leave-active {
  animation: fadeLeft .2s reverse;
}

.carousel-arrow-right-enter-active {
  animation: fadeRight .2s;
}

.carousel-arrow-right-leave-active {
  animation: fadeRight .2s reverse;
}

.convenient-carousel {
  width: 100%;
  height: 100%;
  position: relative;

  &__inner {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    z-index: 0;

    .convenient-carousel__arrow {
      position: absolute;
      top: 50%;
      z-index: 1;
      width: 30px;
      height: 30px;
      margin-top: -15px;
      text-align: center;
      line-height: 30px;
      color: #fff;
      background-color: rgba(31, 45, 61, 0.11);
      outline: none;
      text-decoration: none;
      border: none;
      border-radius: 50%;
      cursor: pointer;

      &:hover {
        background-color: rgba(31, 45, 61, 0.23);
      }

    }

    .convenient-carousel__arrow--left {
      left: 5px;
    }

    .convenient-carousel__arrow--right {
      right: 5px;
    }


  }

  &__dot {
    list-style: none;
    display: flex;
    margin: 0;
    position: absolute;
    width: 100%;
    padding: 0;
    z-index: 1;
  }


  &__dot__horizontal {
    bottom: 5px;
    justify-content: center;
    text-align: center;

    &__lk {
      display: inline-block;
      width: 20px;
      height: 5px;
      margin: 0 2px;
    }

  }

  &__dot__vertical {
    top: 50%;
    flex-direction: column;
    align-items: flex-end;

    &__lk {
      display: inline-block;
      width: 5px;
      height: 20px;
      margin: 2px 5px 2px 0;
    }

  }

}
</style>