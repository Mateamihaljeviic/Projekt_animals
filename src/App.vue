<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/NavBar.vue'

export default {
  components: {
    Navbar,
  }
}
</script>

<style>
#app {
  padding-right: 120px;
}
</style>
