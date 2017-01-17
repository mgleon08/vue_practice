// window.Event = new Vue();
window.Event = new class {
  constructor() {
    this.vue = new Vue;
  }
  fire(event, data = null) {
    this.vue.$emit(event, data);
  }
  listen(event, callback) {
    this.vue.$on(event, callback)
  }
}

Vue.component('coupon', {
  template: `<input placeholder='you need to coupon' @blur="
  onCouponApplied ">`,

  methods: {
    onCouponApplied() {
      // this.$emit('applied');
      // Event.$emit('applied');
      Event.fire('applied');
    }
  }
});

new Vue({
  el: '#root',
  data: {
    couponApplied: false
  },
  methods: {
    onCouponApplied() {
      alert('asd');
    }
  },
  created() {
    // Event.$on('applied', () => alert('event'))
    Event.listen('applied', () => alert('event'))
  }
});
