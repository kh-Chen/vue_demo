import Vue from 'vue';

Vue.directive('afterrender', {
  // 当绑定元素插入到 DOM 中。
  bind: function (el,binding) {
    binding.value(el);
  }
})
