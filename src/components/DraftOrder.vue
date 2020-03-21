<template>
  <div>
    <h2>Set draft order</h2>
    <ul class="list-group players container-fluid" id="draft-order">
      <draggable
        :list="draft_order"
        class="list-group"
        ghost-class="ghost"
      >
        <li v-for="player in draft_order" :key="`draft-${player.id}`" class="list-group-item player">
          <div class="playerName">{{player.name}}</div>
          <i class="fas fa-grip-lines grip"/>
        </li>
      </draggable>
    </ul>
    <button type="button" class="btn btn-primary btn-sm" @click="lockDraftOrder()">Lock</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'DraftOrder',
  components: {
    draggable
  },
  methods: {
    ...mapMutations(['setPlayerDraftPick']),
    lockDraftOrder() {
      this.draft_order.forEach((value, index) => {
        this.setPlayerDraftPick({playerId: value.id, draftPick: index + 1});
      });
      this.$router.push('draft');
    },
  },
  computed: {
    ...mapState(['draft_order']),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img {
  width: 80px;
  height: 80px;
  background-color: gold;
  box-sizing: border-box;
}
img:hover {
  border: 3px solid red;
  background-color: deepskyblue;
}

#characters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.disabled > img {
  background-color: lightgrey;
}

.disabled > img:hover {
  background-color: lightgrey;
  border: 0px;
}

.chosen > img {
  background-color: lightskyblue;
}

.chosen > img:hover {
  background-color: lightskyblue;
  border: 0px;
}

.character {
  width: 80px;
  height: 80px;
  margin: 1px;
  position: relative;
  float: left;
}

.name {
  font-family: 'Nunito', Helvetica, Arial, sans-serif;
  font-weight: bolder;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  text-align: center;
  left: 0;
  width: 100%;
  bottom: 5px;
  color: white;
  text-shadow:
		-1px -1px 0 #000,
		1px -1px 0 #000,
		-1px 1px 0 #000,
		1px 1px 0 #000;
}

.players {
  width: 200px;
}

.player {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.playerName {
   flex:1;
}

.grip {
  align-self: center;
}
</style>
