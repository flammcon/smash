<template>
  <div class="card border-0 player-card">
    <div class="row no-gutters">
      <div class="col-5">
         <img class="card-img"
          :style="backgroundStyle"
          :alt="player.name"
          :src="source"/>
      </div>
      <div class="col-7 name">
          {{player.name}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PlayerCard',
  props: {
    player: Object,
    color: String,
    image: {
      type: String,
      default: 'character',
    },
  },
  computed: {
    ...mapGetters(['characterById']),
    backgroundStyle() {
      return `background-color: ${this.color ? this.color : 'gold'}`;
    },
    source() {
      switch (this.image) {
        case 'mii':
          return this.player.mii;
        case 'character':
        case undefined:
          return this.player.character;
        default: {
          const index = parseInt(this.image, 10);
          return this.characterById(this.player.picks[index - 1]);
        }
      }
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
