<template>
  <div class="container-fluid">
    <draggable
        :list="this.teams"
        ghost-class="ghost"
        :disabled="locked"
      >
      <div v-for="team in this.teams" :key="team.id" :id="`team-${team.id}`" class="row team mb-2">
        <div style="width: 140px">
          <PlayerCard :player="team.player1" :color="team.color"/>
          <PlayerCard :player="team.player2" :color="team.color"/>
        </div>
        <i v-bind:class="[{ disabled: locked }, 'fas', 'fa-arrows-alt-v']"/>
      </div>
    </draggable>
    <button v-if="!locked" type="button" class="btn btn-primary" @click="updateRanks">Submit</button>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapMutations, createNamespacedHelpers } from 'vuex';
import PlayerCard from '../PlayerCard.vue';

const { mapState, mapActions } = createNamespacedHelpers('results');

export default {
  name: 'TwoVsTwoSeeding',
  components: {
    draggable,
    PlayerCard,
  },
  data() {
    return {
      teams: [],
      locked: false,
    };
  },
  mounted() {
    if (this.seeding.length > 0) {
      this.teams = this.seeding;
      this.locked = true;
    } else {
      this.teams = [
        {
          id: 1, player1: this.players[0], player2: this.players[7], color: 'indianred',
        },
        {
          id: 2, player1: this.players[1], player2: this.players[6], color: 'dodgerblue',
        },
        {
          id: 3, player1: this.players[2], player2: this.players[5], color: 'yellowgreen',
        },
        {
          id: 4, player1: this.players[3], player2: this.players[4], color: 'orange',
        },
      ];
    }
  },
  computed: {
    ...mapState({
      players: (state) => state.bloodbath,
      seeding: (state) => state.two_vs_two.seeding,
    }),
  },
  methods: {
    ...mapMutations(['updateRoundRobinScores']),
    ...mapMutations('results', ['set2v2SeedingResults']),
    ...mapActions(['update2v2Round1Games']),
    updateRanks() {
      this.set2v2SeedingResults(this.teams);
      this.updateRoundRobinScores(this.teams);
      this.update2v2Round1Games();
      this.locked = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.team {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.disabled {
  color: lightgray;
}
</style>
