// 0. 如果使用模組化機制程式設計，匯入Vue和VueRouter，要呼叫 Vue.use(VueRouter)

// 1. 定義（路由）元件。
// 可以從其他文件 import 進來
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const User = { template: `<div>User {{ $route.params.id }}</div>` }

// 2. 定義路由
// 每個路由應該映射一個元件。 其中"component" 可以是
// 透過 Vue.extend() 建立的元件構造器，
// 或者，只是一個元件配置物件。
// 我們晚點再討論嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: '/user/:id', component: User }
]

// 3. 建立 router 實例，然後傳 `routes` 配置
// 你還可以傳別的配置參數, 不過先這麼簡單著吧。
const router = new VueRouter({
  routes // （縮寫）相當於 routes: routes
})

// 4. 建立和掛載根實例。
// 記得要透過 router 配置參數注入路由，
// 從而讓整個應用都有路由功能
const app = new Vue({
  router
}).$mount('#app')

// 現在，應用已經啟動了！
