var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'You loaded this page on ' + new Date()
  }
})

var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true,
    type: 'B',
    loginType: 'username'
  },
  methods: {
    toggle: function () {
      if (this.loginType === 'username'){
        this.loginType =  ''
      }else {
        this.loginType = 'username'
      }
    }
  }
})

var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ],
    object: {
      FirstName: 'John',
      LastName: 'Doe',
      Age: 30
    }
  }
})

var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})

var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})

Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { text: 'Vegetables' },
      { text: 'Cheese' },
      { text: 'Whatever else humans are supposed to eat' }
    ]
  }
})

var app8 = new Vue({
  el: '#app-8',
  data: {
    message: 'Hello Vue!'
  },
  filters: {
    toUpperCase: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.toUpperCase()
    }
  }
})

var app9 = new Vue({
  el: '#app-9',
  data: {
    message: 'Hello Vue!'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the app9 instance
      return this.message.split('').reverse().join('')
    }
  }
})

var app10 = new Vue({
  el: '#app-10',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
  },
  computed: {
    fullName: {
    // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  }
})

var app11 = new Vue({
  el: '#app-11',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 question 發生改變，這個函式就會運行
    question: function (newQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.getAnswer()
    }
  },
  methods: {
    // _.debounce 是一個透過 lodash 限制操作頻率的函式。
    // 在這個例子中，我們希望限制訪問yesno.wtf/api的頻率
    // ajax請求直到用戶輸入完畢才會發出
    // 學習更多關於 _.debounce function (and its cousin
    // _.throttle), 參考: https://lodash.com/docs#debounce
    getAnswer: _.debounce(
      function () {
        var vm = this
        if (this.question.indexOf('?') === -1) {
          vm.answer = 'Questions usually contain a question mark. ;-)'
          return
        }
        vm.answer = 'Thinking...'
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer)
          })
          .catch(function (error) {
            vm.answer = 'Error! Could not reach the API. ' + error
          })
      },
      // 這是我們為用戶停止輸入等待的毫秒數
      500
    )
  }
})

var app12 = new Vue({
  el: '#app-12',
  data: {
    hasBlue: false,
    hasRed:  true
  }
})

var app13 = new Vue({
  el: '#app-13',
  data: {
    classObject: {
      'text-blue': false,
      'text-red':  true
    }
  }
})

var app14 = new Vue({
  el: '#app-14',
  data: {
    isActive: true,
    error: null
  },
  computed: {
    classObject: function () {
      return {
        'text-blue': this.isActive && !this.error,
        'text-red': this.error && this.error.type === 'fatal',
      }
    }
  }
})

var app15 = new Vue({
  el: '#app-15',
  data: {
    isActive: false,
    bgYellowClass: 'bg-yellow',
    redClass: 'text-red'
  }
})

var app16 = new Vue({
  el: '#app-16',
  data: {
    activeColor: 'red',
    fontSize: 30,
    styleObject: {
      color: 'red',
      fontSize: '20px'
    },
    baseStyles: {
      'background-color': 'blue'
    },
    overridingStyles: {
      color: 'white'
    }
  }
})

var app17 = new Vue({
  el: '#app-17',
  data: {
    ok: true
  }
})
