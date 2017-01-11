const User = { template: `<div>User {{ $route.params.userId }}</div>` }

const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})

const app = new Vue({ router }).$mount('#app')
