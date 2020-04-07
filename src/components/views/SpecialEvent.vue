<template>
  <div id="event" class="container-fluid">
    <div class="row">
      <div class="col-3">
        <h2>Picks</h2>
        <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col">Player</th>
              <th scope="col">One</th>
              <th scope="col">Two</th>
              <th scope="col">Three</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in sortedPlayerList" :key="`special-${player.id}`">
              <td><PlayerCard :player="player" image="mii"/></td>
              <td v-for="(pick, index) in player.picks" :key="`${player.name}-pick-${index}`">
                <img class="pick"
                  :alt="`${player.name}-pick-img-${index}`"
                  :src="characterById(pick)"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PlayerCard from '../PlayerCard.vue';

export default {
  name: 'SpecialEvent',
  components: {
    PlayerCard,
  },
  computed: {
    ...mapGetters(['sortedPlayerList', 'characterById']),
  },
  methods: {
  },
};
</script>

<style>
.pick {
  width: 50px;
  height: 50px;
}

.table td, .table th{
  vertical-align: middle;
}
</style>
