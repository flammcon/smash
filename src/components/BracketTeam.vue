<template>
  <ul class="team">
    <li class="player player-top">
      <span v-bind:class="[reverse ? 'right' : 'left']">{{seed}}</span>
      {{team.player1.name}}
      <span v-bind:class="[reverse ? 'left' : 'right']"><ScoreDot :fill="wins > 0"/></span>
    </li>
    <li class="player player-bottom">
      <span v-bind:class="[reverse ? 'right' : 'left']">{{seed}}</span>
      {{team.player2.name}}
      <span v-bind:class="[reverse ? 'left' : 'right']"><ScoreDot :fill="wins > 1"/></span>
    </li>
  </ul>
</template>

<script>
import ScoreDot from './ScoreDot'

export default {
  name: 'BracketTeam',
  components: {
    ScoreDot
  },
  props: {
    seed: String,
    team: Object,
    wins: Number,
    reverse: Boolean
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .round {display:block;float:left;display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;width:95%;width:30.8333%\9;} */
/* .split-one .round {margin: 0 2.5% 0 0;} */
/* .split-two .round {margin: 0 0 0 2.5%;} */
.team {margin:0;width: 100%;padding: 10px 0;height:60px;-webkit-transition: all 0.2s;transition: all 0.2s;}
.team:hover .player {background-color: rgba(255, 255, 255, 0.7)}
.right {font-size: 11px;text-transform: uppercase;float: right;color: #2C7399;font-weight: bold;font-family: 'Roboto Condensed', sans-serif;position: absolute;right: 5px;}
.left {font-size: 11px;text-transform: uppercase;float: left;color: #2C7399;font-weight: bold;font-family: 'Roboto Condensed', sans-serif;position: absolute;left: 5px;}
.player {padding: 0 5px;height: 25px; line-height: 25px;white-space: nowrap; overflow: hidden;position: relative;}
.round-two .team {margin:0; height: 60px;padding: 40px 0;}
.round-three .team {margin:0; height: 60px; padding: 130px 0;}
/* .round-details {font-family: 'Roboto Condensed', sans-serif; font-size: 13px; color: #2C7399;text-transform: uppercase;text-align: center;height: 40px;} */
.champion li, .round li {background-color: #fff;box-shadow: none; opacity: 0.45;}
.current li {opacity: 1;}

</style>
