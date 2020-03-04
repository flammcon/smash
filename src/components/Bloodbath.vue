<template>
  <div>
    <draggable
        :list="players"
        class="list-group"
        ghost-class="ghost"
      >
      <div v-for="(player, index) in players" :key="player.id">
        <span class="input-group-text" style="width:85px; justify-content:center">{{index+1}} - {{player.name}}</span>  
      </div>
    </draggable>
    <button type="button" class="btn btn-primary" @click="updateRanks">Submit</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import draggable from "vuedraggable";

export default {
  name: 'Bloodbath',
  components: {
    draggable
  },
  computed: {
    ...mapState({
      players: state => state.players,
    })
  },
  methods: {
    updateRanks() {
      this.players.forEach((player, index) => {
        this.$store.dispatch('updateBloodbathResults', {playerId: player.id, rank: index+1})
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
