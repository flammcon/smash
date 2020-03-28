<template>
  <div>
    <h6>
      {{title}}
      <span>
        <input type="checkbox" id="checkbox" :disabled="disabled" v-model="locked" v-if="pool.length > 0">
      </span>
    </h6>
    <SortablePlayerList :players="players" :name="title" :disabled="locked || disabled"/>
  </div>
</template>

<script>
import SortablePlayerList from '../SortablePlayerList.vue';

import { mapActions, createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('results');

export default {
  name: 'Pod',
  components: {
    SortablePlayerList,
  },
  props: {
    title: String,
    pool: Array,
  },
  data() {
    return {
      players: [...this.pool],
      locked: false,
    };
  },
  computed: {
    ...mapGetters({
      disabled: 'one_vs_one_seeding_locked',
    }),
  },
  methods: {
    ...mapActions(['updatePlayerPodScore']),
  },
  watch: {
    locked() {
      this.players.forEach((player, index) => {
        const points = this.locked ? (index + 1) : -1 * (index + 1);
        this.updatePlayerPodScore({ id: player.id, score: points });
      });

      if (this.locked) {
        this.$emit('locked');
      } else {
        this.$emit('unlocked');
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pod-header {
  justify-content: space-between;
}

.team {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.name {
   flex:1;
}

.hamburger {
  align-self: center;
}

.disabled {
  color: lightgray;
}
</style>
