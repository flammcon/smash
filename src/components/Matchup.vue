<template>
  <ul v-bind:class="[{current: game.isCurrent || gameOver}, 'matchup']">
    <li v-bind:class="[{winner: player1Wins === 2}, {loser: player2Wins === 2}, 'team']">
      <BracketPlayer :player="players[0]" :wins="player1Wins" :reverse="reverse" @click.native="addWin(0)"/>
    <li v-bind:class="[{winner: player1Wins === 2}, {loser: player2Wins === 2}, 'team']">
      <BracketPlayer :player="players[1]" :wins="player2Wins" :reverse="reverse" @click.native="addWin(1)"/>
    </li>
  </ul>
</template>

<script>
import BracketPlayer from './BracketPlayer'

export default {
  name: 'Matchup',
  components: {
    BracketPlayer,
  },
  props: {
    game: Object,
    players: Array,
    reverse: Boolean
  },
  data() {
    return {
      player1Wins: 0,
      player2Wins: 0,
      gameOver: false
    }
  },
  methods: {
    addWin: function(index) {
      if (!this.gameOver && this.game.isCurrent) {
        if (index === 0) {
          this.player1Wins++;
        } else {
          this.player2Wins++;
        }

        if (this.player1Wins === 2 || this.player2Wins === 2) {
          this.gameOver = true;
          const updatedGame = {...this.game};
          updatedGame.winner = this.players[index];
          updatedGame.loser = this.players.find(x => x.id !== updatedGame.winner.id);
          this.$emit('update:game', updatedGame);
          this.$emit('matchOver');
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.matchup {margin:0;width: 100%;padding: 10px 0;height:60px;-webkit-transition: all 0.2s;transition: all 0.2s;}
.team:hover {background-color: rgba(255, 255, 255, 0.7)}
.team {padding: 0 5px;margin: 3px 0;height: 25px; line-height: 25px;white-space: nowrap; overflow: hidden;position: relative;}
.champion li, .round li {background-color: #fff;box-shadow: none; opacity: 0.45;}
.current li {opacity: 1;}
.current div li.team {background-color: #fff;box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);opacity: 1;}
.winner li {background-color: lime};
.loser li {background-color: red};
</style>
