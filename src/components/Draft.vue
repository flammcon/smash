<template>
  <div>
    <h2>Draft</h2>
    <CharacterPicker/>
  </div>
</template>

<script>
import CharacterPicker from './CharacterPicker';

export default {
  name: 'Draft',
  components: {
    CharacterPicker,
  },
  computed: {
    players: {
      set(players) {
        this.$store.commit('setPlayers', players);
      },
      get() {
        return this.$store.state.players;
      }
    },
    sortedPlayers() {
      return this.players.slice(0).sort((a, b) => {
        return a.score > b.score ? 1 : -1;
      });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
