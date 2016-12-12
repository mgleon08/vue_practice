// 註冊
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app1 = new Vue({
  el: '#app-1',
  data: {
    groceryList: [
      { text: 'Vegetables' },
      { text: 'Cheese' },
      { text: 'Whatever else humans are supposed to eat' }
    ]
  }
})

// =======================================================

Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})

var app2 = new Vue({
  el: '#app-2',
  data: {
    isActive: true,
  }
})
