<template>
  <div class="container-fluid">
    <Header title="Red vs Blue" prev="draft" next="2v2" :disabled="!isGameOver"/>
    <div class="row">
      <div class="col-3">
        <h4>Bloodbath</h4>
        <Bloodbath/>
      </div>
      <div class="col" v-if="red.length > 0">
        <Team
          name="Red"
          :wins.sync="redWins"
          styling="danger"
          :players="red"
          color="indianred"
          :disabled="isGameOver"
          @won="gameOver(red)"
        />
        <Team
          name="Blue"
          :wins.sync="blueWins"
          styling="primary"
          :players="blue"
          color="dodgerblue"
          :disabled="isGameOver"
          @won="gameOver(blue)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import Header from '../Header.vue';
import Bloodbath from '../4v4/Bloodbath.vue';
import Team from '../4v4/Team.vue';

export default {
  name: 'FourVsFour',
  components: {
    Header,
    Bloodbath,
    Team,
  },
  computed: {
    ...mapState({
      players: (state) => state.results.bloodbath,
      isGameOver: (state) => state.completed.fourVsFour,
    }),
    redWins: {
      get() { return this.getRedWins(); },
      set(value) { this.incrementRedWins(value); },
    },
    blueWins: {
      get() { return this.getBlueWins(); },
      set(value) { this.incrementBlueWins(value); },
    },
    red() {
      return this.players.filter((player) => {
        const rank = player.results.bloodbath;
        return rank === 1 || rank === 4 || rank === 5 || rank === 8;
      });
    },
    blue() {
      return this.players.filter((player) => {
        const rank = player.results.bloodbath;
        return rank === 2 || rank === 3 || rank === 6 || rank === 7;
      });
    },
  },
  methods: {
    ...mapMutations(['update4v4Scores', 'incrementRedWins', 'incrementBlueWins']),
    ...mapGetters(['getRedWins', 'getBlueWins']),
    gameOver(winner) {
      this.update4v4Scores(winner);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
