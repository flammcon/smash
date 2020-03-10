<template>
  <div>
    <button v-if="teams.length === 0" type="button" class="btn btn-primary" @click="getTeams">Load</button>
    <div v-if="teams.length > 0">
      <draggable
          :list="this.teams"
          class="list-group"
          ghost-class="ghost"
          :disabled="locked"
        >

        <div v-for="team in this.teams" :key="team.id">
          <ul :id="`team-${team.id}`" style="padding: 5px;" class="list-group">
            <li class="list-group-item">{{team.player1.results.bloodbath}} - {{team.player1.name}}</li>
            <li class="list-group-item">{{team.player2.results.bloodbath}} - {{team.player2.name}}</li>  
          </ul>
        </div>
      </draggable>
      <button type="button" class="btn btn-primary" @click="updateRanks" :disabled="locked">Submit</button>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: 'TwoVsTwoSeeding',
  components: {
    draggable
  },
  data() {
    return {
      teams: [],
      locked: false
    }
  },
  methods: {
    updateRanks() {
      this.$store.dispatch('update2v2SeedingResults', this.teams);
      this.locked = true;
    },
    getTeams() {
      const players = this.$store.getters.bloodbathResults;
      this.teams = [
        {id: 1, player1: players[0], player2: players[6]},
        {id: 2, player1: players[1], player2: players[7]},
        {id: 3, player1: players[2], player2: players[4]},
        {id: 4, player1: players[3], player2: players[5]},
      ];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
