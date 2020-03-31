<template>
  <button
    type="button"
    v-bind:class="[wins > min - 1 ? `btn-${styling}` : `btn-outline-${styling}`, 'btn']"
    :disabled="disabled || wins !== min - 1">Win {{min}}
  </button>
</template>

<script>
export default {
  name: 'WinButton',
  props: {
    min: Number,
    wins: Number,
    disabled: Boolean,
    styling: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
