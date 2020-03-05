<template>
  <div>
    <button v-if="results.length === 0" type="button" class="btn btn-primary" @click="getPlayers">Load</button>
    <div v-if="results.length > 0">
    <draggable
        :list="this.results"
        class="list-group"
        ghost-class="ghost"
      >
      <div v-for="(player, index) in this.results" :key="player.id">
        <span class="input-group-text" style="width:85px; justify-content:center">{{index+1}} - {{player.name}}</span>  
      </div>
    </draggable>
    <button type="button" class="btn btn-primary" @click="updateRanks">Submit</button>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import draggable from "vuedraggable";

export default {
  name: 'Bloodbath',
  components: {
    draggable
  },
  data() {
    return {
      results: []
    }
  },
  methods: {
    updateRanks() {
      this.results.forEach((player, index) => {
        this.$store.dispatch('updateBloodbathResults', {playerId: player.id, rank: index+1})
      });
    },
    getPlayers() {
      this.results = [...this.$store.state.players];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
