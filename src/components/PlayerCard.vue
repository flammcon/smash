<template>
  <div class="card text-center" style="width: 150px">
    <div class="row no-gutters">
      <div class="col-5">
         <img class="card-img" :alt="player.name" :src="player.character"/>
      </div>
      <div class="col-7 card-body">
          {{player.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerCard',
  props: {
    player: Object,
    index: Number
  },
  methods: {
    getIconName(index) {
      return `mdi-numeric-${index+1}`;
    },
    click() { }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
