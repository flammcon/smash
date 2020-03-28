<template>
  <draggable
    tag="ul"
    :list="players"
    :disabled="disabled"
    class="list-group players container-fluid p-0"
    ghost-class="ghost"
  >
    <li v-for="player in players" :key="`${name}-${player.id}`" class="list-group-item player">
      <div class="name">{{player.name}}</div>
      <i :class="['fas', 'fa-grip-lines', 'grip', { disabled: disabled }]"/>
    </li>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'SortablePlayerList',
  components: {
    draggable,
  },
  props: {
    name: String,
    players: Array,
    disabled: Boolean,
  },
  data() {
    return {
      dragging: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.name { flex:1; }
.grip {
  align-self: center;
}
.disabled {
  color: lightgray;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
