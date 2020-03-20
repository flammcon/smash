<template>
  <div>
    {{title}}
    <input type="checkbox" id="checkbox" v-model="locked" v-if="pool.length > 0">
    <ul class="list-group" :id="`${title}`">
      <draggable
        :list="this.players"
        class="list-group"
        ghost-class="ghost"
        :disabled="locked"
        >
        <li v-for="player in players" :key="`${title}-${player.id}`" class="list-group-item team">
          <div class="name">{{player.name}}</div>
          <i v-bind:class="[{ disabled: locked }, 'fas', 'fa-bars']"/>
        </li>
      </draggable>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'Pod',
  components: {
    draggable
  },
  props: {
    title: String,
    pool: Array
  },
  data() {
    return {
      players: [],
      locked: false,
    }
  },
  methods: {
    ...mapActions(['updatePlayerPodScore'])
  },
  watch: {
    'locked': function() {
      this.players.forEach((player, index) => {
        const points = this.locked ? (index+1) : -1 * (index+1);
        this.updatePlayerPodScore({id: player.id, score: points})
      });

      if (this.locked) {
        this.$emit('locked');
      } else {
        this.$emit('unlocked');
      }
    },
    'pool': function() {
      this.players = this.pool;
    }
  },
}
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
