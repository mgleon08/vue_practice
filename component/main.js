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

// =======================================================
// prop 是父元件用來傳遞數據的一個自定義屬性。子元件需要顯式地用 props 選項 聲明 「prop」
// camelCase vs. kebab-case
// HTML 特性不區分大小寫。當使用非字串模版時，prop的名字形式會從 camelCase 轉為 kebab-case（短橫線隔開）：
// myMessage(camelCase in JavaScript) -> my-message(kebab-case in HTML)

Vue.component('child', {
  // 聲明 props
  props: ['message'],
  // 就像 data 一樣，prop 可以用在樣板內
  // 同樣也可以在 vm 實例中像 「this.message」 這樣使用
  template: '<span>{{ message }}</span>'
})

Vue.component('child2', {
  props: ['myMessage'],
  template: '<span>{{ myMessage }}</span>'
})

Vue.component('child3', {
  props: ['someProp'],
  template: '<span>{{ someProp }}</span>'
})

// One-Way Data Flow
// 注意在 JavaScript 中物件和陣列是引用類型，指向同一個記憶體空間，如果 prop 是一個物件或陣列，在子元件內部改變它會影響父元件的狀態。
Vue.component('child4', {
  template: '<span>{{ counter }}</span>',
  props: ['initialCounter'],
  data: function () {
    return { counter: this.initialCounter }
  }
})

Vue.component('child5', {
  template: '<span>{{ normalizedSize }}</span>',
  props: ['size'],
  computed: {
    normalizedSize: function () {
      return this.size.trim().toLowerCase()
    }
  }
})

// Prop Validation
// prop 是一個物件而不是字串陣列時，它包含驗證要求。如果未指定驗證要求，Vue 會發出警告。
// type: String Number Boolean Function Object Array
// type 也可以是一個自定義構造器，使用 instanceof 檢測。
// 當 prop 驗證失敗了， Vue 將拒絕在子元件上設定此值，如果使用的是開發版本會拋出一條警告。

Vue.component('child6', {
  template: '<span>1. {{propA}} | 2. {{propB}} | 3. {{propC}} | 4. {{propD}} | 5. {{propE}} | 6. {{propF}}</span>',
  props: {
    // 基礎類型檢測 （`null` 意思是任何類型都可以）
    propA: Number,
    // 多種類型
    propB: [String, Number],
    // 必傳且是字串
    propC: {
      type: String,
      required: true
    },
    // 數字，有預設值
    propD: {
      type: Number,
      default: 100
    },
    // 陣列／物件的預設值應當由一個工廠函式返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定義驗證函式
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})

var app6 = new Vue({
  el: '#parents',
  data: {
    parentMsg: "i'm Parents"
  }
})

// =======================================================

Vue.component('button-counter', {
  template: '<button v-on:click="increment">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    increment: function () {
      this.counter += 1
      this.$emit('monitor')
    }
  },
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})

// =======================================================
// 自定義的表單輸入元件，使用 v-model 來進行數據雙向繫結。
// <input v-model="something">
// 語法糖  <input v-bind:value="something" v-on:input="something = $event.target.value">
// 簡寫    <input v-bind:value="something" v-on:input="something = arguments[0]">
// http://cn.vuejs.org/v2/guide/components.html#使用自定义事件的表单输入组件

Vue.component('currency-input', {
  template: '\
    <span>\
      $\
      <input\
        ref="input"\
        v-bind:value="value"\
        v-on:input="updateValue($event.target.value)"\
      >\
    </span>\
  ',
  props: ['value'],
  methods: {
    // Instead of updating the value directly, this
    // method is used to format and place constraints
    // on the input's value
    updateValue: function (value) {
      var formattedValue = value
        // Remove whitespace on either side
        .trim()
        // Shorten to 2 decimal places
        .slice(0, value.indexOf('.') + 3)
      // If the value was not already normalized,
      // manually override it to conform
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      // Emit the number value through the input event
      this.$emit('input', Number(formattedValue))
    }
  }
})

var app8 = new Vue({
  el: '#app-8',
  data: {
    price: 123
  }
})
