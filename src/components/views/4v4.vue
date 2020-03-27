<template>
  <div class="container-fluid">
    <h2>Red vs Blue</h2>
    <div class="row">
      <div class="col-3">
        <h4>Bloodbath</h4>
        <Bloodbath/>
      </div>
      <div class="col" v-if="red.length > 0">
        <Team name="Red" :wins.sync="redWins" styling="danger" :players="red" color="indianred" @won="gameOver('Red', red)"/>
        <Team name="Blue" :wins.sync="blueWins" styling="primary" :players="blue" color="dodgerblue" @won="gameOver('Blue', blue)"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Bloodbath from '../4v4/Bloodbath'
import Team from '../4v4/Team'

export default {
  name: 'FourVsFour',
  components: {
    Bloodbath,
    Team
  },
  data() {
    return {
      redWins: 0,
      blueWins: 0
    }
  },
  computed: {
    ...mapState({
      players: state => state.results.bloodbath
    }),
    red() {
      return this.players.filter(player => {
        const rank = player.results.bloodbath;
        return rank === 1 || rank === 4 || rank === 5 || rank === 8;
      });
    },
    blue() {
      return this.players.filter(player => {
        const rank = player.results.bloodbath;
        return rank === 2 || rank === 3 || rank === 6 || rank === 7;
      });
    },
  },
  methods: {
    ...mapMutations(['update4v4Scores']),
    gameOver(name, winner) {
      this.update4v4Scores(winner);
      alert(`${name} team wins!`);
      this.$router.push('2v2');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
