const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Baz = { template: '<div>baz</div>' }

const router = new VueRouter({
  routes: [
    { path: '/redirect', redirect: '/other' },
    { path: '/redirect_name', redirect: { name: 'Other' } }, {
      path: '/other',
      name: 'Other',
      components: {
        default: Baz,
        a: Bar,
        b: Foo
      }
    }
  ]
})

new Vue({
  router,
}).$mount('#app')
