<template>
  <div>
    Smash
    <PlayerCard v-for="(player, index) in players" :key="player.id" :player="player" :index="index"/>
  </div>
</template>

<script>
import PlayerCard from './PlayerCard.vue';

export default {
  name: 'Smash',
  components: {
    PlayerCard,
  },
  created() {
    this.$store.dispatch('loadPlayers')
  },
  computed: {
    players: {
      set(players) {
        this.$store.commit('setPlayers', players);
      },
      get() {
        return this.$store.state.players;
      }
    },
    sortedPlayers() {
      return this.players.slice(0).sort((a, b) => {
        return a.score > b.score ? 1 : -1;
      });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#img {
  height: 50;
  width: 50;
}
</style>
