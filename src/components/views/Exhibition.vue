<template>
  <div class="container-fluid">
    <Header title="Exhibition" :prevDisabled="true" :disabled="true" />
    <div v-for="(game, index) in games" :key="`exhibition-game-${index}`">
      <div class="row justify-content-center align-items-center border mb-3">
        <h5 class="mb-0">Game {{index+1}}</h5>
        <PlayerCard
          v-for="player in game.players"
          :key="`exhibition-${game.group}-${player.id}`"
          :player="player"
          :image="`${game.pick}`"
          class="mx-3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../Header.vue';
import PlayerCard from '../PlayerCard.vue';

export default {
  name: 'Exhibition',
  components: {
    Header,
    PlayerCard,
  },
  computed: {
    ...mapGetters({
      players: 'sortedPlayerList',
    }),
    games() {
      return [
        { group: 'top', players: this.top, pick: 1 },
        { group: 'bottom', players: this.bottom, pick: 1 },
        { group: 'odds', players: this.odds, pick: 2 },
        { group: 'evens', players: this.evens, pick: 2 },
        { group: 'red', players: this.red, pick: 3 },
        { group: 'blue', players: this.blue, pick: 3 },
      ];
    },
    top() {
      return this.players.slice(0, 4);
    },
    bottom() {
      return this.players.slice(4);
    },
    odds() {
      return this.players.filter((player, index) => index % 2 === 0);
    },
    evens() {
      return this.players.filter((player, index) => index % 2 !== 0);
    },
    red() {
      return this.players.filter((player, index) => index === 0 || index === 3 || index === 4 || index === 7);
    },
    blue() {
      return this.players.filter((player, index) => index === 1 || index === 2 || index === 5 || index === 6);
    },
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
