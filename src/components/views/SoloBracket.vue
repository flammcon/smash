<template>
  <div>
    <Header title="Solo Cup" :prev="online ? '2v2' : 'pods'"/>
    <section id="bracket">
      <h4>Winners Bracket</h4>
      <div class="container">
        <div class="split split-one">
          <div class="round round-one">
            <div class="round-details">Round 1<br/><span class="date">Games 1 and 2</span></div>
            <Matchup :gameId="1" @matchOver="updateNextMatch(1, 2, 7, 5, 0)"/>
            <Matchup :gameId="2" @matchOver="updateNextMatch(2, 3, 7, 5, 1)"/>
          </div>  <!-- END ROUND ONE -->

          <div class="round round-two">
            <div class="round-details">Round 2<br/><span class="date">Game 7</span></div>
            <Matchup :gameId="7" @matchOver="updateNextMatch(7, 8, 12, 11, 0)"/>
          </div>  <!-- END ROUND TWO -->
        </div>

        <div class="champion">
          <div class="final">
            <i class="fa fa-trophy"></i>
            <div class="round-details">Championship<br/><span class="date">Game 12</span></div>
            <Matchup :gameId="12" @matchOver="updateNextMatch(12, null, null, null, 0)"/>
          </div>
        </div>

        <div class="split split-two">
          <div class="round round-two">
            <div class="round-details">Round 2<br/><span class="date">Game 8</span></div>
            <Matchup :gameId="8" @matchOver="updateNextMatch(8, 9, 12, 11, 1)" reverse/>
          </div>  <!-- END ROUND TWO -->

          <div class="round round-one">
            <div class="round-details">Round 1<br/><span class="date">Games 3 and 4</span></div>
            <Matchup :gameId="3" @matchOver="updateNextMatch(3, 4, 8, 6, 0)" reverse/>
            <Matchup :gameId="4" @matchOver="updateNextMatch(4, 5, 8, 6, 1)" reverse/>
          </div>  <!-- END ROUND ONE -->
        </div>
      </div>
      <div class="container">
        <div class="split split-one third">
          <div class="round round-one">
            <div class="round-details">3rd Place<br/><span class="date">Game 11</span></div>
            <Matchup :gameId="11" @matchOver="updateNextMatch(11, 12, null, null, 0)"/>
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
            <Matchup :gameId="5" @matchOver="updateNextMatch(5, 6, 10, 9, 0)"/>
            <Matchup :gameId="6" @matchOver="updateNextMatch(6, 7, 10, 9, 1)"/>
          </div>  <!-- END ROUND ONE -->

          <div class="round round-two">
            <div class="round-details">5th Place<br/><span class="date">Game 10</span></div>
            <Matchup :gameId="10" @matchOver="updateNextMatch(10, 11, null, null, 0)"/>
          </div>  <!-- END ROUND TWO -->
        </div>

        <div class="champion"/>

        <div class="split split-two">
          <div class="round round-two">
            <div class="round-details">7th Place<br/><span class="date">Game 9</span></div>
            <Matchup :gameId="9" @matchOver="updateNextMatch(9, 10, null, null, 0)"/>
          </div>  <!-- END ROUND TWO -->

          <div class="round round-one">
          </div>  <!-- END ROUND ONE -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations, createNamespacedHelpers } from 'vuex';
import Header from '../Header.vue';
import Matchup from '../1v1/Matchup.vue';

const { mapGetters } = createNamespacedHelpers('results');

export default {
  name: 'SoloBracket',
  components: {
    Header,
    Matchup,
  },
  computed: {
    ...mapState({
      games: (state) => state.results.one_vs_one.games,
      online: (state) => state.online,
    }),
  },
  methods: {
    ...mapGetters(['gameById']),
    ...mapMutations(['update1v1Scores']),
    ...mapMutations('results', ['set1v1Results']),
    updateNextMatch(currentId, nextId, winnerId, loserId, index) {
      const currentGame = this.gameById()(currentId);
      const winnerGame = this.gameById()(winnerId);
      const loserGame = this.gameById()(loserId);

      if (winnerGame) {
        const winner = { ...currentGame.winner };
        winner.wins = 0;

        const loser = { ...currentGame.loser };
        loser.wins = 0;

        winnerGame.teams.splice(index, 1, winner);
        loserGame.teams.splice(index, 1, loser);
      }

      currentGame.completed = true;
      currentGame.current = false;

      if (nextId) {
        const nextGame = this.gameById()(nextId);
        nextGame.current = true;
      } else {
        const game9 = this.gameById()(9);
        const game10 = this.gameById()(10);
        const game11 = this.gameById()(11);
        const game12 = this.gameById()(12);

        const results = [
          game9.loser,
          game9.winner,
          game10.loser,
          game10.winner,
          game11.loser,
          game11.winner,
          game12.loser,
          game12.winner,
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
