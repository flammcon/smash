<template>
  <ul v-bind:class="[{current: game.current}, 'matchup']">
    <li v-bind:class="[{winner: getPlayerWins(0) === 2}, {loser: getPlayerWins(1) === 2}, 'team']">
      <BracketPlayer :player="getPlayer(0)" :reverse="reverse" @click.native="addWin(0)"/>
    <li v-bind:class="[{winner: getPlayerWins(1) === 2}, {loser: getPlayerWins(0) === 2}, 'team']">
      <BracketPlayer :player="getPlayer(1)" :reverse="reverse" @click.native="addWin(1)"/>
    </li>
  </ul>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import BracketPlayer from './BracketPlayer.vue';

const { mapGetters, mapMutations } = createNamespacedHelpers('results');

export default {
  name: 'Matchup',
  components: {
    BracketPlayer,
  },
  props: {
    gameId: Number,
    reverse: Boolean,
  },
  data() {
    return {
      player1Wins: 0,
      player2Wins: 0,
      gameOver: false,
    };
  },
  computed: {
    ...mapGetters({
      locked: 'one_vs_one_locked',
      gameById: 'gameById',
    }),
    game() {
      return this.gameById(this.gameId);
    },
    players() {
      return this.game.teams;
    },
  },
  methods: {
    ...mapMutations(['update1v1GameResults']),
    getPlayer(index) {
      return this.players[index];
    },
    getPlayerWins(index) {
      return this.getPlayer(index).wins;
    },
    addWin(index) {
      if (!(this.gameOver || this.locked) && this.game.current) {
        this.players[index].wins += 1;

        if (this.getPlayerWins(0) === 2 || this.getPlayerWins(1) === 2) {
          this.gameOver = true;
          const winner = this.getPlayer(index);
          this.update1v1GameResults({ id: this.gameId, winner, loser: this.players.find((x) => x.id !== winner.id) });
          this.$emit('matchOver');
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.matchup {
  margin:0;
  width: 100%;
  padding: 10px 0;
  height:60px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.team:hover { opacity: 0.7 }
.team {
  padding: 0 5px;
  margin: 3px 0;
  height: 25px;
  line-height: 25px;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
}
li {
  background-color: #fff;
  box-shadow: none;
  opacity: 0.45;
}
.current li { opacity: 1; }
.current { color: #2C7399; }
.winner { background-color: lightgreen; opacity: 0.7; }
.loser { background-color: lightpink; opacity: 0.7; }
.final .winner { background-color: gold; opacity: 1; }
.final .loser { background-color: silver; opacity: 1; }
.third .winner { background-color: goldenrod; opacity: 1; }
</style>
