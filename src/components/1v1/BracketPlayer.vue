<template>
  <div>
    <span :class="['base',reverse ? 'right' : 'left']">{{player.seed === 0 ? '' : player.seed}}</span>
    {{ player.name }}
    <span :class="['base', reverse ? 'left' : 'right']">
      <ScoreDot v-if="bestOfFive" style="margin-left: 1px" :fill="player.wins > 2" />
      <ScoreDot :fill="reverse ? player.wins > 0 : player.wins > 1"/>
      <ScoreDot style="margin-left: 1px" :fill="reverse ? player.wins > 1 : player.wins > 0"/>
    </span>
  </div>
</template>

<script>
import ScoreDot from '../ScoreDot.vue';

export default {
  name: 'BracketPlayer',
  components: {
    ScoreDot,
  },
  props: {
    player: Object,
    reverse: Boolean,
    bestOfFive: Boolean,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.base {
  font-size: 11px;
  text-transform: uppercase;
  font-weight: bold;
  color: #2C7399;
  font-family: 'Roboto Condensed', sans-serif;
  position: absolute;
}
.right { float: right; right: 5px; }
.left { float: left; left: 5px; }
</style>
