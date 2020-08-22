<template>
  <div>
    <Header title="2 Guys 1 Cup"
      :prev="online ? 'pods' : '4v4'"
      :next="online ? '1v1' : 'pods'"
      :disabled="!two_vs_two_locked"/>
    <div class="row">
      <div class="col-2">
        <h3>Seeding</h3>
        <TwoVsTwoSeeding />
      </div>
      <div class="col">
        <RoundRobin v-if="online && teams.length === 0"/>
        <Bracket :teams="teams" :disabled="two_vs_two_locked" v-if="teams.length > 0"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, createNamespacedHelpers } from 'vuex';
import Header from '../Header.vue';
import TwoVsTwoSeeding from '../2v2/2v2v2v2.vue';
import RoundRobin from '../2v2/RoundRobin.vue';
import Bracket from '../2v2/Bracket.vue';

const { mapGetters } = createNamespacedHelpers('results');

export default {
  name: 'TwoVsTwo',
  components: {
    Header,
    TwoVsTwoSeeding,
    RoundRobin,
    Bracket,
  },
  computed: {
    ...mapState({
      teams: (state) => state.results.two_vs_two.seeding,
      online: (state) => state.online,
    }),
    ...mapGetters(['two_vs_two_locked']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
