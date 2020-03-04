<template>
  <div>
    <div v-for="player in red" :key="`redteam-${player.id}`">
      <span class="input-group-text" style="width:85px; justify-content:center">{{player.name}}</span>  
    </div>
    ----------
    <div v-for="player in blue" :key="`blueteam-${player.id}`">
      <span class="input-group-text" style="width:85px; justify-content:center">{{player.name}}</span>  
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FourVsFour',
  computed: {
    ...mapState({
      players: state => state.players,
    }),
    red() {
      return this.players.filter((player, index) => {
        return index === 0 || index === 3 || index === 4 || index === 7;
      });
    },
    blue() {
      return this.players.filter((player, index) => {
        return index === 1 || index === 2 || index === 5 || index === 6;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
