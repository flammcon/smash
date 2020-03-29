<template>
  <div>
    <Header title="Solo Cup" prev="pods"/>
    <section id="bracket">
      <h4>Winners Bracket</h4>
      <div class="container">
        <div class="split split-one">
          <div class="round round-one">
            <div class="round-details">Round 1<br/><span class="date">Games 1 and 2</span></div>
            <Matchup :players="game1Players" :game.sync="game1"
              @matchOver="updateNextMatch(game1, game2, game7, game5, 0)"/>
            <Matchup :players="game2Players" :game.sync="game2"
              @matchOver="updateNextMatch(game2, game3, game7, game5, 1)"/>
          </div>  <!-- END ROUND ONE -->

          <div class="round round-two">
            <div class="round-details">Round 2<br/><span class="date">Game 7</span></div>
            <Matchup :players="game7.players" :game.sync="game7"
              @matchOver="updateNextMatch(game7, game8, game12, game11, 0)"/>
          </div>  <!-- END ROUND TWO -->
        </div>

        <div class="champion">
          <div class="final">
            <i class="fa fa-trophy"></i>
            <div class="round-details">Championship<br/><span class="date">Game 12</span></div>
            <Matchup :players="game12.players" :game.sync="game12"
              @matchOver="updateNextMatch(game12, null, null, null, 0)"/>
          </div>
        </div>

        <div class="split split-two">
          <div class="round round-two">
            <div class="round-details">Round 2<br/><span class="date">Game 8</span></div>
            <Matchup :players="game8.players" :game.sync="game8" reverse
              @matchOver="updateNextMatch(game8, game9, game12, game11, 1)"/>
          </div>  <!-- END ROUND TWO -->

          <div class="round round-one">
            <div class="round-details">Round 1<br/><span class="date">Games 3 and 4</span></div>
            <Matchup :players="game3Players" :game.sync="game3" reverse
              @matchOver="updateNextMatch(game3, game4, game8, game6, 0)"/>
            <Matchup :players="game4Players" :game.sync="game4" reverse
              @matchOver="updateNextMatch(game4, game5, game8, game6, 1)"/>
          </div>  <!-- END ROUND ONE -->
        </div>
      </div>
      <div class="container">
        <div class="split split-one third">
          <div class="round round-one">
            <div class="round-details">3rd Place<br/><span class="date">Game 11</span></div>
            <Matchup :players="game11.players" :game.sync="game11"
              @matchOver="updateNextMatch(game11, game12, null, null, 0)"/>
          </div>  <!-- END ROUND ONE -->
          <div class="round round-two"/>
        </div>

        <div class="champion"/>
        <div class="split split-two">
          <div class="round round-two"/>
          <div class="round round-one"/>
        </div>
      </div>
      <h4>Losers Bracket</h4>
      <div class="container">
        <div class="split split-one">
          <div class="round round-one">
            <div class="round-details"><br/><span class="date">Games 5 and 6</span></div>
            <Matchup :players="game5.players" :game.sync="game5"
              @matchOver="updateNextMatch(game5, game6, game10, game9, 0)"/>
            <Matchup :players="game6.players" :game.sync="game6"
              @matchOver="updateNextMatch(game6, game7, game10, game9, 1)"/>
          </div>  <!-- END ROUND ONE -->

          <div class="round round-two">
            <div class="round-details">5th Place<br/><span class="date">Game 10</span></div>
            <Matchup :players="game10.players" :game.sync="game10"
              @matchOver="updateNextMatch(game10, game11, null, null, 0)"/>
          </div>  <!-- END ROUND TWO -->
        </div>

        <div class="champion"/>

        <div class="split split-two">
          <div class="round round-two">
            <div class="round-details">7th Place<br/><span class="date">Game 9</span></div>
            <Matchup :players="game9.players" :game.sync="game9"
              @matchOver="updateNextMatch(game9, game10, null, null, 0)"/>
          </div>  <!-- END ROUND TWO -->

          <div class="round round-one">
          </div>  <!-- END ROUND ONE -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapMutations, createNamespacedHelpers } from 'vuex';
import Header from '../Header.vue';
import Matchup from '../1v1/Matchup.vue';

const { mapState } = createNamespacedHelpers('results');

