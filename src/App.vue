<template>
  <div id="app">
    <Talk></Talk>
    <div id="iCenter"></div>
  </div>
</template>

<script>
import Talk from './views/Talk'
import userId from '@/utils/verify.js'

export default {
  name: 'app',

  components: { Talk },

  created() {
    this.$store.dispatch('set_userId', userId)
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

body {
  overflow: hidden;
}

ul {
  list-style-type: none;
}

.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>
