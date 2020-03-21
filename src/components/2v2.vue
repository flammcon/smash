<template>
  <div>
    <h2>2 Guys 1 Cup</h2>
    <div class="row">
      <div class="col-2">
        <h3>Seeding</h3>
        <TwoVsTwoSeeding/>
      </div>
      <div class="col" v-if="teams.length > 0">
        <Bracket :teams="teams"/>
      </div>
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
  mounted() {
    if (this.teams.length === 0) {
      this.$router.push('/');
    }
  },
  computed: {
    ...mapState({
      teams: state => state.results.twoVsTwoSeeding
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
