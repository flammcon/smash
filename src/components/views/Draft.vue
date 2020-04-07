<template>
  <div>
    <Header v-if="special_draft" title="Draft" :disabled="true" :prevDisabled="true"/>
    <Header v-else title="Draft" prev="draft_order" next="4v4" :disabled="!draftCompleted"/>
    <h5 :class="{'hidden': draftCompleted}">
      Select character for
      <span style="font-weight:bold;">{{current_player.name}}</span>
      <span class="ml-3">
        <button
          type="button"
          class="btn btn-danger btn-sm"
          @click="selectRandomCharacter"
          v-if="current_player.name === 'Phil'">
          Random
        </button>
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
import { mapState, mapGetters, mapMutations } from 'vuex';
import smash from '../../api/smash';
import Header from '../Header.vue';

export default {
  name: 'Draft',
  components: {
    Header,
  },
  created() {
    smash.getCharacters((characters) => {
      this.characters = characters;
    });
  },
  data() {
    return {
      current_counter: 0,
      current_draft_pick: 0,
      drafted_characters: [],
      characters: [],
    };
  },
  mounted() {
    if (this.draftCompleted) {
      this.drafted_characters = this.draftPicks;
    }
  },
  methods: {
    ...mapMutations(['updatePlayerCharacter', 'setDraftPicks', 'addPlayerCharacter']),
    selectCharacter(character) {
      if (!(this.disableCharacter(character.id) || this.chosenCharacter(character.id))) {
        if (this.special_draft) {
          this.addPlayerCharacter({ id: this.current_player_id, index: this.current_counter, pick: character.id });
          this.drafted_characters.push(character.id);

          if (this.current_counter === 2) {
            if (this.current_draft_pick === 7) {
              this.$router.push('exhibition');
            } else {
              this.current_draft_pick += 1;
              this.current_counter = 0;
              this.drafted_characters = [];
            }
          } else {
            this.current_counter += 1;
          }
        } else {
          this.updatePlayerCharacter({ id: this.current_player_id, character: character.url });
          this.drafted_characters.push(character.id);

          if (this.current_draft_pick === 7) {
            this.setDraftPicks(this.drafted_characters);
          } else {
            this.current_draft_pick += 1;
          }
        }
      }
    },
    disableCharacter(character) {
      if (this.draftCompleted) {
        return !this.drafted_characters.find((id) => id === character);
      }
      return this.disabled_characters.find((id) => id === character);
    },
    chosenCharacter(character) {
      return this.drafted_characters.find((id) => id === character);
    },
    selectRandomCharacter() {
      const available = this.characters.filter((character) => {
        const drafted = this.drafted_characters.find((id) => id === character.id);
        const disabled = this.disabled_characters.find((id) => id === character.id);
        return !drafted && !disabled;
      });
      const index = Math.floor(Math.random() * available.length);
      this.selectCharacter(available[index]);
    },
  },
  computed: {
    ...mapState(['players', 'draft_order', 'special_draft']),
    ...mapGetters(['disabledCharactersByPlayerId', 'playerById', 'draftCompleted', 'draftPicks']),
    disabled_characters() {
      return this.disabledCharactersByPlayerId(this.current_player_id);
    },
    current_player_id() {
      return this.draft_order[this.current_draft_pick].id;
    },
    current_player() {
      return this.playerById(this.current_player_id);
    },
  },
};
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

.hidden {
  visibility: hidden;
}
</style>
