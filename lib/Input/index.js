!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["Input/index"]=t():e["Input/index"]=t()}(self,(function(){return function(){"use strict";var e={900:function(e,t,n){function s(e,t,n,s,i,o,a,r){var l,d="function"==typeof e?e.options:e;if(t&&(d.render=t,d.staticRenderFns=n,d._compiled=!0),s&&(d.functional=!0),o&&(d._scopeId="data-v-"+o),a?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),i&&i.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},d._ssrRegister=l):i&&(l=r?function(){i.call(this,(d.functional?this.parent:this).$root.$options.shadowRoot)}:i),l)if(d.functional){d._injectStyles=l;var c=d.render;d.render=function(e,t){return l.call(t),c(e,t)}}else{var u=d.beforeCreate;d.beforeCreate=u?[].concat(u,l):[l]}return{exports:e,options:d}}n.d(t,{Z:function(){return s}})}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,n),o.exports}n.d=function(e,t){for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};var s={};return function(){n.d(s,{default:function(){return o}});var e=function(){var e=this,t=e._self._c;return t("div",{staticClass:"convenient-input",class:{"convenient-input--suffix":e.showSuffix}},["textarea"==e.type?[t("textarea",{staticClass:"convenient-textarea__inner",class:e.styleClass,attrs:{placeholder:e.placeholder,name:e.name,disabled:e.disabled},domProps:{value:e.value},on:{input:e.handleInput}})]:[t("input",{staticClass:"convenient-input__inner",class:e.styleClass,attrs:{placeholder:e.placeholder,type:e.showPassword?e.passwordVisible?"text":"password":e.type,name:e.name,disabled:e.disabled},domProps:{value:e.value},on:{input:e.handleInput}}),e._v(" "),e.showSuffix?t("span",{staticClass:"convenient-input__suffix"},[e.clearable&&e.value&&!e.disabled?t("i",{staticClass:"convenient-input__icon iconfont convenient-icon-error",on:{click:e.clear}}):e._e(),e._v(" "),e.showPassword&&"password"==e.type?t("i",{staticClass:"convenient-input__icon iconfont",class:e.passwordVisible?"convenient-icon-hide":"convenient-icon-browse",on:{click:e.handlePassword}}):e._e()]):e._e()]],2)};e._withStripped=!0;var t={name:"CInput",props:{placeholder:{type:String,default:""},type:{type:String,default:"text"},name:{type:String,default:""},disabled:{type:Boolean,default:!1},value:{type:String,default:""},size:{type:String,default:"medium",validator:e=>["large","medium","small"].includes(e)},clearable:{type:Boolean,default:!1},showPassword:{type:Boolean,default:!1},center:{type:Boolean,default:!1}},data(){return{passwordVisible:!1}},computed:{showSuffix(){return this.clearable||this.showPassword},styleClass(){return{[`is-${this.size}`]:this.size,"is-disabled":this.disabled,"is-center":this.center}}},methods:{handleInput(e){this.$emit("input",e.target.value)},clear(){this.$emit("input","")},handlePassword(){this.passwordVisible=!this.passwordVisible}}},i=(0,n(900).Z)(t,e,[],!1,null,"311c24c9",null).exports;i.install=function(e){e.component(i.name,i)};var o=i}(),s=s.default}()}));