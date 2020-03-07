<template>
  <i v-bind:class="[fill ? 'fas' : 'far', 'fa-circle']"></i>
</template>

<script>

export default {
  name: 'ScoreDot',
  props: {
    fill: Boolean
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
