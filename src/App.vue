<template>
  <div id="app" class="container-fluid"> 
    <Draft/>
  </div>
</template>

<script>
import Draft from './components/Draft.vue'

export default {
  name: 'App',
  components: {
    Draft
  },
  created() {
    this.$store.dispatch('loadPlayers')
  },
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
