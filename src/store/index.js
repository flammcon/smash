import Vue from 'vue'
import Vuex from 'vuex'

import smash from '../api/smash';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {  
    characters: [],
    players: [],
    draft_order: [],
    results: {
      draft: [],
      bloodbath: [],
      fourVsFour: {
        redWins: 0,
        blueWins: 0,
      },
      twoVsTwoSeeding: [],
      oneVsOneSeeding: [],
      gameOver: false
    },
    completed: {
      draftOrder: false,
      draft: false,
      fourVsFour: false,
      twoVsTwo: false,
      oneVsOne: false,
      pods: false,
    }
  },
  mutations: {
    setCharacters (state, characters) {
      state.characters = characters;
    },
    setPlayers (state, players) {
      state.players = players;
    },
    setDraftOrder (state, draftOrder) {
      state.draft_order = draftOrder;
    },
    lockDraftOrder(state) {
      state.completed.draftOrder = true;
    },
    setDraftPicks (state, draftPicks) {
      state.results.draft = draftPicks;
    },
    lockDraftPicks(state) {
      state.completed.draft = true;
    },
    setPlayerDraftPick (state, payload) {
      const player = state.players.find(x => x.id === payload.playerId);
      player.pick = payload.draftPick;
    },
    setBloodBathResults (state, results) {
      state.results.bloodbath = results;
    },
    set2v2SeedingResults (state, results) {
      state.results.twoVsTwoSeeding = results;
    },
    set1v1SeedingResults (state, results) {
      state.results.oneVsOneSeeding = results;
      state.completed.pods = true;
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
      state.completed.twoVsTwo = true;
    },
    update1v1Scores(state, results) {
      results.forEach((player, index) => {
        let points = index;
        if (index === 7) {
          points = 8;
        }

        const team = state.players.find(x => x.id === player.id);
        team.results.oneVsOne = points;
      });
      state.results.gameOver = true;
      state.completed.oneVsOne = true;
    },
    update4v4Scores(state, winners) {
      winners.forEach(winner => {
        const player = state.players.find(x => x.id === winner.id);
        player.results.fourVsFour = 2;
      });
      state.completed.fourVsFour = true;
    },
    incrementRedWins(state, value) {
      state.results.fourVsFour.redWins = value;
    },
    incrementBlueWins(state, value) {
      state.results.fourVsFour.blueWins = value;
    },
    updatePlayerPodScore (state, payload) {
      const player = state.players.find(x => x.id === payload.id);
      player.results.podScore += payload.score;
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
      });
      smash.getDraftOrder(players => {
        commit('setDraftOrder', players);
      });
    },
    setPlayerDraftPicks ({ commit }, payload) {
      payload.forEach((value, index) => {
        commit('setPlayerDraftPick', {playerId: value.id, draftPick: index + 1});
      });
      commit('lockDraftOrder');
    },
    updateBloodbathResults: ({ commit }, payload) => {
      commit("setBloodBathResults", payload);
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
    sortedPlayerList: (state) => {
      return [...state.players].sort((a, b) => {
        return a.pick - b.pick;
      });
    },
    disabledCharactersByPlayerId: (state) => (id) => {
      const player = state.players.find(x => x.id === id);
      return player.disabled;
    }, 
    bloodbathResults: (state) => {
      return state.players.sort((a, b) => {
        return a.results.bloodbath < b.results.bloodbath ? -1 : 1;
      });
    },
    isBloodbathSet: (state) => state.results.bloodbath.length > 0,
    twoVsTwoSeedingResults: (state) => state.results.twoVsTwoSeeding,
    draftCompleted: (state) => state.completed.draft,
    draftPicks: (state) => state.results.draft,
    getRedWins: (state) => state.results.fourVsFour.redWins,
    getBlueWins: (state) => state.results.fourVsFour.blueWins,
  }
});

export default store;