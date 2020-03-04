<template>
  <div v-if="current_player">
    <h5>Select character for <span style="font-weight:bold;">{{current_player.name}}</span></h5>
    <button type="button" class="btn btn-danger btn-sm" @click="selectRandomCharacter" v-if="current_player.id === 5">Random</button>
    <div id="characters">
      <div class="character" v-for="character in characters" 
        v-bind:class="{disabled: disableCharacter(character.id)}"
        :key="character.id" 
        @click="selectCharacter(character)">
        <img :src="character.url" :alt="character.name"/>
        <div class="name">{{character.name.toUpperCase()}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Draft',
  props: {
  },
  created() {
    this.$store.dispatch('loadCharacters')
  },
  data() {
    return {
      current_player_id: 1,
      chosen_characters: []
    }
  },
  methods: {
    selectCharacter(character) {
      if (!this.disableCharacter(character.id)) {
        this.$store.commit("updatePlayerCharacter", {playerId: this.current_player_id, character: character.url});
        this.current_player_id += 1;
        this.chosen_characters.push(character.id);
      }
    },
    disableCharacter(character) {
      const disabled = this.$store.getters.getDisabledCharactersByPlayerId(this.current_player_id);
      return this.chosen_characters.find(id => id === character) || disabled.find(id => id === character);
    },
    selectRandomCharacter() {
      const disabled = this.$store.getters.getDisabledCharactersByPlayerId(this.current_player_id);
      const available = this.characters.filter(character => {
        return !(this.chosen_characters.find(id => id === character.id) || disabled.find(id => id === character.id));
      }, this);
      const index = Math.floor(Math.random() * available.length);
      this.selectCharacter(available[index]);
    }
  },
  computed: {
    ...mapState({
      characters: state => state.characters,
    }),
    current_player() {
      return this.$store.getters.getPlayerById(this.current_player_id);
    }
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
</style>
