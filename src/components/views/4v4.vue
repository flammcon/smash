<template>
  <div class="container-fluid">
    <Header title="Red vs Blue" :prev="online ? 'pods' : 'bloodbath'" next="2v2" :disabled="!four_vs_four_locked()"/>
    <div v-if="online" class="row">
      <div class="col-3">
        <div class="container">
          <h5>Red Team - {{redWins}}</h5>
          <div class="container">
            <PlayerCard
              v-for="player in red"
              :key="`redteam-${player.id}`"
              :player="player"
              color="indianred"
              class="pb-1"
            />
          </div>
        </div>
        <div class="container">
          <h5>Blue Team - {{blueWins}}</h5>
          <div class="container">
            <PlayerCard
              v-for="player in blue"
              :key="`blueteam-${player.id}`"
              :player="player"
              color="dodgerblue"
              class="pb-1"
            />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row pt-4">
          <div class="col">
            <TwoVsTwoMatch :id="1" :teamOne="getMatchTeam(0, 3)" :teamTwo="getMatchTeam(5, 6)" @gameOver="gameOver()"/>
            <TwoVsTwoMatch :id="3" :teamOne="getMatchTeam(0, 4)" :teamTwo="getMatchTeam(2, 6)" @gameOver="gameOver()"/>
            <TwoVsTwoMatch :id="5" :teamOne="getMatchTeam(0, 7)" :teamTwo="getMatchTeam(1, 6)" @gameOver="gameOver()"/>
          </div>
          <div class="col">
            <TwoVsTwoMatch :id="2" :teamOne="getMatchTeam(4, 7)" :teamTwo="getMatchTeam(1, 2)" @gameOver="gameOver()"/>
            <TwoVsTwoMatch :id="4" :teamOne="getMatchTeam(3, 7)" :teamTwo="getMatchTeam(1, 5)" @gameOver="gameOver()"/>
            <TwoVsTwoMatch :id="6" :teamOne="getMatchTeam(3, 4)" :teamTwo="getMatchTeam(2, 5)" @gameOver="gameOver()"/>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <Team
        name="Red"
        :wins.sync="red_wins"
        styling="danger"
        :players="red"
        color="indianred"
        :disabled="four_vs_four_locked()"
        @won="gameOver(red)"
      />
      <Team
        name="Blue"
        :wins.sync="blue_wins"
        styling="primary"
        :players="blue"
        color="dodgerblue"
        :disabled="four_vs_four_locked()"
        @won="gameOver(blue)"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, createNamespacedHelpers } from 'vuex';
import Header from '../Header.vue';
import PlayerCard from '../PlayerCard.vue';
import Team from '../4v4/Team.vue';
import TwoVsTwoMatch from '../2v2Match.vue';

const { mapGetters } = createNamespacedHelpers('results');

export default {
  name: 'FourVsFour',
  components: {
    Header,
    PlayerCard,
    Team,
    TwoVsTwoMatch,
  },
  computed: {
    ...mapState({
      players: (state) => state.results.bloodbath,
      online: (state) => state.online,
      redWins: (state) => state.results.four_vs_four.red_wins,
      blueWins: (state) => state.results.four_vs_four.blue_wins,
    }),
    red_wins: {
      get() { return this.redWins; },
      set(value) { this.incrementRedWins(value); },
    },
    blue_wins: {
      get() { return this.blueWins; },
      set(value) { this.incrementBlueWins(value); },
    },
    red() {
      return this.players.filter((player, index) => index === 0 || index === 3 || index === 4 || index === 7);
    },
    blue() {
      return this.players.filter((player, index) => index === 1 || index === 2 || index === 5 || index === 6);
    },
  },
  methods: {
    ...mapMutations(['update4v4Scores']),
    ...mapMutations('results', ['incrementRedWins', 'incrementBlueWins']),
    ...mapGetters(['four_vs_four_locked']),
    gameOver(winner) {
      if (this.online) {
        if (this.red_wins > 3) {
          this.update4v4Scores(this.red);
        } else if (this.blue_wins > 3) {
          this.update4v4Scores(this.blue);
        }
      } else {
        this.update4v4Scores(winner);
      }
    },
    getMatchTeam(one, two) {
      return [this.players[one], this.players[two]];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
