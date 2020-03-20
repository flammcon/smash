<template>
  <div class="card border-0">
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-img {
  width: 80px;
  height: 80px;
  background-color: gold;
  box-sizing: border-box;
}
</style>