export default {
  name: 'SoloBracket',
  components: {
    Header,
    Matchup,
  },
  data() {
    return {
      games: [
        {
          id: 1,
          players: [
            { name: '1 Seed', seed: 1, wins: 0 },
            { name: '8 Seed', seed: 8, wins: 0 },
          ],
          winner: {},
          loser: {},
          isOver: false,
          isCurrent: true,
        },
        {
          id: 2,
          players: [
            { name: '3 Seed', seed: 3, wins: 0 },
            { name: '4 Seed', seed: 4, wins: 0 },
          ],
          winner: {},
          loser: {},
          isOver: false,
          isCurrent: false,
        },
        {
          id: 3,
          players: [
            { name: '3 Seed', seed: 3, wins: 0 },
            { name: '6 Seed', seed: 6, wins: 0 },
          ],
          winner: {},
          loser: {},
          isOver: false,
          isCurrent: false,
        },
        {
          id: 4,
          players: [
            { name: '2 Seed', seed: 2, wins: 0 },
            { name: '7 Seed', seed: 7, wins: 0 },
          ],
          winner: {},
          loser: {},
          isOver: false,
          isCurrent: false,
        },
        {
          id: 5,
          players: [
            { name: 'Loser Game 1', seed: 0, wins: 0 },
            { name: 'Loser Game 2', seed: 0, wins: 0 },
          ],
          winner: {},
          loser: {},
          isOver: false,
          isCurrent: false,
        },
        {
          id: 6,
          players: [
            { name: 'Loser Game 3', seed: 0, wins: 0 },
            { name: 'Loser Game 4', seed: 0, wins: 0 },
          ],
          winner: {},
          loser: {},
          isOver: false,
          isCurrent: false,
        },
        {
          id: 7,
          players: [
            { name: 'Winner Game 1', seed: 0, wins: 0 },
            { name: 'Winner Game 2', seed: 0, wins: 0 },
          ],
          winner: {},
          loser: {},
          isOver: false,
          isCurrent: false,
        },
        {
          id: 8,
          players: [
            { name: 'Winner Game 3', seed: 0, wins: 0 },
            { name: 'Winner Game 4', seed: 0, wins: 0 },
          ],
          winner: {},
          loser: {},
          isOver: false,
          isCurrent: false,
        },
        {
          id: 9,
          players: [
            { name: 'Loser Game 5', seed: 0, wins: 0 },
            { name: 'Loser Game 6', seed: 0, wins: 0 },
          ],
          winner: {},
          loser: {},
          isOver: false,
          isCurrent: false,
        },
        {
          id: 10,
          players: [
            { name: 'Winner Game 5', seed: 0, wins: 0 },
            { name: 'Winner Game 6', seed: 0, wins: 0 },
          ],
          winner: {},
          loser: {},
          isOver: false,
          isCurrent: false,
        },
        {
          id: 11,
          players: [
            { name: 'Loser Game 7', seed: 0, wins: 0 },
            { name: 'Loser Game 8', seed: 0, wins: 0 },
          ],
          winner: {},
          loser: {},
          isOver: false,
          isCurrent: false,
        },
        {
          id: 12,
          players: [
            { name: 'Winner Game 7', seed: 0, wins: 0 },
            { name: 'Winner Game 8', seed: 0, wins: 0 },
          ],
          winner: {},
          loser: {},
          isOver: false,
          isCurrent: false,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      players: (state) => state.one_vs_one.seeding,
    }),
    game1Players() {
      return this.players.length > 0
        ? [{ ...this.players[0], wins: 0, seed: 1 }, { ...this.players[7], wins: 0, seed: 8 }]
        : this.game1.players;
    },
    game2Players() {
      return this.players.length > 0
        ? [{ ...this.players[3], wins: 0, seed: 4 }, { ...this.players[4], wins: 0, seed: 5 }]
        : this.game2.players;
    },
    game3Players() {
      return this.players.length > 0
        ? [{ ...this.players[2], wins: 0, seed: 3 }, { ...this.players[5], wins: 0, seed: 6 }]
        : this.game3.players;
    },
    game4Players() {
      return this.players.length > 0
        ? [{ ...this.players[1], wins: 0, seed: 2 }, { ...this.players[6], wins: 0, seed: 7 }]
        : this.game4.players;
    },
    game1() { return this.games[0]; },
    game2() { return this.games[1]; },
    game3() { return this.games[2]; },
    game4() { return this.games[3]; },
    game5() { return this.games[4]; },
    game6() { return this.games[5]; },
    game7() { return this.games[6]; },
    game8() { return this.games[7]; },
    game9() { return this.games[8]; },
    game10() { return this.games[9]; },
    game11() { return this.games[10]; },
    game12() { return this.games[11]; },
  },
  methods: {
    ...mapMutations(['update1v1Scores']),
    ...mapMutations('results', ['set1v1Results']),
    updateNextMatch(currentGame, nextGame, winnerGame, loserGame, index) {
      if (winnerGame) {
        const winner = { ...currentGame.winner };
        winner.wins = 0;

        const loser = { ...currentGame.loser };
        loser.wins = 0;

        winnerGame.players.splice(index, 1, winner);
        loserGame.players.splice(index, 1, loser);
      }

      const current = this.games.find((x) => x.id === nextGame.id);
      current.isOver = true;
      current.isCurrent = false;

      if (nextGame) {
        const next = this.games.find((x) => x.id === nextGame.id);
        next.isCurrent = true;
      } else {
        const results = [
          this.game9.loser,
          this.game9.winner,
          this.game10.loser,
          this.game10.winner,
          this.game11.loser,
          this.game11.winner,
          this.game12.loser,
          this.game12.winner,
        ];
        this.set1v1Results(results);
        this.update1v1Scores(results);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#bracket {
  overflow: hidden;
  background-color: #e1e1e1;
  background-color: rgba(225,225,225,0.9);
  padding-top: 20px;
  font-size: 12px;
  padding: 40px 0;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  display: block;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
}
.split {
  display: block;
  float: left;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  width: 42%;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  flex-direction: row;
}
.champion {
  float: left;
  display: block;
  width: 16%;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-align-self: center;
  align-self: center;
  margin-top: -15px;
  text-align: center;
  padding: 230px 0\9;
}
.champion i {color: #a0a6a8; font-size: 45px; padding: 10px 0; }
.round {
  display:block;
  float:left;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 95%;
  width: 30.8333%\9;
}
.split-one .round { margin: 0 2.5% 0 0; }
.split-two .round { margin: 0 0 0 2.5%; }
.round-two .matchup { margin:0; height: 60px; padding: 40px 0; }
.round-three .matchup { margin:0; height: 60px; padding: 130px 0; }
.round-details {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 13px;
  color: #2C7399;
  text-transform: uppercase;
  text-align: center;
  height: 40px;
}
.champion li, .round li { background-color: #fff;box-shadow: none; opacity: 0.45;}
.vote-options { display: block;height: 52px;}
.share .container { margin: 0 auto; text-align: center;}
.share-icon { font-size: 24px; color: #fff;padding: 25px;}
.share-wrap { max-width: 1100px; text-align: center; margin: 60px auto;}
.final { margin-top: 4.5em }

@-webkit-keyframes pulse {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  50% {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes pulse {
  0% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }

  50% {
    -webkit-transform: scale(1.3);
    -ms-transform: scale(1.3);
    transform: scale(1.3);
  }

  100% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
}

.share-icon { color: #fff; opacity: 0.35; }
.share-icon:hover { opacity:1;  -webkit-animation: pulse 0.5s; animation: pulse 0.5s; }
.date { font-size: 10px; letter-spacing: 2px; font-family: 'Istok Web', sans-serif; color: #3F915F; }


@media screen and (min-width: 981px) and (max-width: 1099px) {
  .container { margin: 0 1%; }
  .champion { width: 14%; }
  .split { width:43%; }
  .split-one .vote-box { margin-left: 138px; }
  .hero p.intro { font-size: 28px; }
  .hero p.year { margin: 5px 0 10px; }

}

@media screen and (max-width: 980px) {
  .container { -webkit-flex-direction: column; -moz-flex-direction: column; flex-direction: column; }
  .split, .champion { width: 90%; margin: 35px 5%; }
  .champion { -webkit-box-ordinal-group: 3; -moz-box-ordinal-group: 3; -ms-flex-order: 3; -webkit-order: 3; order: 3; }
  .split { border-bottom: 1px solid #b6b6b6; padding-bottom: 20px; }
  .hero p.intro { font-size: 24px; }
  .hero h1 { font-size: 3em; margin: 15px 0; }
  .hero p { font-size: 1em; }
}


@media screen and (max-width: 400px) {
  .split { width: 95%; margin: 25px 2.5%; }
  .round { width: 21%; }
  .current { -webkit-flex-grow: 1; -moz-flex-grow: 1; flex-grow: 1; }
  .hero h1 { font-size: 2.15em; letter-spacing: 0; margin: 0; }
  .hero p.intro { font-size: 1.15em; margin-bottom: -10px;}
  .round-details { font-size: 90%;}
  .hero-wrap { padding: 2.5em;}
  .hero p.year { margin: 5px 0 10px; font-size: 18px;}

}
</style>
