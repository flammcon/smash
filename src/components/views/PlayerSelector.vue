<template>
  <div class="container">
    <h3>Select players</h3>
    <div class="row row-cols-1 row-cols-sm-5 justify-content-center">
      <div class="col mb-4 justify-content-center" v-for="player in players" :key="`player-card-${player.id}`">
        <div :class="['card', borderStyle(player.id)]" @click="toggleSelection(player.id)">
          <img :src="player.mii" class="card-img-top" :alt="player.name">
          <div :class="['card-footer', footerStyle(player.id)]">
            {{player.name}}
          </div>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-primary" :disabled="!locked" @click="lockPlayers">Submit</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import smash from '../../api/smash';

export default {
  name: 'PlayerSelector',
  data() {
    return {
      players: [],
      selected: [],
      locked: false,
    };
  },
  created() {
    smash.getAllPlayers((players) => {
      this.players = players;
    });
  },
  methods: {
    ...mapActions(['loadPlayers']),
    toggleSelection(id) {
      if (this.selected.find((x) => x === id)) {
        this.selected = this.selected.filter((x) => x !== id);
      } else if (!this.locked) {
        this.selected.push(id);
      }

      this.locked = this.selected.length === 8;
    },
    borderStyle(id) {
      if (this.isSelected(id)) {
        return 'border-primary';
      }

      if (this.locked) {
        return 'border-secondary';
      }

      return '';
    },
    footerStyle(id) {
      if (this.isSelected(id)) {
        return 'text-white bg-primary';
      }

      if (this.locked) {
        return 'text-white bg-secondary';
      }

      return '';
    },
    isSelected(id) {
      return this.selected.find((x) => x === id);
    },
    lockPlayers() {
      this.loadPlayers(this.selected).then(() => {
        this.$router.push('draft_order');
      });
    },
  },
};
</script>

<style>
</style>
