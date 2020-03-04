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
              <th scope="col">F4A</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in players" :key="player.id">
              <th scope="row">{{player.id}}</th>
              <td><PlayerCard :player="player" :index="index"/></td>
              <td>{{player.results.fourVsFour}}</td>
              <td>{{player.results.twoVsTwo}}</td>
              <td>{{player.results.freeForAll}}</td>
              <td style="font-weight: bold">{{totalPoints(player.results)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col">
        <Draft/>
      </div>
    </div>
  </div>
</template>

<script>
import Draft from './components/Draft'
import PlayerCard from './components/PlayerCard'

export default {
  name: 'App',
  components: {
    Draft,
    PlayerCard
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
    }
  },
  methods: {
    totalPoints(results) {
      return results.fourVsFour + results.twoVsTwo + results.freeForAll;
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
