import Vue from 'vue'
import vuex from 'vuex'
import Talk from './modules/Talk'

Vue.use(vuex)

export default new vuex.Store({
  modules: {
    Talk
  }
})
