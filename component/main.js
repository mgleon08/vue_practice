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

// =======================================================

Vue.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">X</button>\
    </li>\
  ',
  props: ['title']
})

var app3 = new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    todos: [
      'Do the dishes',
      'Take out the trash',
      'Mow the lawn'
    ]
  },
  methods: {
    addNewTodo: function () {
      this.todos.push(this.newTodoText)
      this.newTodoText = ''
    }
  }
})

// =======================================================

var Child = {
  template: '<div>A custom component!</div>'
}

var app4 = new Vue({
  el: '#app-4',
  components: {
    // <my-component> 將只在父樣板可用
    'my-component': Child
  }
})

// =======================================================

var data = { counter: 0 }

Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // data 是一個函式，因此 Vue 不會警告，
  // 但是我們為每一個元件返回了同一個物件引用
  data: function () {
    // return data 會導致共享同一個 data，因此要改為以下方式
    return {
      counter: 0
    }
  }
})

var app5 = new Vue({
  el: '#app-5'
})
