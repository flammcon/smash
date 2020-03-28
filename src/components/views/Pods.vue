<template>
  <div>
    <Header
      title="Solo Cup Seeding"
      prev="2v2"
      next="1v1"
      :disabled="!locked"
      :prevDisabled="lockedPods > 0 && lockedPods < 8"
    />
    <div class="row">
      <div class="col-3">
        <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Player</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in sortedPlayers" :key="player.id" @click="incrementPodScore(player)">
              <th scope="row">{{index + 1}}</th>
              <td scope="row"><PlayerCard :player="player" :index="index"/></td>
              <th scope="row" v-bind:class="{tied: needsTieBreaker(player)}">{{player.results.podScore.toFixed(1)}}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col">
        <div class="row my-3">
          <div class="col"><Pod title="ODD" :pool="odds" @locked="lockedPods += 1" @unlocked="lockedPods--"/></div>
          <div class="col"><Pod title="EVEN" :pool="evens" @locked="lockedPods += 1" @unlocked="lockedPods--"/></div>
          <div class="col"><Pod title="RED" :pool="red" @locked="lockedPods += 1" @unlocked="lockedPods--"/></div>
          <div class="col"><Pod title="BLUE" :pool="blue" @locked="lockedPods += 1" @unlocked="lockedPods--"/></div>
        </div>
        <div class="row">
          <div class="col"><Pod title="TOP" :pool="top" @locked="lockedPods += 1" @unlocked="lockedPods--"/></div>
          <div class="col"><Pod title="BOTTOM" :pool="bottom" @locked="lockedPods += 1" @unlocked="lockedPods--"/></div>
          <div class="col"><Pod title="MIDDLE" :pool="middle" @locked="lockedPods += 1" @unlocked="lockedPods--"/></div>
          <div class="col"><Pod title="EDGES" :pool="edges" @locked="lockedPods += 1" @unlocked="lockedPods--"/></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Header from '../Header.vue';
import PlayerCard from '../PlayerCard.vue';
import Pod from '../1v1/Pod.vue';

export default {
  name: 'Pods',
  components: {
    Pod,
    PlayerCard,
    Header,
  },
  data() {
    return {
      lockedPods: 0,
      gameOver: false,
    };
  },
  computed: {
    ...mapState({
      players: (state) => state.results.bloodbath,
      locked: (state) => state.completed.pods,
    }),
    sortedPlayers() {
      return [...this.players].sort((a, b) => {
        if (a.results.podScore === 0) return 1;
        if (b.results.podScore === 0) return -1;

        return a.results.podScore < b.results.podScore ? -1 : 1;
      });
    },
    odds() {
      return this.players.filter((player, index) => index % 2 === 0);
    },
    evens() {
      return this.players.filter((player, index) => index % 2 !== 0);
    },
    red() {
      return this.players.filter((player, index) => index === 0 || index === 3 || index === 4 || index === 7);
    },
    blue() {
      return this.players.filter((player, index) => index === 1 || index === 2 || index === 5 || index === 6);
    },
    top() {
      return this.players.slice(0, 4);
    },
    bottom() {
      return this.players.slice(4);
    },
    middle() {
      return this.players.filter((player, index) => index > 1 && index < 6);
    },
    edges() {
      return this.players.filter((player, index) => index < 2 || index > 5);
    },
  },
  watch: {
    lockedPods(newValue, oldValue) {
      if (newValue === 8) {
        if (!this.hasDuplicatePodScores()) {
          this.gameOver = true;
        }
      } else if (oldValue === 8 && this.gameOver) {
        this.gameOver = false;
        this.set1v1SeedingResults([]);
      }
    },
    gameOver() {
      if (this.gameOver) {
        this.set1v1SeedingResults([...this.sortedPlayers]);
      }
    },
  },
  methods: {
    ...mapMutations(['set1v1SeedingResults']),
    ...mapActions(['updatePlayerPodScore']),
    hasDuplicatePodScores() {
      const podScores = this.sortedPlayers.map((player) => player.results.podScore);
      return podScores.some((item, index) => podScores.indexOf(item) !== index);
    },
    hasDuplicatePodScore(value) {
      const podScores = this.sortedPlayers.map((player) => player.results.podScore);
      const { podScore } = value.results;

      return podScores.indexOf(podScore) !== podScores.lastIndexOf(podScore);
    },
    incrementPodScore(player) {
      if (this.needsTieBreaker(player)) {
        this.updatePlayerPodScore({ id: player.id, score: -0.1 });
        if (!this.hasDuplicatePodScores()) {
          this.gameOver = true;
        }
      }
    },
    needsTieBreaker(player) {
      return this.lockedPods === 8 && this.hasDuplicatePodScore(player);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tied {
  background-color: lightcoral;
}
</style>
