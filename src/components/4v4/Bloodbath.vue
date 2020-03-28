<template>
  <div>
    <table class="table table-sm">
      <draggable v-model="results" tag="tbody" :disabled="isBloodbathSet">
        <tr v-for="(player, index) in this.results" :key="`bloodbath-${player.id}`">
          <th scope="row">{{index + 1}}</th>
          <td><PlayerCard :player="player"/></td>
          <td><i v-bind:class="[{ disabled: isBloodbathSet }, 'fas', 'fa-grip-lines']" /></td>
        </tr>
      </draggable>
    </table>
    <button type="button" class="btn btn-primary" @click="updateRanks" :disabled="isBloodbathSet">Submit</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import draggable from 'vuedraggable';
import PlayerCard from '../PlayerCard.vue';

export default {
  name: 'Bloodbath',
  components: {
    draggable,
    PlayerCard,
  },
  data() {
    return {
      results: [],
    };
  },
  mounted() {
    if (this.isBloodbathSet) {
      this.results = this.bloodbathResults;
    } else {
      this.results = [...this.sortedPlayerList];
    }
  },
  computed: {
    ...mapGetters(['sortedPlayerList', 'isBloodbathSet', 'bloodbathResults']),
  },
  methods: {
    ...mapActions(['updateBloodbathResults']),
    updateRanks() {
      this.updateBloodbathResults(this.results);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.disabled {
  color: lightgray;
}
</style>
