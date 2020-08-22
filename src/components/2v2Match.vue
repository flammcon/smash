<template>
  <div class="row pb-4 mr-4" v-if="teamOne">
    <!-- <div :class="['col border', winner ? isWinner('one') ? 'border-danger' : 'border-primary' : '']"> -->
    <div class="col border"
      :style="{ borderColor: winner ? winner.color+'!important' : '' }">
      <h6>Game {{id}}</h6>
      <div class="row">
        <div class="col" @mouseover="one_hover = true" @mouseout="one_hover = false" @click="updateWins(teamOne)">
          <PlayerCard
            v-for="player in teamOne.players"
            :key="`teamone-game${id}-${player.id}`"
            :player="player"
            :color="teamOne.color"
            class="pb-1"
            :faded="winner ? !isWinner(teamOne) : !one_hover"
          />
        </div>
        <div class="col" @mouseover="two_hover = true" @mouseout="two_hover = false" @click="updateWins(teamTwo)">
          <PlayerCard
            v-for="player in teamTwo.players"
            :key="`teamTwo-game${id}-${player.id}`"
            :player="player"
            :color="teamTwo.color"
            class="pb-1"
            :faded="winner ? !isWinner(teamTwo) : !two_hover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerCard from './PlayerCard.vue';

export default {
  name: 'TwoVsTwoMatch',
  components: {
    PlayerCard,
  },
  data() {
    return {
      one_hover: false,
      two_hover: false,
      winner: null,
    };
  },
  props: {
    id: Number,
    teamOne: Object,
    teamTwo: Object,
  },
  methods: {
    updateWins(winner) {
      if (!this.winner) {
        this.winner = winner;
      }
    },
    isWinner(team) {
      return team === this.winner;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
