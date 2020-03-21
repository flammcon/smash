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
    <button type="button" class="btn btn-primary" @click="updateRanks" :disabled="locked">Submit</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import draggable from 'vuedraggable';
import PlayerCard from './PlayerCard'
export default {
  name: 'TwoVsTwoSeeding',
  components: {
    draggable,
    PlayerCard
  },
  data() {
    return {
      teams: [],
      locked: false,
    }
  },
  mounted() {
    if (this.players.length === 0) {
      this.$router.push('/');
    }

    this.teams = [
      {id: 1, player1: this.players[0], player2: this.players[6], color: 'orchid'},
      {id: 2, player1: this.players[1], player2: this.players[7], color: 'dodgerblue'},
      {id: 3, player1: this.players[2], player2: this.players[4], color: 'yellowgreen'},
      {id: 4, player1: this.players[3], player2: this.players[5], color: 'orange'},
    ];
  },
  computed: {
    ...mapGetters({
      players: 'bloodbathResults'
    }),
  },
  methods: {
    ...mapActions(['update2v2SeedingResults']),
    updateRanks() {
      this.update2v2SeedingResults(this.teams);
      this.locked = true;
    }
  }
}
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
