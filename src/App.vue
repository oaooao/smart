<template>
  <div id="app">
    <Talk></Talk>
  </div>
</template>

<script>
import Talk from './views/Talk'
import { mapActions } from 'vuex'
import Cookies from 'js-cookie'

export default {
  name: 'app',

  components: { Talk },

  created () {
    let userId = Cookies.get('userId')

    if (!userId) {
      let randomNum = Math.floor(Math.random() * 10 ** 16)

      userId = `ford${randomNum}`

      Cookies.set('userId', userId, { expires: 7 })
    }

    this.set_userId(userId)
  },

  methods: {
    ...mapActions(['set_userId'])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 100vw;
  min-height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
