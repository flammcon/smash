<template>
  <div class="container-fluid">
    <h4>{{name}} Team</h4>
    <div class="row justify-content-center mb-3">
      <WinButton class="mx-1" :wins="wins" :min="1" :styling="styling" @click.native="updateWins"/>
      <WinButton class="mx-1" :wins="wins" :min="2" :styling="styling" @click.native="updateWins"/>
      <WinButton class="mx-1" :wins="wins" :min="3" :styling="styling" @click.native="updateWins"/>
    </div>
    <div class="row justify-content-center mb-5">
      <PlayerCard 
        v-for="player in players" 
        :key="`${teamName}-team-${player.id}`"
        :player="player"
        :color="color"
        class="mx-3" 
      />
    </div>
  </div>
</template>

<script>
import WinButton from './WinButton'
import PlayerCard from './PlayerCard'

export default {
  name: 'Team',
  components: {
    WinButton,
    PlayerCard
  },
  props: {
    name: String,
    players: Array,
    wins: Number,
    styling: String,
    color: String,
  },
  computed: {
    teamName() {
      return this.name.toLowerCase();
    }
  },
  methods: {
    updateWins() {
      this.$emit('update:wins', this.wins + 1);
      if (this.wins + 1 === 3) {
        this.$emit('won');
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
