<template>
  <div id="app" class="container-fluid"> 
    <Smash/>
  </div>
</template>

<script>
import Smash from './components/Smash.vue'

export default {
  name: 'App',
  components: {
    Smash
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
