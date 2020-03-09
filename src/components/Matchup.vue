<template>
  <ul v-bind:class="[{current: current}, 'matchup']">
    <li class="team team-top">
      <BracketPlayer :player="players[0]" :reverse="reverse"/>
    <li class="team team-bottom">
      <BracketPlayer :player="players[1]" :reverse="reverse"/>
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
    current: Boolean,
    players: Object,
    reverse: Boolean
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.matchup {margin:0;width: 100%;padding: 10px 0;height:60px;-webkit-transition: all 0.2s;transition: all 0.2s;}
.team:hover .player {background-color: rgba(255, 255, 255, 0.7)}
.team {padding: 0 5px;margin: 3px 0;height: 25px; line-height: 25px;white-space: nowrap; overflow: hidden;position: relative;}
.champion li, .round li {background-color: #fff;box-shadow: none; opacity: 0.45;}
.current li {opacity: 1;}
.current li.team {background-color: #fff;box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);opacity: 1;}
</style>
