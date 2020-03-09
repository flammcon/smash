<template>
  <section id="bracket">
    <h4>Winners Bracket</h4>
    <div class="container">
      <div class="split split-one">
        <div v-bind:class="[{current: game1.isCurrent || game1.isOver}, 'round round-one']">
          <div class="round-details"><br/><span class="date">Game 1</span></div> 
          <BracketTeam v-for="team in game1.teams" :key="`game1-team${team.id}`" 
            :seed="`${team.id}`" :team="team" @click.native="addWin(game1, team)"/>
        </div> 
        <!-- END ROUND ONE -->

        <div v-bind:class="[{current: game4.isCurrent || game4.isOver}, 'round round-two']">
          <div class="round-details"><br/></div>
          <BracketTeam :seed="`${game4.teams[0].id}`" :team="game4.teams[0]" @click.native="addWin(game4, game4.teams[0])"/>
        </div> 
        <!-- END ROUND TWO -->  
      </div> 

      <div class="champion">
        <div v-bind:class="[{current: game4.isOver}, 'final']">
          <i class="fa fa-trophy"></i>
          <div class="round-details">Champions<br/><span class="date">Game 4</span></div>    
          <ul class="team championship">
            <li class="player player-top">{{game4.winner.player1 ? game4.winner.player1.name : "Winner Game 4"}}<span class="vote-count">&nbsp;</span></li>
            <li class="player player-bottom">{{game4.winner.player2 ? game4.winner.player2.name : "Winner Game 4"}}<span class="vote-count">&nbsp;</span></li>
          </ul>
        </div>
      </div>

      <div class="split split-two"> 
        <div v-bind:class="[{current: game4.isCurrent || game4.isOver}, 'round round-two']">
          <div class="round-details"><br/></div>
          <BracketTeam :seed="`${game4.teams[1].id}`" :team="game4.teams[1]" @click.native="addWin(game4, game4.teams[1])" reverse/>                   
        </div> 
        <!-- END ROUND TWO -->

        <div v-bind:class="[{current: game2.isCurrent || game2.isOver}, 'round round-one']">
          <div class="round-details"><br/><span class="date">Game 2</span></div>
          <BracketTeam v-for="team in game2.teams" :key="`game2-team${team.id}`" reverse
            :seed="`${team.id}`" :team="team" @click.native="addWin(game2, team)"/>                               
        </div>
        <!-- END ROUND ONE -->                          
      </div>
    </div>
    <h4>Losers Bracket</h4>
    <div class="container">
      <div class="split split-one">
        <div v-bind:class="[{current: game3.isCurrent || game3.isOver}, 'round round-one']">
          <div class="round-details"><br/><span class="date">Game 3</span></div>
          <BracketTeam v-for="(team, index) in game3.teams" :key="`game3-team${index}`" 
            :seed="`${team.id}`" :team="team" @click.native="addWin(game3, team)"/>
        </div>  <!-- END ROUND ONE -->

        <div v-bind:class="[{current: game3.isOver}, 'round round-two']">
          <div class="round-details">3rd Place<br/></div>     
          <ul class="team">
            <li class="player player-top">{{game3.winner.player1 ? game3.winner.player1.name : "Game 3 Winner"}}<span class="right">&nbsp;</span></li>
            <li class="player player-bottom">{{game3.winner.player2 ? game3.winner.player2.name : "Game 3 Winner"}}<span class="right">&nbsp;</span></li>
          </ul>                                     
        </div>  <!-- END ROUND TWO -->              
      </div>
    </div>
  </section>
</template>

<script>
//import { mapState } from 'vuex'
import BracketTeam from './BracketTeam'

