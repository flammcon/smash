<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="row pt-4">
          <div class="col">
            <TwoVsTwoMatch :id="1" :teamOne="teams[0]" :teamTwo="teams[1]" @gameOver="gameOver()"/>
            <TwoVsTwoMatch :id="3" :teamOne="teams[0]" :teamTwo="teams[2]" @gameOver="gameOver()"/>
            <TwoVsTwoMatch :id="5" :teamOne="teams[0]" :teamTwo="teams[3]" @gameOver="gameOver()"/>
          </div>
          <div class="col">
            <TwoVsTwoMatch :id="2" :teamOne="teams[2]" :teamTwo="teams[3]" @gameOver="gameOver()"/>
            <TwoVsTwoMatch :id="4" :teamOne="teams[1]" :teamTwo="teams[3]" @gameOver="gameOver()"/>
            <TwoVsTwoMatch :id="6" :teamOne="teams[1]" :teamTwo="teams[2]" @gameOver="gameOver()"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import TwoVsTwoMatch from '../2v2Match.vue';

const { mapState, mapMutations, mapActions } = createNamespacedHelpers('results');

export default {
  name: 'RoundRobin',
  components: {
    TwoVsTwoMatch,
  },
  data() {
    return {
      teams: [],
      locked: false,
    };
  },
  mounted() {
    if (this.seeding.length > 0) {
      this.teams = this.seeding;
      this.locked = true;
    } else {
      this.teams = [
        {
          id: 1, players: [this.players[0], this.players[7]], color: 'indianred',
        },
        {
          id: 2, players: [this.players[1], this.players[6]], color: 'dodgerblue',
        },
        {
          id: 3, players: [this.players[2], this.players[5]], color: 'yellowgreen',
        },
        {
          id: 4, players: [this.players[3], this.players[4]], color: 'orange',
        },
      ];
    }
  },
  computed: {
    ...mapState({
      players: (state) => state.bloodbath,
      seeding: (state) => state.two_vs_two.seeding,
    }),
  },
  methods: {
    ...mapMutations(['set2v2SeedingResults']),
    ...mapActions(['update2v2Round1Games']),
    updateRanks() {
      this.set2v2SeedingResults(this.teams);
      this.update2v2Round1Games();
      this.locked = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.team {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.disabled {
  color: lightgray;
}
</style>
