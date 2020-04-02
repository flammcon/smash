<template>
  <div class="card border-0 player-card">
    <div class="row no-gutters">
      <div class="col-5">
         <img class="card-img" :style="backgroundStyle" :alt="player.name" :src="useMii ? player.mii : player.character"/>
      </div>
      <div class="col-7 name">
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
    color: String,
    useMii: Boolean
  },
  computed: {
    backgroundStyle() {
      return `background-color: ${this.color ? this.color : 'gold'}`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player-card {
  min-width: 120px;
}

.card-img {
  width: 50px;
  height: 50px;
  box-sizing: border-box;
}
.name {
  align-self: center;
}
</style>
