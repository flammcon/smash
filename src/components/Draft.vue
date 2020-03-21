<template>
  <div v-if="draft_set">
    <h2>Draft</h2>
    <h5>
      Select character for 
      <span style="font-weight:bold;">{{current_player.name}}</span>
      <span>
        <button type="button" class="btn btn-danger btn-sm" @click="selectRandomCharacter" v-if="current_player.id === 5">Random</button>
      </span>
    </h5>
    <div id="characters">
      <div class="character" v-for="character in characters" 
        v-bind:class="{disabled: disableCharacter(character.id), chosen: chosenCharacter(character.id)}"
        :key="character.id" 
        @click="selectCharacter(character)">
        <img :src="character.url" :alt="character.name"/>
        <div class="name">{{character.name.toUpperCase()}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Draft',
  created() {
    this.loadCharacters();
  },
  mounted() {
    if (this.players.length === 0) {
      this.$router.push('/');
    }
  },
  data() {
    return {
      current_draft_pick: 0,
      drafted_characters: [],
    }
  },
  methods: {
    ...mapActions(['loadCharacters']),
    ...mapMutations(['updatePlayerCharacter']),
    selectCharacter(character) {
      if (!(this.disableCharacter(character.id) || this.chosenCharacter(character.id))) {
        this.updatePlayerCharacter({playerId: this.current_player_id, character: character.url});
        this.current_draft_pick++;
        this.drafted_characters.push(character.id);
        if (this.draft_over) {
          this.$router.push('4v4');
        }
      }
    },
    disableCharacter(character) {
      if (this.draft_over) {
        return !this.drafted_characters.find(id => id === character);
      } else {
        return this.disabled_characters.find(id => id === character);
      }
    },
    chosenCharacter(character) {
      return this.drafted_characters.find(id => id === character);
    },
    selectRandomCharacter() {
      const available = this.characters.filter(character => {
        return !(this.drafted_characters.find(id => id === character.id) || this.disabled_characters.find(id => id === character.id));
      }, this);
      const index = Math.floor(Math.random() * available.length);
      this.selectCharacter(available[index]);
    }
  },
  computed: {
    ...mapState(['characters', 'players', 'draft_order']),
    ...mapGetters(['disabledCharactersByPlayerId', 'playerById']),
    draft_over() {
      return this.current_draft_pick === 8;
    },
    draft_set() {
      return this.draft_order.length > 0;
    },
    disabled_characters() {
      return this.draft_over ? [] : this.disabledCharactersByPlayerId(this.current_player_id);
    },
    current_player_id() {
      return this.draft_over || !this.draft_set ? -1 : this.draft_order[this.current_draft_pick].id;
    },
    current_player() {
      return this.draft_over ? {} : this.playerById(this.current_player_id);
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
