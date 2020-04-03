<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-primary" style="background-color: #e3f2fd;">
      <router-link to="/" v-slot="{ href, route, navigate }" >
        <a class="navbar-brand" :href="href" @click="navigate">
          <img src="./assets/characters/Unknown.png" width="30" height="30" class="d-inline-block align-top" alt="">
          Smash
        </a>
      </router-link>
    </nav>
    <div class="mt-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
