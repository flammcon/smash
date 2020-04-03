<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <button type="button" class="btn btn-primary btn-lg" @click="$router.push('players')">New Event</button>
    </div>
    <div class="row justify-content-center mt-3">
      <button type="button" class="btn btn-primary btn-lg" disabled>Load Event</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    navigate() {
      this.$router.push('players');
    },
  },
};
</script>

<style>
</style>
