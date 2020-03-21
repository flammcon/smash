<template>
  <div class="container-fluid">
    <h2>Red vs Blue</h2>
    <div div class="row">
      <div class="col-3">
        <h4>Bloodbath</h4>
        <Bloodbath/>
      </div>
      <div class="col" v-if="red.length > 0">
        <h4>Red Team</h4>
        <div class="row">
          <div class="col-2">
            <ul id="redteam" class="list-group">
              <li v-for="player in red" :key="`redteam-${player.id}`" class="list-group-item list-group-item-danger">{{player.name}}</li>  
            </ul>
          </div>
          <div class="col-8">
            <button type="button" v-bind:class="[redWins > 0 ? 'btn-danger' : 'btn-outline-danger', 'btn']" 
              @click="redWin" :disabled="redWins !== 0">Win 1</button>
            <button type="button" v-bind:class="[redWins > 1 ? 'btn-danger' : 'btn-outline-danger', 'btn']" 
              @click="redWin" :disabled="redWins !== 1">Win 2</button>
            <button type="button" v-bind:class="[redWins > 2 ? 'btn-danger' : 'btn-outline-danger', 'btn']" 
              @click="redWin" :disabled="redWins !== 2">Win 3</button>
          </div>
        </div>
        <h4>Blue Team</h4>
        <div class="row">
          <div class="col-2">
            <ul id="blueteam" class="list-group">
              <li v-for="player in blue" :key="`blueteam-${player.id}`" class="list-group-item list-group-item-primary">{{player.name}}</li>  
            </ul>
          </div>
          <div class="col-8">
            <button type="button" v-bind:class="[blueWins > 0 ? 'btn-primary' : 'btn-outline-primary', 'btn']" 
              @click="blueWin" :disabled="blueWins !== 0">Win 1</button>
            <button type="button" v-bind:class="[blueWins > 1 ? 'btn-primary' : 'btn-outline-primary', 'btn']" 
              @click="blueWin" :disabled="blueWins !== 1">Win 2</button>
            <button type="button" v-bind:class="[blueWins > 2 ? 'btn-primary' : 'btn-outline-primary', 'btn']" 
              @click="blueWin" :disabled="blueWins !== 2">Win 3</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Bloodbath from './Bloodbath';

export default {
  name: 'FourVsFour',
  components: {
    Bloodbath
  },
  mounted() {
    if (this.players.length === 0) {
      this.$router.push('/');
    }
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
    redWin() { 
      this.redWins++; 
      if (this.redWins === 3) {
        this.gameOver(this.red);
      }
    },
    blueWin() { 
      this.blueWins++; 
      if (this.blueWins === 3) {
        this.gameOver(this.blue);
      }
    },
    gameOver(winner) {
      this.update4v4Scores(winner);
      this.$router.push('2v2');
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
