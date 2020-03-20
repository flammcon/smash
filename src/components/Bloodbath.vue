<template>
  <div>
    <button v-if="results.length === 0" type="button" class="btn btn-primary" @click="getPlayers">Load</button>
    <div v-if="results.length > 0">
      <table class="table table-sm">
        <draggable v-model="results" tag="tbody" :disabled="locked">
          <tr v-for="(player, index) in this.results" :key="`bloodbath-${player.id}`">
            <th scope="row">{{index + 1}}</th>
            <td><i class="fa fa-arrows-alt-v arrow-size" /></td>
            <td><PlayerCard :player="player" :index="index"/></td>
          </tr>
        </draggable>
      </table>
      <button type="button" class="btn btn-primary" @click="updateRanks" :disabled="locked">Submit</button>
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
      results: [],
      locked: false,
    }
  },
  methods: {
    updateRanks() {
      this.$store.dispatch('updateBloodbathResults', this.results);
      this.locked = true;
    },
    getPlayers() {
      this.results = [...this.$store.state.players];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.arrow-size {
    vertical-align: middle;
    font-size: 35px;
}
</style>
