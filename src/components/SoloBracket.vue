<template>
  <section id="bracket">
    <h4>Winners Bracket</h4>
    <div class="container">
      <div class="split split-one">
        <div class="round round-one">
          <div class="round-details">Round 1<br/><span class="date">Games 1 and 2</span></div>
          <Matchup :players="game1.players" :current="game1.isCurrent"/>
          <Matchup :players="game2.players" :current="game2.isCurrent"/>                         
        </div>  <!-- END ROUND ONE -->

        <div class="round round-two">
          <div class="round-details">Round 2<br/><span class="date">Game 7</span></div>      
          <Matchup :players="game7.players" :current="game7.isCurrent"/>                                  
        </div>  <!-- END ROUND TWO -->  
      </div> 

      <div class="champion">
        <div class="final">
          <i class="fa fa-trophy"></i>
          <div class="round-details">Championship<br/><span class="date">Game 12</span></div>    
          <Matchup :players="game12.players" :current="game12.isCurrent"/>      
        </div>
      </div>

      <div class="split split-two"> 
        <div class="round round-two">
          <div class="round-details">Round 2<br/><span class="date">Game 8</span></div>                  
          <Matchup :players="game8.players" :current="game8.isCurrent" reverse/>                          
        </div>  <!-- END ROUND TWO -->

        <div class="round round-one">
          <div class="round-details">Round 1<br/><span class="date">Games 3 and 4</span></div>
          <Matchup :players="game3.players" :current="game3.isCurrent" reverse/>
          <Matchup :players="game4.players" :current="game4.isCurrent" reverse/>                          
        </div>  <!-- END ROUND ONE -->                          
      </div>
    </div>
    <div class="container">
      <div class="split split-one">
        <div class="round round-one">
          <div class="round-details">3rd Place<br/><span class="date">Games 11</span></div>
          <Matchup :players="game11.players" :current="game11.isCurrent"/>                                 
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
          <Matchup :players="game5.players" :current="game5.isCurrent"/>  
          <Matchup :players="game5.players" :current="game5.isCurrent"/>                                  
        </div>  <!-- END ROUND ONE -->

        <div class="round round-two">
          <div class="round-details">5th Place<br/><span class="date">Game 10</span></div>       
          <Matchup :players="game10.players" :current="game10.isCurrent"/>                                  
        </div>  <!-- END ROUND TWO -->  
      </div> 

      <div class="champion"/>

      <div class="split split-two"> 
        <div class="round round-two">
          <div class="round-details">7th Place<br/><span class="date">Game 9</span></div>
          <Matchup :players="game9.players" :current="game9.isCurrent"/>  
        </div>  <!-- END ROUND TWO -->

        <div class="round round-one">                         
        </div>  <!-- END ROUND ONE -->                          
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Matchup from './Matchup';

export default {
  name: 'SoloBracket',
  components: {
    Matchup
  },
    data() {
    return {
      game1: {
        players: [
          { name: "1 Seed", seed: 1, wins: 0 },
          { name: "8 Seed", seed: 8, wins: 0 }
        ],
        winner: {},
        loser: {},
        isOver: false,
        isCurrent: true
      },
      game2: {
        players: [
          { name: "3 Seed", seed: 3, wins: 0 },
          { name: "4 Seed", seed: 4, wins: 0 }
        ],
        winner: {},
        loser: {},
        isOver: false,
        isCurrent: false
      },
      game3: {
        players: [
          { name: "3 Seed", seed: 3, wins: 0 },
          { name: "6 Seed", seed: 6, wins: 0 }
        ],
        winner: {},
        loser: {},
        isOver: false,
        isCurrent: false
      },
      game4: {
        players: [
          { name: "2 Seed", seed: 2, wins: 0 },
          { name: "7 Seed", seed: 7, wins: 0 }
        ],
        winner: {},
        loser: {},
        isOver: false,
        isCurrent: false
      },
      game5: {
        players: [
          { name: "Loser Game 1", seed: 0, wins: 0 },
          { name: "Loser Game 2", seed: 0, wins: 0 }
        ],
        winner: {},
        loser: {},
        isOver: false,
        isCurrent: false
      },
      game6: {
        players: [
          { name: "Loser Game 3", seed: 0, wins: 0 },
          { name: "Loser Game 4", seed: 0, wins: 0 }
        ],
        winner: {},
        loser: {},
        isOver: false,
        isCurrent: false
      },      
      game7: {
        players: [
          { name: "Winner Game 1", seed: 0, wins: 0 },
          { name: "Winner Game 2", seed: 0, wins: 0 }
        ],
        winner: {},
        loser: {},
        isOver: false,
        isCurrent: false
      },
      game8: {
        players: [
          { name: "Winner Game 3", seed: 0, wins: 0 },
          { name: "Winner Game 4", seed: 0, wins: 0 }
        ],
        winner: {},
        loser: {},
        isOver: false,
        isCurrent: false
      },
      game9: {
        players: [
          { name: "Loser Game 5", seed: 0, wins: 0 },
          { name: "Loser Game 6", seed: 0, wins: 0 }
        ],
        winner: {},
        loser: {},
        isOver: false,
        isCurrent: false
      },
      game10: {
        players: [
          { name: "Winner Game 5", seed: 0, wins: 0 },
          { name: "Winner Game 6", seed: 0, wins: 0 }
        ],
        winner: {},
        loser: {},
        isOver: false,
        isCurrent: false
      },      
      game11: {
        players: [
          { name: "Loser Game 7", seed: 0, wins: 0 },
          { name: "Loser Game 8", seed: 0, wins: 0 }
        ],
        winner: {},
        loser: {},
        isOver: false,
        isCurrent: false
      },
      game12: {
        players: [
          { name: "Winner Game 7", seed: 0, wins: 0 },
          { name: "Winner Game 8", seed: 0, wins: 0 }
        ],
        winner: {},
        loser: {},
        isOver: false,
        isCurrent: false
      }
    }
  },
  computed: {
    ...mapState({
      players: state => state.results.oneVsOneSeeding,
    }),
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
.matchup {margin:0;width: 100%;padding: 10px 0;height:60px;-webkit-transition: all 0.2s;transition: all 0.2s;}
.score {font-size: 11px;text-transform: uppercase;float: right;color: #2C7399;font-weight: bold;font-family: 'Roboto Condensed', sans-serif;position: absolute;right: 5px;}
.team {padding: 0 5px;margin: 3px 0;height: 25px; line-height: 25px;white-space: nowrap; overflow: hidden;position: relative;}
.round-two .matchup {margin:0; height: 60px;padding: 40px 0;}
.round-three .matchup {margin:0; height: 60px; padding: 130px 0;}
.round-details {font-family: 'Roboto Condensed', sans-serif; font-size: 13px; color: #2C7399;text-transform: uppercase;text-align: center;height: 40px;}
.champion li, .round li {background-color: #fff;box-shadow: none; opacity: 0.45;}
.current li {opacity: 1;}
.current li.team {background-color: #fff;box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);opacity: 1;}
.vote-options {display: block;height: 52px;}
.share .container {margin: 0 auto; text-align: center;}
.share-icon {font-size: 24px; color: #fff;padding: 25px;}
.share-wrap {max-width: 1100px; text-align: center; margin: 60px auto;}
.final {margin-top: 4.5em}

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
