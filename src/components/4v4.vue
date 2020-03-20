<template>
  <div div class="row">
    <div class="col-2">
      <h3>Bloodbath</h3>
      <Bloodbath/>
    </div>
    <div class="col" v-if="red.length > 0">
      <h3>Red Team</h3>
      <div class="row">
        <div class="col-2">
          <ul id="redteam" class="list-group">
            <li v-for="player in red" :key="`redteam-${player.id}`" class="list-group-item list-group-item-danger">{{player.name}}</li>  
          </ul>
        </div>
        <div class="col-8">
          <button type="button" v-bind:class="[redWins > 0 ? 'btn-danger' : 'btn-outline-danger', 'btn']" 
            @click="redWin" :disabled="redWins !== 0 || gameOver">Win 1</button>
          <button type="button" v-bind:class="[redWins > 1 ? 'btn-danger' : 'btn-outline-danger', 'btn']" 
            @click="redWin" :disabled="redWins !== 1 || gameOver">Win 2</button>
          <button type="button" v-bind:class="[redWins > 2 ? 'btn-danger' : 'btn-outline-danger', 'btn']" 
            @click="redWin" :disabled="redWins !== 2 || gameOver">Win 3</button>
        </div>
      </div>
      <h3>Blue Team</h3>
      <div class="row">
        <div class="col-2">
          <ul id="blueteam" class="list-group">
            <li v-for="player in blue" :key="`blueteam-${player.id}`" class="list-group-item list-group-item-primary">{{player.name}}</li>  
          </ul>
        </div>
        <div class="col-8">
          <button type="button" v-bind:class="[blueWins > 0 ? 'btn-primary' : 'btn-outline-primary', 'btn']" 
            @click="blueWin" :disabled="blueWins !== 0 || gameOver">Win 1</button>
          <button type="button" v-bind:class="[blueWins > 1 ? 'btn-primary' : 'btn-outline-primary', 'btn']" 
            @click="blueWin" :disabled="blueWins !== 1 || gameOver">Win 2</button>
          <button type="button" v-bind:class="[blueWins > 2 ? 'btn-primary' : 'btn-outline-primary', 'btn']" 
            @click="blueWin" :disabled="blueWins !== 2 || gameOver">Win 3</button>
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
    gameOver() {
      return this.redWins === 3 || this.blueWins === 3;
    }
  },
  methods: {
    ...mapMutations(['update4v4Scores']),
    redWin: function() { 
      this.redWins++; 
      if (this.redWins === 3) {
        this.update4v4Scores(this.red);
      }
    },
    blueWin: function() { 
      this.blueWins++; 
      if (this.blueWins === 3) {
        this.update4v4Scores(this.blue);
      }
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
