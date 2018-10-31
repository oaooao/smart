import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './plugins/iview.js'
import Cookies from 'js-cookie'

Vue.config.productionTip = false

let userId = Cookies.get('userId')

console.dir(store)
console.dir(store.state)
console.dir(store.state.Talk)

if (!userId) {
  Cookies.set('userId', 'ford0007', { expires: 7 })
} else {
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
