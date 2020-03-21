<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-3">
        <h2>Standings</h2>
        <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Player</th>
              <th scope="col">4v4</th>
              <th scope="col">2v2</th>
              <th scope="col">1v1</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in sortedPlayers" :key="player.id" @click="incrementTotalScore(player)">
              <th scope="row">{{index + 1}}</th>
              <td><PlayerCard :player="player" :index="index"/></td>
              <td>{{player.results.fourVsFour}}</td>
              <td>{{player.results.twoVsTwo}}</td>
              <td>{{player.results.oneVsOne}}</td>
              <td style="font-weight: bold">{{totalPoints(player.results).toFixed(1)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import PlayerCard from './components/PlayerCard'

export default {
  name: 'App',
  components: {
    PlayerCard,
  },
  created() {
    this.loadPlayers();
  },
  computed: {
    ...mapState(['players']),
    ...mapGetters(['sortedPlayerList']),
    sortedPlayers() {
      return [...this.sortedPlayerList].sort((a, b) => {
        const totalA = this.totalPoints(a.results);
        const totalB = this.totalPoints(b.results);
        return totalA > totalB ? -1 : 1;
      });
    }
  },
  methods: {
    ...mapActions(['loadPlayers']),
    totalPoints(results) {
      return results.fourVsFour + results.twoVsTwo + results.oneVsOne + results.totalAdj;
    },
    hasDuplicateTotalScore(player) {
      const totalScores = this.sortedPlayers.map(player => this.totalPoints(player.results));
      const totalScore = this.totalPoints(player.results);

      return totalScores.indexOf(totalScore) != totalScores.lastIndexOf(totalScore);
    },
    incrementTotalScore(player) {
      if (this.$store.state.results.gameOver && this.hasDuplicateTotalScore(player)) {
        player.results.totalAdj += 0.1;
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.table td, .table th{
  vertical-align: middle;
}
</style>
