<template>
  <div>
    <table class="table table-sm">
      <draggable v-model="results" tag="tbody" :disabled="locked">
        <tr v-for="(player, index) in this.results" :key="`bloodbath-${player.id}`">
          <th scope="row">{{index + 1}}</th>
          <td><PlayerCard :player="player"/></td>
          <td><i v-bind:class="[{ disabled: locked }, 'fas', 'fa-grip-lines']" /></td>
        </tr>
      </draggable>
    </table>
    <button type="button" class="btn btn-primary" @click="updateRanks" :disabled="locked">Submit</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import draggable from "vuedraggable";
import PlayerCard from "../PlayerCard";

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
  mounted() {
    this.results = [...this.sortedPlayerList];
  },
  computed: {
    ...mapGetters(['sortedPlayerList']),
  },
  methods: {
    ...mapActions(['updateBloodbathResults']),
    updateRanks() {
      this.updateBloodbathResults(this.results);
      this.locked = true;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.disabled {
  color: lightgray;
}
</style>
