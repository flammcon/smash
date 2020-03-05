<template>
  <div>
    <button v-if="results.length === 0" type="button" class="btn btn-primary" @click="getPlayers">Load</button>
    <div v-if="results.length > 0">
      <table class="table table-sm">
        <draggable v-model="results" tag="tbody">
          <tr v-for="(player, index) in this.results" :key="`bloodbath-${player.id}`">
            <th scope="row">{{index + 1}}</th>
            <td><PlayerCard :player="player" :index="index"/></td>
          </tr>
        </draggable>
      </table>
      <button type="button" class="btn btn-primary" @click="updateRanks">Submit</button>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import PlayerCard from "./PlayerCard";

export default {
  name: 'Bloodbath',
  components: {
    draggable,
    PlayerCard
  },
  data() {
    return {
      results: []
    }
  },
  methods: {
    updateRanks() {
      this.$store.dispatch('updateBloodbathResults', this.results);
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
