<template>
  <ul v-bind:class="[{current: game.isCurrent}, 'matchup']">
    <li v-bind:class="[{winner: player1Wins === 2}, {loser: player2Wins === 2}, 'team']">
      <BracketPlayer :player="players[0]" :wins="player1Wins" :reverse="reverse" @click.native="addWin(0)"/>
    <li v-bind:class="[{winner: player2Wins === 2}, {loser: player1Wins === 2}, 'team']">
      <BracketPlayer :player="players[1]" :wins="player2Wins" :reverse="reverse" @click.native="addWin(1)"/>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';
import BracketPlayer from './BracketPlayer.vue';

export default {
  name: 'Matchup',
  components: {
    BracketPlayer,
  },
  props: {
    game: Object,
    players: Array,
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
    ...mapState({
      locked: (state) => state.completed.oneVsOne,
    }),
  },
  methods: {
    addWin(index) {
      if (!(this.gameOver || this.locked) && this.game.isCurrent) {
        if (index === 0) {
          this.player1Wins += 1;
        } else {
          this.player2Wins += 1;
        }

        if (this.player1Wins === 2 || this.player2Wins === 2) {
          this.gameOver = true;
          const updatedGame = { ...this.game };
          updatedGame.winner = this.players[index];
          updatedGame.loser = this.players.find((x) => x.id !== updatedGame.winner.id);
          this.$emit('update:game', updatedGame);
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
.current li { opacity:1; }
.current { color: #2C7399; }
.winner { background-color: lightgreen; opacity: 0.7;}
.loser { background-color: lightpink; opacity: 0.7;}
</style>
