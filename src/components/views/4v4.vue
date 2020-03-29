<template>
  <div class="container-fluid">
    <Header title="Red vs Blue" prev="draft" next="2v2" :disabled="!four_vs_four_locked()"/>
    <div class="row">
      <div class="col-3">
        <h4>Bloodbath</h4>
        <Bloodbath/>
      </div>
      <div class="col" v-if="red.length > 0">
        <Team
          name="Red"
          :wins.sync="red_wins"
          styling="danger"
          :players="red"
          color="indianred"
          :disabled="four_vs_four_locked()"
          @won="gameOver(red)"
        />
        <Team
          name="Blue"
          :wins.sync="blue_wins"
          styling="primary"
          :players="blue"
          color="dodgerblue"
          :disabled="four_vs_four_locked()"
          @won="gameOver(blue)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, createNamespacedHelpers } from 'vuex';
import Header from '../Header.vue';
import Bloodbath from '../4v4/Bloodbath.vue';
import Team from '../4v4/Team.vue';

const { mapState, mapGetters } = createNamespacedHelpers('results');

export default {
  name: 'FourVsFour',
  components: {
    Header,
    Bloodbath,
    Team,
  },
  computed: {
    ...mapState({
      players: (state) => state.bloodbath,
    }),
    red_wins: {
      get() { return this.get_red_wins(); },
      set(value) { this.incrementRedWins(value); },
    },
    blue_wins: {
      get() { return this.get_blue_wins(); },
      set(value) { this.incrementBlueWins(value); },
    },
    red() {
      return this.players.filter((player, index) => index === 0 || index === 3 || index === 4 || index === 7);
    },
    blue() {
      return this.players.filter((player, index) => index === 1 || index === 2 || index === 5 || index === 6);
    },
  },
  methods: {
    ...mapMutations(['update4v4Scores']),
    ...mapMutations('results', ['incrementRedWins', 'incrementBlueWins']),
    ...mapGetters(['get_red_wins', 'get_blue_wins', 'four_vs_four_locked']),
    gameOver(winner) {
      this.update4v4Scores(winner);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
