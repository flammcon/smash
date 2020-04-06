<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <button type="button" class="btn btn-primary btn-lg"
        data-toggle="modal" data-target="#settingsModal">New Event</button>
    </div>
    <div class="row justify-content-center mt-3">
      <button type="button" class="btn btn-primary btn-lg" disabled>Load Event</button>
    </div>
    <EventSettings/>
  </div>
</template>

<script>
import EventSettings from './EventSettings.vue';

export default {
  name: 'Home',
  components: {
    EventSettings,
  },
  methods: {
    navigate() {
      this.$router.push('players');
    },
  },
};
</script>

<style>
</style>
