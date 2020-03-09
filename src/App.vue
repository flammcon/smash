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
            <tr v-for="(player, index) in sortedPlayers" :key="player.id">
              <th scope="row">{{index + 1}}</th>
              <td><PlayerCard :player="player" :index="index"/></td>
              <td>{{player.results.fourVsFour}}</td>
              <td>{{player.results.twoVsTwo}}</td>
              <td>{{player.results.oneVsOne}}</td>
              <td style="font-weight: bold">{{totalPoints(player.results)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col">
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <a class="nav-item nav-link active" id="nav-draft-tab" data-toggle="tab" href="#nav-draft" role="tab" aria-controls="nav-draft" aria-selected="true">Draft</a>
            <a class="nav-item nav-link" id="nav-4v4-tab" data-toggle="tab" href="#nav-4v4" role="tab" aria-controls="nav-4v4" aria-selected="false">4v4</a>
            <a class="nav-item nav-link" id="nav-2v2-tab" data-toggle="tab" href="#nav-2v2" role="tab" aria-controls="nav-2v2" aria-selected="false">2v2</a>
            <a class="nav-item nav-link" id="nav-pods-tab" data-toggle="tab" href="#nav-pods" role="tab" aria-controls="nav-pods" aria-selected="false">Pods</a>
            <a class="nav-item nav-link" id="nav-1v1-tab" data-toggle="tab" href="#nav-1v1" role="tab" aria-controls="nav-1v1" aria-selected="false">1v1</a>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-draft" role="tabpanel" aria-labelledby="nav-draft-tab"><Draft/></div>
          <div class="tab-pane fade" id="nav-4v4" role="tabpanel" aria-labelledby="nav-4v4-tab"><FourVsFour/></div>
          <div class="tab-pane fade" id="nav-2v2" role="tabpanel" aria-labelledby="nav-2v2-tab"><TwoVsTwo/></div>
          <div class="tab-pane fade" id="nav-pods" role="tabpanel" aria-labelledby="nav-pods-tab"><Pods/></div>
          <div class="tab-pane fade" id="nav-1v1" role="tabpanel" aria-labelledby="nav-1v1-tab">...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerCard from './components/PlayerCard'
import Draft from './components/Draft'
import FourVsFour from './components/4v4';
import TwoVsTwo from './components/2v2';
import Pods from './components/Pods';

export default {
  name: 'App',
  components: {
    PlayerCard,
    Draft,
    FourVsFour,
    TwoVsTwo,
    Pods
  },
  created() {
    this.$store.dispatch('loadPlayers')
  },
  computed: {
    players: {
      set(players) {
        this.$store.commit('setPlayers', players);
      },
      get() {
        return this.$store.state.players;
      }
    },
    sortedPlayers() {
      return [...this.players].sort((a, b) => {
        const totalA = this.totalPoints(a.results);
        const totalB = this.totalPoints(b.results);
        return totalA > totalB ? -1 : 1;
      });
    }
  },
  methods: {
    totalPoints(results) {
      return results.fourVsFour + results.twoVsTwo + results.oneVsOne;
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
