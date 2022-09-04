<template>
  <div class="convenient-magnifier" :style="{
    width: contentWidth + 'px',
    height: contentHeight + 'px'
  }" ref="cMagnifier">
    <a class="convenient-magnifier__mag" :href="link" :target="blank ? '_blank' : ''"
      :style="{ width: magWidth + 'px', height: magHeight + 'px' }" ref="mag">
      <template v-if="imgUrl">
        <img class="convenient-magnifier__mag__img" :src="imgUrl" :alt="imgAlt"
          :style="{ width: contentWidth + 'px', height: contentHeight + 'px' }" ref="img" />
      </template>
      <template v-else>
        <div class="convenient-magnifier__mag__img"
          :style="{ width: contentWidth + 'px', height: contentHeight + 'px' }" ref="img">
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
export default {
  name: 'CMagnifier',
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
    contentWidth: {
      type: Number,
      default: 300
    },
    contentHeight: {
      type: Number,
      default: 300
    },
    magHeight: {
      type: Number,
      default: 60
    },
    magWidth: {
      type: Number,
      default: 60
    },
    imgAlt: {
      type: String,
      default: ''
    },
  },

  mounted() {
    this._cMagnifier = this.$refs.cMagnifier;
    const { x, y } = this._cMagnifier.getBoundingClientRect()
    this._x = x;
    this._y = y;
    this._mag = this.$refs.mag;
    this._img = this.$refs.img;
    this._cMagnifier.addEventListener('mouseenter', this.mouseenterHandler);
    this.addMousemoveListener(this.mouseMoveHandler)
    this._cMagnifier.addEventListener('mouseleave', this.mouseleaveHandler)
  },
  methods: {
    mouseMoveHandler(e) {
      if (!this._mag.classList.contains('show')) this._mag.classList.add('show');
      this._mag.style.left = e.pageX - this._x - this.magWidth / 2 + 'px';
      this._img.style.left = -(e.pageX - this._x - this.magWidth / 2) + 'px';
      this._mag.style.top = e.pageY - this._y - this.magHeight / 2 + 'px';
      this._img.style.top = -(e.pageY - this._y - this.magHeight / 2) + 'px';
      if (e.pageX < this._x || e.pageX > (this._x + this.contentWidth) || e.pageY < this._y || e.pageY > (this._y + this.contentHeight)) {
        this._mag.classList.remove('show');
      }
    },
    mouseenterHandler(e) {
      this._mag.classList.add('show');
      this.mouseMoveHandler(e);
    },
    mouseleaveHandler() {
      this._mag.classList.remove('show');
    },

    addMousemoveListener() {
      const { _handleMouseMove } = this;
      if (_handleMouseMove) return
      this._cMagnifier.addEventListener('mousemove', this.mouseMoveHandler);
      this._handleMouseMove = this.mouseMoveHandler;
    },
    removeMousemoveListener() {
      const { _handleMouseMove } = this;
      if (!_handleMouseMove) return
      this._cMagnifier.removeEventListener('mousemove', this.mouseMoveHandler);
      this._handleMouseMove = null;
    },

  },
  beforeDestroy() {
    this._cMagnifier.removeEventListener('mouseenter', this.mouseenterHandler);
    this._cMagnifier.removeEventListener('mouseleave', this.mouseleaveHandler);
    this.removeMousemoveListener();
    this._x = null;
    this._y = null;
    this._cMagnifier = null;
    this._mag = null;
    this._img = null;

  },
}
</script>

<style scoped lang='scss'>
.convenient-magnifier {
  box-sizing: border-box !important;
  position: relative;
  border: 1px solid #ddd;
  box-shadow: 0 0 5px #999;

  a {
    cursor: default;
    text-decoration: none !important;
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