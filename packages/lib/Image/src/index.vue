<template>
  <div class="convenient-image" :style="{ width: width + 'px', height: height + 'px' }">
    <slot v-if="loading" name="placeholder">
    </slot>
    <slot v-else-if="error" name="error">
    </slot>
    <img v-else :src="src" :alt="alt" :style="{ 'object-fit': fit }" />
  </div>
</template>

<script>
import { isInContainer, getScrollParent } from '../../../utils/tool'
export default {
  name: 'CImage',
  props: {
    src: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    lazy: {
      type: Boolean,
      default: false
    },
    alt: {
      type: String,
      default: ''
    },
    fit: {
      type: String,
      default: 'fill',
      validator: v => {
        return ['fill', 'contain', 'cover', 'none', 'scale-down'].includes(v);
      }
    }

  },
  data() {
    return {
      show: !this.lazy,
      loading: true,
      error: false,
    }
  },
  watch: {
    show(val) {
      val && this.loadImage();
    }
  },
  mounted() {
    if (this.lazy) {
      this.addLazyLoadListener();
    } else {
      this.loadImage();
    }
  },
  methods: {
    loadImage() {
      const img = new Image();
      img.src = this.src;
      img.onload = () => {
        this.loading = false;
        this.error = false;
      },
        img.onerror = () => {
          this.loading = false;
          this.error = true;
        }
    },
    addLazyLoadListener() {
      this._scrollContainer = getScrollParent(this.$el);
 
      if (this._scrollContainer) {
        this._lazyLoadHandler = this.lazyLoadHandler;
        this.lazyLoadHandler();
        if(this._scrollContainer)this._scrollContainer.addEventListener('scroll', this._lazyLoadHandler);
        
      } else {
        this.lazyLoadHandler();
      }
    },
    lazyLoadHandler() {
      if (isInContainer(this.$el, this._scrollContainer)) {
        this.show = true;
        this.removeLazyLoadListener();
      }
    },
    removeLazyLoadListener() {
      const { _scrollContainer, _lazyLoadHandler } = this;
      if (!_scrollContainer || !_lazyLoadHandler) return;
      this._scrollContainer.removeEventListener('scroll', this.lazyLoadHandler);
      this._scrollContainer = null;
      this._lazyLoadHandler = null;
    }
  },

  beforeDestroy() {
    this.lazy && this.removeLazyLoadListener();
  },
}
</script>

<style scoped lang='scss'>
.convenient-image {
  box-sizing: border-box !important;
  border-bottom: 1px solid #ededed;

  img {
    height: 100%;
    width: 100%;
  }
}
</style>