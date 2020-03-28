<template>
  <div>
    <Header title="2 Guys 1 Cup" prev="4v4" next="pods" :disabled="!two_vs_two_locked"/>
    <div class="row">
      <div class="col-2">
        <h3>Seeding</h3>
        <TwoVsTwoSeeding/>
      </div>
      <div class="col" v-if="teams.length > 0">
        <Bracket :teams="teams" :disabled="two_vs_two_locked"/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../Header.vue';
import TwoVsTwoSeeding from '../2v2/2v2v2v2.vue';
import Bracket from '../2v2/Bracket.vue';

import { createNamespacedHelpers } from 'vuex';
const { mapState, mapGetters } = createNamespacedHelpers('results');

export default {
  name: 'TwoVsTwo',
  components: {
    Header,
    TwoVsTwoSeeding,
    Bracket,
  },
  computed: {
    ...mapState({
      teams: (state) => state.two_vs_two.seeding,
    }),
    ...mapGetters(['two_vs_two_locked']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
