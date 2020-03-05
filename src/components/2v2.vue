<template>
  <div class="row">
    <div class="col-2">
      <h3>Bloodbath</h3>
      <TwoVsTwoSeeding/>
    </div>
    <div class="col" v-if="teams.length > 0">
      <h3>Winner's Bracket</h3>
      <div class="row">
        <div class="col">
          <div class="row">
            <ul style="padding: 5px;" class="list-group list-group-horizontal">
              <li class="list-group-item">{{teams[0].player1.name}}</li>
              <li class="list-group-item">{{teams[0].player2.name}}</li>  
            </ul>
          </div>
          <div class="row">            
            <ul style="padding: 5px;" class="list-group list-group-horizontal">
              <li class="list-group-item">{{teams[3].player1.name}}</li>
              <li class="list-group-item">{{teams[3].player2.name}}</li>  
            </ul>
          </div>
          <div class="row">
            <ul style="padding: 5px;" class="list-group list-group-horizontal">
              <li class="list-group-item">{{teams[2].player1.name}}</li>
              <li class="list-group-item">{{teams[2].player2.name}}</li>  
            </ul>
          </div>
          <div class="row">
            <ul style="padding: 5px;" class="list-group list-group-horizontal">
              <li class="list-group-item">{{teams[1].player1.name}}</li>
              <li class="list-group-item">{{teams[1].player2.name}}</li>  
            </ul>
          </div>
        </div>
        <div class="col">
          <div class="row">Winner Game1</div>
          <div class="row">Winner Game2</div>
        </div>
        <div class="col">
          winner
        </div>
      </div>
      <h3>Loser's Bracket</h3>
      <div class="row">
        <div class="col">
          <div class="row">Loser Game1</div>
          <div class="row">Loser Game2</div>
        </div>
        <div class="col">
          3rd place
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TwoVsTwoSeeding from './2v2v2v2';

export default {
  name: 'TwoVsTwo',
  components: {
    TwoVsTwoSeeding
  },
  computed: {
    ...mapState({
      teams: state => state.results.twoVsTwoSeeding,
    }),
  },
  methods: {
    gameOver: function() { 
      this.$store.commit('update2v2Scores', this.teams);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
