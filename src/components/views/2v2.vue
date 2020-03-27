<template>
  <div>
    <Header title="2 Guys 1 Cup" prev="4v4" next="pods" :disabled="!gameOver"/>
    <div class="row">
      <div class="col-2">
        <h3>Seeding</h3>
        <TwoVsTwoSeeding/>
      </div>
      <div class="col" v-if="teams.length > 0">
        <Bracket :teams="teams" :disabled="gameOver"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '../Header'
import TwoVsTwoSeeding from '../2v2/2v2v2v2'
import Bracket from '../2v2/Bracket'

export default {
  name: 'TwoVsTwo',
  components: {
    Header,
    TwoVsTwoSeeding,
    Bracket,
  },
  computed: {
    ...mapState({
      teams: state => state.results.twoVsTwoSeeding,
      gameOver: state => state.completed.twoVsTwo,
    }),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
