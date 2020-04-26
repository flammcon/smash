<template>
  <div class="container-fluid" style="maxWidth: 250px">
    <Header title="Bloodbath" prev="draft" :next="next" :disabled="!bloodbath_locked"/>
    <div class="mt-4">
      <table class="table table-sm table-borderless">
        <draggable v-model="results" tag="tbody" :disabled="bloodbath_locked">
          <tr v-for="(player, index) in this.results" :key="`bloodbath-${player.id}`">
            <th scope="row">{{index + 1}}</th>
            <td><PlayerCard :player="player"/></td>
            <td><i v-bind:class="[{ disabled: bloodbath_locked }, 'fas', 'fa-grip-lines']" /></td>
          </tr>
        </draggable>
      </table>
      <button v-if="!bloodbath_locked" type="button" class="btn btn-primary" @click="updateRanks">Submit</button>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapGetters, createNamespacedHelpers } from 'vuex';
import Header from '../Header.vue';
import PlayerCard from '../PlayerCard.vue';

const { mapState, mapMutations } = createNamespacedHelpers('results');

export default {
  name: 'Bloodbath',
  components: {
    draggable,
    Header,
    PlayerCard,
  },
  data() {
    return {
      results: [],
    };
  },
  mounted() {
    if (this.bloodbath_locked) {
      this.results = this.bloodbath;
    } else {
      this.results = [...this.sortedPlayerList];
    }
  },
  computed: {
    ...mapState(['bloodbath', 'online']),
    ...mapGetters('results', ['bloodbath_locked']),
    ...mapGetters(['sortedPlayerList', 'draftCompleted']),
    next() { return this.online ? 'pods' : '4v4'; },
  },
  methods: {
    ...mapMutations(['setBloodbathResults']),
    updateRanks() {
      this.setBloodbathResults(this.results);
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