export default {
  name: 'Bracket',
  components: {
    BracketTeam
  },
  props: {
    teams: Array
  },
  data() {
    return {
      game1: {
        teams: [ { ...this.teams[0], wins: 0 }, { ...this.teams[3], wins: 0 } ],
        winner: {},
        loser: {},
        isOver: false,
        isCurrent: true
      },
      game2: {
        teams: [ { ...this.teams[1], wins: 0 }, { ...this.teams[2], wins: 0 } ],
        winner: {},
        loser: {},
        isOver: false,
        isCurrent: false
      },
      game3: {
        teams: [
          { id: "", player1: { name: "Loser Game 1" }, player2: { name: "Loser Game 1" }, wins: 0 },
          { id: "", player1: { name: "Loser Game 2" }, player2: { name: "Loser Game 2" }, wins: 0 }
        ],
        winner: {},
        loser: {},
        isOver: false,
        isCurrent: false
      },
      game4: {
        teams: [
          { id: "", player1: { name: "Winner Game 1" }, player2: { name: "Winner Game 1" }, wins: 0 },
          { id: "", player1: { name: "Winner Game 2" }, player2: { name: "Winner Game 2" }, wins: 0 }
        ],
        winner: {},
        loser: {},
        isOver: false,
        isCurrent: false
      }
    }
  },
  watch:{
    'game1.isOver': function () {
      this.updateNextGame(this.game3, this.game1.loser, 0);
      this.updateNextGame(this.game4, this.game1.winner, 0);
      this.game1.isCurrent = false;
      this.game2.isCurrent = true;
    },
    'game2.isOver': function() {
      this.updateNextGame(this.game3, this.game2.loser, 1);
      this.updateNextGame(this.game4, this.game2.winner, 1);
      this.game2.isCurrent = false;
      this.game3.isCurrent = true;
    },
    'game3.isOver': function() {
      this.game3.isCurrent = false;
      this.game4.isCurrent = true;
    },
    'game4.isOver': function() {
      const results = [this.game4.winner, this.game4.loser, this.game3.winner, this.game3.loser];
      this.$store.commit('update2v2Scores', results);
    }
 },
  methods: {
    addWin: function(game, team) {
      if (!game.isOver && game.isCurrent) {
        team.wins++;
        if (team.wins === 2) {
          game.winner = {...team};
          game.loser = {...game.teams.find(x => x.id !== team.id)};
          game.isOver = true;
        }
      }
    },
    updateNextGame(game, team, index) {
      const updatedTeam = {...team};
      updatedTeam.wins = 0;
      game.teams.splice(index, 1, updatedTeam);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#bracket {overflow:hidden;background-color: #e1e1e1;background-color:rgba(225,225,225,0.9);padding-top: 20px;font-size: 12px;padding: 40px 0;}
.container {max-width: 1100px;margin: 0 auto;display:block;display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: -webkit-flex;display: flex;-webkit-flex-direction:row;flex-direction: row;}
.split {display:block;float:left;display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display:flex;width: 42%;-webkit-flex-direction:row;-moz-flex-direction:row;flex-direction:row;}
.champion {float:left;display:block;width: 16%;-webkit-flex-direction:row;flex-direction:row;-webkit-align-self:center;align-self:center;margin-top: -15px;text-align: center;padding: 230px 0\9;} 
.champion i {color: #a0a6a8; font-size: 45px;padding: 10px 0; }
.round {display:block;float:left;display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;width:95%;width:30.8333%\9;}
.split-one .round {margin: 0 2.5% 0 0;}
.split-two .round {margin: 0 0 0 2.5%;}
.team {margin:0;width: 100%;padding: 10px 0;height:60px;-webkit-transition: all 0.2s;transition: all 0.2s;}
.team:hover .player {background-color: rgba(255, 255, 255, 0.7)}
.right {font-size: 11px;text-transform: uppercase;float: right;color: #2C7399;font-weight: bold;font-family: 'Roboto Condensed', sans-serif;position: absolute;right: 5px;}
.left {font-size: 11px;text-transform: uppercase;float: left;color: #2C7399;font-weight: bold;font-family: 'Roboto Condensed', sans-serif;position: absolute;left: 5px;}
.player {padding: 0 5px;height: 25px; line-height: 25px;white-space: nowrap; overflow: hidden;position: relative;}
.round-two .team {margin:0; height: 60px;padding: 40px 0;}
.round-three .team {margin:0; height: 60px; padding: 130px 0;}
.round-details {font-family: 'Roboto Condensed', sans-serif; font-size: 13px; color: #2C7399;text-transform: uppercase;text-align: center;height: 40px;}
.champion li, .round li {background-color: #fff;box-shadow: none; opacity: 0.45;}
.current li {opacity: 1;}
.current li.player {background-color: #fff;box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);opacity: 1;}
.vote-options {display: block;height: 52px;}
.share .container {margin: 0 auto; text-align: center;}
.share-icon {font-size: 24px; color: #fff;padding: 25px;}
.share-wrap {max-width: 1100px; text-align: center; margin: 60px auto;}
.final {margin: 4.5em 0;}

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

.share-icon {color: #fff; opacity: 0.35; }
.share-icon:hover { opacity:1;  -webkit-animation: pulse 0.5s; animation: pulse 0.5s;}
.date {font-size: 10px; letter-spacing: 2px;font-family: 'Istok Web', sans-serif;color:#3F915F;}

@media screen and (min-width: 981px) and (max-width: 1099px) {
  .container {margin: 0 1%;}
  .champion {width: 14%;}
  .split {width:43%; }
  .split-one .vote-box {margin-left: 138px;}
  .hero p.intro {font-size: 28px;}
  .hero p.year {margin: 5px 0 10px;}

}

@media screen and (max-width: 980px) {
  .container {-webkit-flex-direction:column;-moz-flex-direction:column;flex-direction:column;}
  .split, .champion {width: 90%;margin: 35px 5%;}
  .champion {-webkit-box-ordinal-group:3;-moz-box-ordinal-group:3;-ms-flex-order:3;-webkit-order:3;order:3;}
  .split {border-bottom: 1px solid #b6b6b6; padding-bottom: 20px;}
  .hero p.intro {font-size: 24px;}
  .hero h1 {font-size: 3em; margin: 15px 0;}
  .hero p {font-size: 1em;}
}


@media screen and (max-width: 400px) {
  .split {width: 95%;margin: 25px 2.5%;}
  .round {width:21%;}
  .current {-webkit-flex-grow:1;-moz-flex-grow:1;flex-grow:1;}
  .hero h1 {font-size: 2.15em; letter-spacing: 0;margin:0; }
  .hero p.intro {font-size: 1.15em;margin-bottom: -10px;}
  .round-details {font-size: 90%;}
  .hero-wrap {padding: 2.5em;}
  .hero p.year {margin: 5px 0 10px; font-size: 18px;}

}
</style>
