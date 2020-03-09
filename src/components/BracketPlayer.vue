<template>
  <div>
    <span v-bind:class="[reverse ? 'right' : 'left']">{{player.seed === 0 ? '' : player.seed}}</span>
    {{ player.name }}
    <span v-bind:class="[reverse ? 'left' : 'right']">
      <ScoreDot :fill="reverse ? player.wins > 0 : player.wins > 1"/>
      <ScoreDot style="margin-left: 1px" :fill="reverse ? player.wins > 1 : player.wins > 0"/>
    </span>
  </div>
</template>

<script>
import ScoreDot from './ScoreDot'

export default {
  name: 'BracketPlayer',
  components: {
    ScoreDot
  },
  props: {
    current: Boolean,
    player: Object,
    reverse: Boolean,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.matchup {margin:0;width: 100%;padding: 10px 0;height:60px;-webkit-transition: all 0.2s;transition: all 0.2s;}
.team:hover .player {background-color: rgba(255, 255, 255, 0.7)}
.right {font-size: 11px;text-transform: uppercase;float: right;color: #2C7399;font-weight: bold;font-family: 'Roboto Condensed', sans-serif;position: absolute;right: 5px;}
.left {font-size: 11px;text-transform: uppercase;float: left;color: #2C7399;font-weight: bold;font-family: 'Roboto Condensed', sans-serif;position: absolute;left: 5px;}
.team {padding: 0 5px;margin: 3px 0;height: 25px; line-height: 25px;white-space: nowrap; overflow: hidden;position: relative;}
.champion li, .round li {background-color: #fff;box-shadow: none; opacity: 0.45;}
.current li {opacity: 1;}
.current li.team {background-color: #fff;box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);opacity: 1;}
</style>
