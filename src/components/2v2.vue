<template>
  <div class="row">
    <div class="col-2">
      <h3>Bloodbath</h3>
      <TwoVsTwoSeeding/>
    </div>
    <div class="col" v-if="teams.length > 0">
      <Bracket/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TwoVsTwoSeeding from './2v2v2v2';
import Bracket from './Bracket';

export default {
  name: 'TwoVsTwo',
  components: {
    TwoVsTwoSeeding,
    Bracket
  },
  computed: {
    ...mapState({
      teams: state => state.results.twoVsTwoSeeding,
    }),
  },
  methods: {
    gameOver: function() { 
      this.$store.commit('update2v2Scores', this.teams);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
