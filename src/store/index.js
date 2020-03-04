import Vue from 'vue'
import Vuex from 'vuex'

import smash from '../api/smash';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {  
    characters: [],
    players: [],
  },
  mutations: {
    setCharacters (state, characters) {
      state.characters = characters;
    },
    setPlayers (state, players) {
      state.players = players;
    },
    updatePlayerCharacter (state, payload) {
      const player = state.players.find(x => x.id === payload.playerId);
      player.character = payload.character;
    },
    updatePlayerPodScore (state, payload) {
      const player = state.players.find(x => x.id === payload.id);
      player.score += payload.score;
    },
    clearPlayerPodScores (state) {
      for (const player of state.players) {
        player.score = 0;
      }
    }
  },
  actions: {
    loadCharacters ({ commit }) {
      smash.getCharacters(characters => {
        commit('setCharacters', characters);
      });
    },
    loadPlayers ({ commit }) {
      smash.getPlayers(players => {
        commit('setPlayers', players);
      })
    },
    updatePlayerPodScore({commit}, payload) {
      commit('updatePlayerPodScore', payload);
    }
  },
  getters: {
    getPlayerById: (state) => (id) => {
      return state.players.find(player => player.id === id)
    }
  }
});

export default store;