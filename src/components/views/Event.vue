<template>
  <div id="event" class="container-fluid">
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
              <td><PlayerCard :player="player" :useMii="!player.drafted"/></td>
              <td>{{player.results.fourVsFour}}</td>
              <td>{{player.results.twoVsTwo}}</td>
              <td>{{player.results.oneVsOne}}</td>
              <td style="font-weight: bold" :class="{tied: needsTieBreaker(player)}">
                {{totalPoints(player.results).toFixed(1)}}
              </td>
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
import { mapState, mapActions, mapGetters } from 'vuex';
import PlayerCard from '../PlayerCard.vue';

export default {
  name: 'Event',
  components: {
    PlayerCard,
  },
  created() {
    this.loadCharacters();
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
    },
  },
  methods: {
    ...mapActions(['loadCharacters']),
    totalPoints(results) {
      return results.fourVsFour + results.twoVsTwo + results.oneVsOne + results.totalAdj;
    },
    hasDuplicateTotalScore(value) {
      const totalScores = this.sortedPlayers.map((player) => this.totalPoints(player.results));
      const totalScore = this.totalPoints(value.results);

      return totalScores.indexOf(totalScore) !== totalScores.lastIndexOf(totalScore);
    },
    incrementTotalScore(value) {
      if (this.needsTieBreaker(value)) {
        const player = this.players.find((x) => x.id === value.id);
        player.results.totalAdj += 0.1;
      }
    },
    needsTieBreaker(player) {
      return this.$store.state.gameOver && this.hasDuplicateTotalScore(player);
    },
  },
};
</script>

<style>
.table td, .table th{
  vertical-align: middle;
}

.tied {
  background-color: lightcoral;
}
</style>
