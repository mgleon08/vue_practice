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
    // 不是直接更新值，而是使用此方法來對輸入值進行格式化和位數限制
    updateValue: function (value) {
      var formattedValue = value
        // 刪除兩側的空格符
        .trim()
        // 保留 2 小數位
        .slice(0, value.indexOf('.') + 3)
      // 如果值不統一，手動覆蓋以保持一致
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      // 透過 input 事件發出數值
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

// =======================================================
// 除非子元件樣板包含至少一個 <slot> 插口，否則父元件的內容將會被丟棄。
// 當子元件樣板只有一個沒有屬性的 slot 時，父元件整個內容片段將插入到 slot
// 所在的 DOM 位置，並替換掉 slot 標籤本身。

Vue.component('app-layout', {
  template: '<div class="container">\
  <header>\
    <slot name="header"></slot>\
  </header>\
  <main>\
    <slot></slot>\
  </main>\
  <footer>\
    <slot name="footer"></slot>\
  </footer>\
</div>'
})

var app9 = new Vue({
  el: '#app-9'
})

// =======================================================
Vue.component('child', {
  template: '<div class="child">\
  <slot text="hello from child"></slot>\
</div>'
})

Vue.component('my-awesome-list', {
  template: '<ul>\
  <slot name="item"\
    v-for="item in items"\
    :text="item.text">\
    <!-- fallback content here -->\
  </slot>\
</ul>',
  data: function(){
    return {
      items:[
        { text: 'he' },
        { text: 'll' },
        { text: 'o' }
      ]
    }
  }
})

var app10 = new Vue({
  el: '#app-10'
})

// =======================================================
// 也可以直接繫結到元件物件上：
// var Home = {
//     template: '<p>Welcome home!</p>'
//   }

var app11 = new Vue({
  el: '#app-11',
  data: {
    currentView: 'home'
  },
  components: {
    home: { template: '<p>Welcome home!</p>' },
    posts: { template: '<p>Welcome posts!</p>' },
    archive: { template: '<p>Welcome archive!</p>' }
  }
})

// =======================================================
// 當 ref 和 v-for 一起使用時， ref 是一個陣列或物件，包含相應的子元件。
// $refs 只在元件渲染完成後才填充，並且它是非響應式的。它僅僅作為一個直接訪問子元件的應急方案——應當避免在模版或計算屬性中使用 $refs 。

var parent = new Vue({
  el: '#parent'
})
// 訪問子元件
var child = parent.$refs.profile
console.log(child)

// =======================================================
// 工廠函式接收一個 resolve 回調，在收到從伺服器下載的元件定義時呼叫。也可以呼叫 reject(reason) 指示載入失敗。

Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // Pass the component definition to the resolve callback
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})

var app13 = new Vue({
  el: '#app-13'
})

// 推薦配合使用 ：Webpack 的程式碼分割功能：http://webpack.github.io/docs/code-splitting.html
// Vue.component('async-webpack-example', function (resolve) {
//   // 這個特殊的 require 語法告訴 webpack
//   // 自動將編譯後的程式碼分割成不同的塊，
//   // 這些塊將透過 Ajax 請求自動下載。
//   require(['./my-async-component'], resolve)
// })
// 你可以使用 Webpack 2 + ES2015 的語法返回一個 Promise resolve 函式：
// Vue.component(
//   'async-webpack-example',
//   () => System.import('./my-async-component')
// )

// =======================================================

Vue.component('example', {
  template: '<button v-on:click="updateMessage">{{ message }}</button>',
  data: function () {
    return {
      message: 'not updated ( in console )'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = 'updated'
      console.log(this.$el.textContent) // => '沒有更新'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => '更新完成'
      })
    }
  }
})

var app14 = new Vue({
  el: '#app-14'
})
