<template>
  <div class="row pb-4 mr-4">
    <div :class="['col border', winner ? isWinner('red') ? 'border-danger' : 'border-primary' : '']">
      <h6>Game {{id}}</h6>
      <div class="row">
        <div class="col" @mouseover="red_hover = true" @mouseout="red_hover = false" @click="updateWins('red')">
          <PlayerCard
            v-for="player in red"
            :key="`redteam-game${id}-${player.id}`"
            :player="player"
            color="indianred"
            class="pb-1"
            :faded="winner ? !isWinner('red') : !red_hover"
          />
        </div>
        <div class="col" @mouseover="blue_hover = true" @mouseout="blue_hover = false" @click="updateWins('blue')">
          <PlayerCard
            v-for="player in blue"
            :key="`blueteam-game${id}-${player.id}`"
            :player="player"
            color="dodgerblue"
            class="pb-1"
            :faded="winner ? !isWinner('blue') : !blue_hover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PlayerCard from '../PlayerCard.vue';

const { mapMutations, mapGetters } = createNamespacedHelpers('results');

export default {
  name: 'SplitMatch',
  components: {
    PlayerCard,
  },
  data() {
    return {
      red_hover: false,
      blue_hover: false,
      winner: null,
    };
  },
  props: {
    id: Number,
    red: Array,
    blue: Array,
  },
  methods: {
    ...mapMutations(['incrementRedWins', 'incrementBlueWins']),
    ...mapGetters(['four_vs_four_locked']),
    updateWins(winner) {
      if (!this.winner && !this.four_vs_four_locked()) {
        this.winner = winner;
        if (winner === 'red') {
          this.incrementRedWins(1);
        } else {
          this.incrementBlueWins(1);
        }

        if (this.four_vs_four_locked()) {
          this.$emit('gameOver');
        }
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
