const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Baz = { template: '<div>baz</div>' }

const router = new VueRouter({
  // vue-router 預設 hash 模式 —— 使用 URL 的 hash 來模擬一個完整的 URL，於是當 URL 改變時，頁面不會重新載入。
  // 如果不想要很醜的 hash，我們可以用路由的 history 模式，這種模式充分利用 history.pushState API 來完成 URL 跳轉而無須重新載入頁面。
  // mode: 'history',
  routes: [
    { path: '/',
      // a single route can define multiple named components
      // which will be rendered into <router-view>s with corresponding names.
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    },
    {
      path: '/other',
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
