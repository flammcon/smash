import Vue from 'vue'
import Vuex from 'vuex'

import smash from '../api/smash';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {  
    characters: [],
    players: [],
    results: {
      twoVsTwoSeeding: []
    }
  },
  mutations: {
    setCharacters (state, characters) {
      state.characters = characters;
    },
    setPlayers (state, players) {
      state.players = players;
    },
    set2v2SeedingResults (state, results) {
      state.results.twoVsTwoSeeding = results;
    },
    updatePlayerCharacter (state, payload) {
      const player = state.players.find(x => x.id === payload.playerId);
      player.character = payload.character;
    },
    updateBloodbathRank (state, payload) {
      const player = state.players.find(x => x.id === payload.playerId);
      player.results.bloodbath = payload.rank;
    },
    update2v2SeedingRank (state, payload) {
      const player = state.players.find(x => x.id === payload.playerId);
      player.results.twoVsTwoSeeding = payload.rank;
    },
    update2v2Scores(state, results) {
      results.forEach((team, index) => {
        let points = 0;
        if (index === 0) {
          points = 4;
        } else if (index === 1) {
          points = 2;
        } else if (index === 2) {
          points = 1;
        }

        const player1 = state.players.find(x => x.id === team.player1.id);
        player1.results.twoVsTwo = points;
      
        const player2 = state.players.find(x => x.id === team.player2.id);
        player2.results.twoVsTwo = points;
      });
    },
    update4v4Scores(state, winners) {
      winners.forEach(winner => {
        const player = state.players.find(x => x.id === winner.id);
        player.results.fourVsFour = 2;
      });
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
    updateBloodbathResults: ({ commit }, payload) => {
      payload.forEach((player, index) => {
        commit("updateBloodbathRank", {playerId: player.id, rank: index + 1});
      })
    },
    update2v2SeedingResults: ({ commit }, payload) => {
      commit("set2v2SeedingResults", payload);
      payload.forEach((team, index) => {
        commit("update2v2SeedingRank", {playerId: team.player1.id, rank: index + 1});
        commit("update2v2SeedingRank", {playerId: team.player2.id, rank: index + 1});
      })
    },
    updatePlayerPodScore({commit}, payload) {
      commit('updatePlayerPodScore', payload);
    }
  },
  getters: {
    playerById: (state) => (id) => {
      return state.players.find(player => player.id === id)
    },
    disabledCharactersByPlayerId: (state) => (id) => {
      const player = state.players.find(x => x.id === id);
      return player.disabled;
    }, 
    bloodbathResults: (state) => {
      return state.players.sort((a, b) => {
        return a.results.bloodbath < b.results.bloodbath ? -1 : 1;
      });
    }
  }
});

export default store;